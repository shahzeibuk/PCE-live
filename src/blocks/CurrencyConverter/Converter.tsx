'use client'
import React, { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { ArrowRightLeft } from 'lucide-react'
import type { CurrencyRate } from '@/payload-types'

export const Converter = ({ rates }: { rates: CurrencyRate[] }) => {
  const [amount, setAmount] = useState<number>(100)
  const [from, setFrom] = useState<string>('USD')
  const [to, setTo] = useState<string>('PKR')
  const [result, setResult] = useState<number>(0)

  useEffect(() => {
    const fromRateDoc = rates.find(r => r.currency_code === from)
    const toRateDoc = rates.find(r => r.currency_code === to)
    
    // Logic: 
    // If 'from' is USD, sell_rate is what the user *pays* PKR to gets USD? No, usually:
    // Buy rate: What the exchange house pays YOU for your currency.
    // Sell rate: What the exchange house charges YOU to give you currency.
    // If user wants to convert USD to PKR: They SELL USD to company. Company BUYS USD at 'buy_rate'.
    // Result = amount * fromRate.buy_rate
    
    const fromBuy = fromRateDoc?.buy_rate || 1
    const fromSell = fromRateDoc?.sell_rate || 1
    const toBuy = toRateDoc?.buy_rate || 1
    const toSell = toRateDoc?.sell_rate || 1

    let converted = 0

    if (from === 'PKR' && to === 'PKR') {
      converted = amount
    } else if (from === 'PKR') {
      // User has PKR, wants 'to'. Company SELLS 'to' at 'toSell'.
      converted = amount / toSell
    } else if (to === 'PKR') {
      // User has 'from', wants PKR. Company BUYS 'from' at 'fromBuy'.
      converted = amount * fromBuy
    } else {
      // Cross rate: from -> PKR -> to
      // 1. Sell 'from' for PKR at 'fromBuy'
      const inPkr = amount * fromBuy
      // 2. Buy 'to' with PKR at 'toSell'
      converted = inPkr / toSell
    }

    setResult(converted)
  }, [amount, from, to, rates])

  return (
    <div className="max-w-4xl mx-auto bg-card rounded-3xl shadow-2xl p-6 md:p-10 border border-primary/10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

      <div className="flex flex-col lg:flex-row items-end gap-6 relative z-10">
        <div className="w-full lg:w-1/4">
          <label className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">Amount</label>
          <Input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(Number(e.target.value))}
            className="text-2xl font-black h-16 bg-muted/30 border-2 border-transparent focus:border-primary transition-all rounded-2xl"
          />
        </div>

        <div className="w-full lg:w-1/3">
          <label className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">From Currency</label>
          <Select value={from} onValueChange={setFrom}>
            <SelectTrigger className="h-16 text-xl font-bold bg-muted/30 border-2 border-transparent focus:border-primary transition-all rounded-2xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border">
              <SelectItem value="PKR">🇵🇰 PKR - Pakistani Rupee</SelectItem>
              {rates.map(r => (
                <SelectItem key={r.id} value={r.currency_code}>
                   {r.currency_code} - {r.currency_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="hidden lg:flex items-center justify-center p-3 bg-primary text-primary-foreground rounded-full h-16 w-16 mb-0 shadow-lg hover:rotate-180 transition-transform duration-500">
            <ArrowRightLeft className="w-6 h-6" />
        </div>

        <div className="w-full lg:w-1/3">
          <label className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">To Currency</label>
          <Select value={to} onValueChange={setTo}>
            <SelectTrigger className="h-16 text-xl font-bold bg-muted/30 border-2 border-transparent focus:border-primary transition-all rounded-2xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border">
              <SelectItem value="PKR">🇵🇰 PKR - Pakistani Rupee</SelectItem>
              {rates.map(r => (
                <SelectItem key={r.id} value={r.currency_code}>
                   {r.currency_code} - {r.currency_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-12 p-8 bg-linear-to-br from-primary/10 to-transparent rounded-2xl border border-primary/20 text-center shadow-inner">
        <p className="text-muted-foreground font-bold tracking-tighter uppercase mb-2">{amount} {from} converts to</p>
        <div className="flex flex-col items-center">
            <h3 className="text-5xl md:text-7xl font-black text-primary tracking-tighter transition-all hover:scale-105">
                {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </h3>
            <span className="text-2xl font-black text-primary/60 uppercase mt-2 tracking-widest">{to}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-4 font-medium italic">*Rates are subject to change. Visit nearest branch for final quote.</p>
      </div>
      
      <div className="text-center mt-10">
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-5 rounded-2xl font-black text-xl shadow-xl hover:-translate-y-1 transition-all active:scale-95 uppercase tracking-tighter">
              Instant Conversion
          </button>
      </div>
    </div>
  )
}
