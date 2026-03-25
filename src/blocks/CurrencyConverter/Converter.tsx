'use client'
import React, { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import type { CurrencyRate } from '@/payload-types'

const FLAG_MAP: Record<string, string> = {
  USD: '🇺🇸',
  PKR: '🇵🇰',
  GBP: '🇬🇧',
  EUR: '🇪🇺',
  SAR: '🇸🇦',
  AED: '🇦🇪',
  CAD: '🇨🇦',
  AUD: '🇦🇺',
}

export const Converter = ({ rates }: { rates: CurrencyRate[] }) => {
  const [amount, setAmount] = useState<number>(100)
  const [from, setFrom] = useState<string>('USD')
  const [to, setTo] = useState<string>('PKR')
  const [result, setResult] = useState<number>(0)

  useEffect(() => {
    const fromRateDoc = rates.find((r) => r.currency_code === from)
    const toRateDoc = rates.find((r) => r.currency_code === to)

    const fromBuy = fromRateDoc?.buy_rate ?? 1
    const toSell = toRateDoc?.sell_rate ?? 1

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
  }, [amount, from, to, rates])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded px-4 py-3 md:py-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:flex-wrap md:items-center gap-3 md:gap-4">
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 shrink-0">Convert</span>
          <input
            type="number"
            min={0}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className="w-24 md:w-28 border border-slate-200 dark:border-slate-700 rounded px-3 py-2 text-sm font-mono tabular-nums bg-white dark:bg-slate-900"
          />
          <Select value={from} onValueChange={setFrom}>
            <SelectTrigger className="w-full md:w-[140px] h-10 rounded border-slate-200 dark:border-slate-700 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <span>{FLAG_MAP[from] || '🏳️'}</span>
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PKR">🇵🇰 PKR</SelectItem>
              {rates.map((r) => (
                <SelectItem key={r.id} value={r.currency_code}>
                  {FLAG_MAP[r.currency_code] || '🏳️'} {r.currency_code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-lg font-medium text-slate-400 hidden md:inline">=</span>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-lg md:hidden text-slate-400">=</span>
            <span className="text-base md:text-lg font-bold text-[#099546] tabular-nums truncate">
              {result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {to}
            </span>
            <Button
              type="button"
              size="icon"
              className="shrink-0 h-9 w-9 rounded bg-[#099546] hover:bg-[#088040] text-white"
              aria-label="Convert"
            >
              <Play className="h-4 w-4 fill-current" />
            </Button>
          </div>
        </div>
      </div>
      <div className="text-center">
        <Button className="rounded bg-[#099546] hover:bg-[#088040] text-white h-11 px-8 font-semibold" type="button">
          Convert &gt;
        </Button>
      </div>
      <p className="text-center text-xs text-slate-500">
        Rates for indication only. Confirm at your branch.
      </p>
    </div>
  )
}
