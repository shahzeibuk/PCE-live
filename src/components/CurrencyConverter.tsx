'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  ChevronDown, 
  ArrowRight, 
  Lock, 
  Zap, 
  Info,
  ChevronRight,
  ArrowUpDown
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

  // Current rate display
  const currentRate = rates.find(r => r.currency_code === (fromCurrency === 'PKR' ? toCurrency : fromCurrency))
  const rateValue = currentRate ? (fromCurrency === 'PKR' ? (1 / currentRate.sell_rate) : currentRate.buy_rate) : 279.313

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
    setReceiveAmount(result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
  }, [sendAmount, fromCurrency, toCurrency, rates])

  const formatNumber = (val: string) => {
    const numericValue = val.replace(/[^0-9.]/g, '')
    if (numericValue === '') return ''
    const parts = numericValue.split('.')
    parts[0] = parseInt(parts[0]).toLocaleString()
    return parts.join('.')
  }

  return (
    <Card className="w-full max-w-[480px] mx-auto bg-white border-0 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[32px] overflow-hidden">
      <CardContent className="p-8 space-y-6">
        
        {/* Rate Pill */}
        <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 rounded-full text-sm font-semibold text-gray-700">
                <Lock className="size-3 text-gray-400" />
                <span>1 {fromCurrency} = {rateValue.toFixed(3)} {toCurrency}</span>
                <ChevronRight className="size-4 text-gray-400" />
            </div>
        </div>

        {/* You Send Section */}
        <div className="relative space-y-1">
          <label className="text-sm font-semibold text-gray-500 ml-1">You send exactly</label>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer group">
              <span className="text-2xl">{FLAG_MAP[fromCurrency] || '🏳️'}</span>
              <span className="text-xl font-bold">{fromCurrency}</span>
              <ChevronDown className="size-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
            <input
              type="text"
              value={sendAmount}
              onChange={(e) => setSendAmount(formatNumber(e.target.value))}
              className="text-right text-4xl font-black bg-transparent border-0 focus:ring-0 p-0 w-full tracking-tighter text-gray-900"
            />
          </div>
        </div>

        {/* Info Banner */}
        <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
            <div className="bg-blue-100 p-1 rounded-full">
                <Info className="size-4 text-blue-600" />
            </div>
            <p className="text-xs font-medium text-blue-800">
                Sending over 25,000 USD or equivalent? <span className="underline cursor-pointer font-bold">We'll discount our fee</span>
            </p>
        </div>

        {/* Recipient Gets Section */}
        <div className="relative space-y-1">
          <label className="text-sm font-semibold text-gray-500 ml-1">Recipient gets</label>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer group">
              <span className="text-2xl">{FLAG_MAP[toCurrency] || '🏳️'}</span>
              <span className="text-xl font-bold">{toCurrency}</span>
              <ChevronDown className="size-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
            <div className="text-right text-4xl font-black tracking-tighter text-gray-900">
                {receiveAmount}
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-100 w-full" />

        {/* Details Section */}
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm">
                        <Zap className="size-5 text-gray-900 fill-gray-900" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500">Arrives</p>
                        <p className="font-bold text-gray-900">Today - in seconds</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">
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
            </div>
        </div>

        {/* CTA Button */}
        <Button 
          className="w-full h-16 rounded-full text-xl font-bold text-gray-900 hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#80E143' }}
        >
          Send money
        </Button>

      </CardContent>
    </Card>
  )
}
