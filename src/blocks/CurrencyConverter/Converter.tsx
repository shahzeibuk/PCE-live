'use client'

import React, { useMemo, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeftRight, CircleHelp } from 'lucide-react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { currencyFlagEmoji } from '@/utilities/currencyFlags'
import type { CurrencyRate } from '@/payload-types'

type RateRow = Pick<CurrencyRate, 'currency_code' | 'currency_name' | 'buy_rate' | 'sell_rate'> & {
  id?: string | number
}

function normalizeOptions(rates: RateRow[]): RateRow[] {
  const byCode = new Map<string, RateRow>()
  for (const r of rates) {
    const code = r.currency_code?.trim().toUpperCase()
    if (!code) continue
    if (!byCode.has(code)) {
      byCode.set(code, {
        ...r,
        currency_code: code,
        buy_rate: r.buy_rate,
        sell_rate: r.sell_rate,
        currency_name: r.currency_name || code,
      })
    }
  }
  if (!byCode.has('PKR')) {
    byCode.set('PKR', {
      currency_code: 'PKR',
      currency_name: 'Pakistani Rupee',
      buy_rate: 1,
      sell_rate: 1,
    })
  }

  return Array.from(byCode.values()).sort((a, b) => {
    if (a.currency_code === 'PKR') return -1
    if (b.currency_code === 'PKR') return 1
    return a.currency_code.localeCompare(b.currency_code)
  })
}

function defaultFromCode(codes: string[]): string {
  if (codes.includes('USD')) return 'USD'
  const nonPkr = codes.find((c) => c !== 'PKR')
  return nonPkr ?? codes[0] ?? 'USD'
}

function defaultToCode(codes: string[], from: string): string {
  if (codes.includes('PKR') && from !== 'PKR') return 'PKR'
  const other = codes.find((c) => c !== from)
  return other ?? codes[0] ?? 'PKR'
}

