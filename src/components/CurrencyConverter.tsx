'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import {
  ChevronDown,
  ArrowRight,
  Lock,
  Zap,
  Info,
  ChevronRight,
  RefreshCw,
} from 'lucide-react'
import { cn } from '@/utilities/ui'

interface Rate {
  id: string | number
  currency_name: string
  currency_code: string
  buy_rate: number
  sell_rate: number
}

// Helper for flags (using simple emoji for reliability, can be replaced with SVG icons)
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

export const CurrencyConverter = ({ rates }: { rates: Rate[] }) => {
  const [sendAmount, setSendAmount] = useState<string>('1,000.00')
  const [fromCurrency, setFromCurrency] = useState<string>('USD')
  const [toCurrency, setToCurrency] = useState<string>('PKR')
  const [receiveAmount, setReceiveAmount] = useState<string>('')
  const [isSyncing, setIsSyncing] = useState<boolean>(false)
  const router = useRouter()

  // Current rate display
  const currentRate = rates.find(
    (r) => r.currency_code === (fromCurrency === 'PKR' ? toCurrency : fromCurrency),
  )
  const rateValue = currentRate
    ? fromCurrency === 'PKR'
      ? 1 / currentRate.sell_rate
      : currentRate.buy_rate
    : 279.313

  useEffect(() => {
    const rawAmount = parseFloat(sendAmount.replace(/,/g, ''))
    if (isNaN(rawAmount)) return

    let result = 0
    const fromRate = rates.find((r) => r.currency_code === fromCurrency)
    const toRate = rates.find((r) => r.currency_code === toCurrency)

    if (fromCurrency === 'PKR') {
      if (toRate) result = rawAmount / toRate.sell_rate
    } else if (toCurrency === 'PKR') {
      if (fromRate) result = rawAmount * fromRate.buy_rate
    } else {
      if (fromRate && toRate) {
        const amountInPKR = rawAmount * fromRate.buy_rate
        result = amountInPKR / toRate.sell_rate
      }
    }
    setReceiveAmount(
      result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    )
  }, [sendAmount, fromCurrency, toCurrency, rates])

  const formatNumber = (val: string) => {
    const numericValue = val.replace(/[^0-9.]/g, '')
    if (numericValue === '') return ''
    const parts = numericValue.split('.')
    parts[0] = parseInt(parts[0]).toLocaleString()
    return parts.join('.')
  }

  return (
    <Card className="w-full max-w-full bg-card border border-slate-200 shadow-sm rounded-2xl sm:rounded-3xl overflow-hidden mx-auto lg:mx-0">
      <CardContent className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
        {/* Rate Pill & Sync */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex max-w-full min-w-0 items-center gap-2 px-3 py-1.5 sm:px-4 bg-gray-100 rounded-full text-xs font-semibold text-gray-700 sm:text-sm">
            <Lock className="size-3 shrink-0 text-gray-400" aria-hidden />
            <span className="truncate tabular-nums">
              1 {fromCurrency} = {rateValue.toFixed(3)} {toCurrency}
            </span>
            <ChevronRight className="size-4 shrink-0 text-gray-400 hidden sm:inline" aria-hidden />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={async () => {
              setIsSyncing(true)
              try {
                await fetch('/api/currency-rates/sync', { method: 'POST' })
                router.refresh()
              } catch (e) {
                console.error(e)
              } finally {
                setIsSyncing(false)
              }
            }}
            disabled={isSyncing}
            title="Sync Live Exchange Rates"
            className="rounded-full size-8 shrink-0 p-0 bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            <RefreshCw className={cn('size-4', isSyncing && 'animate-spin')} />
          </Button>
        </div>

        {/* You Send Section */}
        <div className="relative space-y-1">
          <label className="text-sm font-semibold text-gray-500 ml-1">
            You send exactly (amount)
          </label>
          <div className="flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between sm:gap-4">
            <Select
              value={fromCurrency}
              onValueChange={(val) => {
                if (val === toCurrency) setToCurrency(fromCurrency)
                setFromCurrency(val)
              }}
            >
              <SelectTrigger className="w-fit max-w-full h-auto flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer group border-0 ring-0 focus:ring-0 shadow-none">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <span className="text-xl sm:text-2xl shrink-0">{FLAG_MAP[fromCurrency] || '🏳️'}</span>
                  <span className="text-lg sm:text-xl font-bold tabular-nums">{fromCurrency}</span>
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-2xl max-h-[300px] z-50">
                {Array.from(new Set(['PKR', ...rates.map((r) => r.currency_code)]))
                  .sort()
                  .map((code) => (
                    <SelectItem
                      key={code}
                      value={code}
                      className="font-semibold text-lg py-2 cursor-pointer rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{FLAG_MAP[code] || '🏳️'}</span>
                        <span>{code}</span>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <input
              type="text"
              inputMode="decimal"
              aria-label={`Amount in ${fromCurrency}`}
              value={sendAmount}
              onChange={(e) => setSendAmount(formatNumber(e.target.value))}
              className="min-h-12 w-full min-w-0 flex-1 text-right text-2xl sm:text-3xl md:text-4xl font-black bg-transparent border-0 focus:ring-0 p-0 tracking-tighter text-gray-900 min-[420px]:text-3xl"
            />
          </div>
        </div>

        {/* Info Banner */}
        {/* <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
            <div className="bg-blue-100 p-1 rounded-full">
                <Info className="size-4 text-blue-600" />
            </div>
            <p className="text-xs font-medium text-blue-800">
                Sending over 25,000 USD or equivalent? <span className="underline cursor-pointer font-bold">We'll discount our fee</span>
            </p>
        </div> */}

        {/* Recipient Gets Section */}
        <div className="relative space-y-1">
          <label className="text-sm font-semibold text-gray-500 ml-1">
            Recipient gets
            {toCurrency === 'PKR' ? (
              <span className="block text-xs font-normal text-gray-400 mt-0.5">
                Pakistani rupees (PKR)
              </span>
            ) : null}
          </label>
          <div className="flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between sm:gap-4">
            <Select
              value={toCurrency}
              onValueChange={(val) => {
                if (val === fromCurrency) setFromCurrency(toCurrency)
                setToCurrency(val)
              }}
            >
              <SelectTrigger className="w-fit max-w-full h-auto flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer group border-0 ring-0 focus:ring-0 shadow-none">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <span className="text-xl sm:text-2xl shrink-0">{FLAG_MAP[toCurrency] || '🏳️'}</span>
                  <span className="text-lg sm:text-xl font-bold tabular-nums">{toCurrency}</span>
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-2xl max-h-[300px] z-50">
                {Array.from(new Set(['PKR', ...rates.map((r) => r.currency_code)]))
                  .sort()
                  .map((code) => (
                    <SelectItem
                      key={code}
                      value={code}
                      className="font-semibold text-lg py-2 cursor-pointer rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{FLAG_MAP[code] || '🏳️'}</span>
                        <span>{code}</span>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <div
              className="flex min-h-12 w-full min-w-0 flex-1 items-center justify-end text-right text-2xl font-black tracking-tighter text-gray-900 min-[420px]:text-3xl sm:text-4xl break-all sm:break-normal"
              aria-label={`Converted amount in ${toCurrency}`}
            >
              {receiveAmount}
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-100 w-full" />

        {/* Details Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <div className="size-9 shrink-0 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm sm:size-10">
                <Zap className="size-4 fill-gray-900 text-gray-900 sm:size-5" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-500 sm:text-sm">Arrives</p>
                <p className="text-sm font-bold text-gray-900 sm:text-base">Today — instantly</p>
              </div>
            </div>
          </div>

          {/* <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm">
                        <Lock className="size-5 text-gray-900" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500">Total fees</p>
                        <p className="font-bold text-gray-900">Included in {fromCurrency} amount</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-blue-600 font-bold hover:underline cursor-pointer">
                    <span>8.59 {fromCurrency}</span>
                    <ChevronRight className="size-4" />
                </div>
            </div> */}
        </div>

        {/* CTA — presentational; conversion updates live above */}
        <Button type="button" className="h-14 w-full rounded-full text-base font-bold transition-opacity sm:h-16 sm:text-lg md:text-xl">
          Convert
        </Button>
      </CardContent>
    </Card>
  )
}
