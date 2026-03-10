'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

interface Rate {
  id: string | number
  currency_name: string
  currency_code: string
  buy_rate: number
  sell_rate: number
}

export const CurrencyConverter = ({ rates }: { rates: Rate[] }) => {
  const [amount, setAmount] = useState<number>(1)
  const [fromCurrency, setFromCurrency] = useState<string>('USD')
  const [toCurrency, setToCurrency] = useState<string>('PKR')
  const [result, setResult] = useState<number | null>(null)

  const handleConvert = () => {
    const fromRate = rates.find((r) => r.currency_code === fromCurrency)
    const toRate = rates.find((r) => r.currency_code === toCurrency)

    if (fromCurrency === 'PKR') {
        // Converting from PKR to something else
        if (toRate) {
            setResult(amount / toRate.sell_rate)
        }
    } else if (toCurrency === 'PKR') {
        // Converting from something else to PKR
        if (fromRate) {
            setResult(amount * fromRate.buy_rate)
        }
    } else {
        // Converting between two non-PKR currencies via PKR
        if (fromRate && toRate) {
            const amountInPKR = amount * fromRate.buy_rate
            setResult(amountInPKR / toRate.sell_rate)
        }
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>From</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PKR">PKR (Pakistani Rupee)</SelectItem>
                {rates.map((rate) => (
                  <SelectItem key={rate.id} value={rate.currency_code}>
                    {rate.currency_code} ({rate.currency_name})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>To</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PKR">PKR (Pakistani Rupee)</SelectItem>
                {rates.map((rate) => (
                  <SelectItem key={rate.id} value={rate.currency_code}>
                    {rate.currency_code} ({rate.currency_name})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="w-full" onClick={handleConvert}>
          Convert
        </Button>
        {result !== null && (
          <div className="mt-4 p-4 bg-muted rounded-lg text-center">
            <p className="text-sm font-medium text-muted-foreground">Result</p>
            <p className="text-2xl font-bold">
              {result.toFixed(2)} {toCurrency}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