export const Converter = ({ rates }: { rates: CurrencyRate[] }) => {
  const ratesKey = useMemo(
    () => (rates ?? []).map((r) => `${r.currency_code}:${r.buy_rate}:${r.sell_rate}`).join('|'),
    [rates],
  )

  const options = useMemo(() => normalizeOptions((rates ?? []) as RateRow[]), [rates])
  const codes = useMemo(() => options.map((o) => o.currency_code), [options])

  const [amount, setAmount] = React.useState<number>(100)
  const [from, setFrom] = React.useState<string>('USD')
  const [to, setTo] = React.useState<string>('PKR')
  const [result, setResult] = React.useState<number>(0)

  useEffect(() => {
    if (codes.length === 0) return
    const set = new Set(codes)
    let nextFrom = set.has(from) ? from : defaultFromCode(codes)
    let nextTo = set.has(to) ? to : defaultToCode(codes, nextFrom)
    if (nextFrom === nextTo) {
      nextTo = codes.find((c) => c !== nextFrom) ?? nextTo
    }
    if (nextFrom !== from) setFrom(nextFrom)
    if (nextTo !== to) setTo(nextTo)
  }, [ratesKey, codes, from, to])

  useEffect(() => {
    const fromRateDoc = options.find((r) => r.currency_code === from)
    const toRateDoc = options.find((r) => r.currency_code === to)

    const fromBuy = Number(fromRateDoc?.buy_rate ?? 1)
    const toSell = Number(toRateDoc?.sell_rate ?? 1)

    let converted = 0
    if (from === 'PKR' && to === 'PKR') {
      converted = amount
    } else if (from === 'PKR') {
      converted = amount / toSell
    } else if (to === 'PKR') {
      converted = amount * fromBuy
    } else {
      const inPkr = amount * fromBuy
      converted = inPkr / toSell
    }
    setResult(converted)
  }, [amount, from, to, options])

  const swap = useCallback(() => {
    setFrom(to)
    setTo(from)
  }, [from, to])

  const labelFor = (code: string) =>
    options.find((o) => o.currency_code === code)?.currency_name ?? code

  return (
    <TooltipProvider delayDuration={200}>
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-2 text-center sm:text-left sm:justify-between">
          <p className="text-sm text-slate-600 max-w-xl">
            Enter an amount, choose the currency you have and the currency you want. Results use our published rates
            (via Pakistani rupees).
          </p>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:border-[#099546]/40 hover:text-[#099546]"
                aria-label="How this converter works"
              >
                <CircleHelp className="h-4 w-4 shrink-0" aria-hidden />
                How it works
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-sm text-left leading-relaxed">
              <span className="font-semibold block mb-1">Using the converter</span>
              Type how much money you want to convert. Pick <strong>From</strong> (what you hold) and{' '}
              <strong>To</strong> (what you want). We convert through PKR using the same buy and sell figures as our
              rate table. If both sides are foreign currencies, we cross via rupees. Totals are indicative — ask a branch
              for the amount you will receive or pay.
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="bg-white border border-slate-200 rounded px-4 py-4 md:py-5 shadow-sm space-y-4">
          <p className="text-xs text-slate-500 text-center md:text-left">
            Amounts in <strong className="text-slate-700">PKR</strong> are Pakistani rupees; foreign codes use the same buy/sell PKR figures as our rate table.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4">
              <div className="flex-1 min-w-0 space-y-1">
                <label htmlFor="converter-amount" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Amount
                </label>
                <input
                  id="converter-amount"
                  type="number"
                  min={0}
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  className="w-full min-h-12 border border-slate-200 rounded-md px-4 py-3 text-lg font-mono tabular-nums bg-white"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-3">
              <div className="flex-1 min-w-0 space-y-1">
                <span id="label-from" className="text-xs font-semibold uppercase tracking-wide text-slate-500 block">
                  From (you have)
                </span>
                <Select value={from} onValueChange={setFrom}>
                  <SelectTrigger
                    className="w-full min-h-12 rounded border-slate-200 text-sm font-semibold [&_[data-slot=select-value]]:flex [&_[data-slot=select-value]]:items-center [&_[data-slot=select-value]]:gap-2"
                    aria-labelledby="label-from"
                  >
                    <SelectValue placeholder="Currency you have" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="max-h-72">
                    {options.map((r) => (
                      <SelectItem
                        key={r.currency_code}
                        value={r.currency_code}
                        textValue={`${r.currency_code} ${labelFor(r.currency_code)}`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base leading-none" aria-hidden>
                            {currencyFlagEmoji(r.currency_code)}
                          </span>
                          <span>
                            {r.currency_code} · {labelFor(r.currency_code)}
                          </span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex md:flex-col items-center justify-center md:pt-5 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full border-slate-200"
                  onClick={swap}
                  aria-label="Swap from and to currencies"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <span id="label-to" className="text-xs font-semibold uppercase tracking-wide text-slate-500 block">
                  To (you want)
                </span>
                <Select value={to} onValueChange={setTo}>
                  <SelectTrigger
                    className="w-full min-h-12 rounded border-slate-200 text-sm font-semibold [&_[data-slot=select-value]]:flex [&_[data-slot=select-value]]:items-center [&_[data-slot=select-value]]:gap-2"
                    aria-labelledby="label-to"
                  >
                    <SelectValue placeholder="Currency you want" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="max-h-72">
                    {options.map((r) => (
                      <SelectItem
                        key={`to-${r.currency_code}`}
                        value={r.currency_code}
                        textValue={`${r.currency_code} ${labelFor(r.currency_code)}`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base leading-none" aria-hidden>
                            {currencyFlagEmoji(r.currency_code)}
                          </span>
                          <span>
                            {r.currency_code} · {labelFor(r.currency_code)}
                          </span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 pt-1 border-t border-slate-100">
              <span className="text-sm font-semibold text-slate-600">You get about</span>
              <span className="text-2xl sm:text-3xl font-bold text-[#099546] tabular-nums break-all">
                {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}{' '}
                <span className="inline-flex items-baseline gap-1">
                  <abbr title="Currency code" className="no-underline">
                    {to}
                  </abbr>
                  {to === 'PKR' ? (
                    <span className="text-sm font-semibold text-slate-500 normal-case">(Pakistani rupees)</span>
                  ) : null}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            asChild
            className="rounded bg-[#099546] hover:bg-[#088040] text-white h-11 px-8 font-semibold w-full sm:w-auto"
          >
            <Link href="/currency-rates">View full rate table</Link>
          </Button>
        </div>

        <p className="text-center text-xs text-slate-500">Rates for indication only. Confirm at your branch.</p>
      </div>
    </TooltipProvider>
  )
}
