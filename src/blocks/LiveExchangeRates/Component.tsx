import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { CurrencyRate } from '@/payload-types'

export type LiveExchangeRatesProps = {
  title?: string
}

export const LiveExchangeRatesBlock: React.FC<LiveExchangeRatesProps> = async ({ title }) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: rates } = await payload.find({
    collection: 'currency-rates',
    limit: 10,
    sort: 'currency_name',
  })

  // Basic flag mapping based on currency code
  const flags: Record<string, string> = {
    USD: '🇺🇸',
    SAR: '🇸🇦',
    AED: '🇦🇪',
    EUR: '🇪🇺',
    GBP: '🇬🇧',
    CAD: '🇨🇦',
    AUD: '🇦🇺',
    JPY: '🇯🇵',
    CNY: '🇨🇳',
  }

  return (
    <div className="container py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{title || 'Live Exchange Rates'}</h2>
        <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="overflow-hidden rounded-2xl border border-border shadow-xl bg-card">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="p-5 font-bold uppercase tracking-wider">Currency</th>
                <th className="p-5 font-bold uppercase tracking-wider text-center">Buying</th>
                <th className="p-5 font-bold uppercase tracking-wider text-center">Selling</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((rate: CurrencyRate) => (
                <tr key={rate.id} className="border-t border-border/60 hover:bg-muted/30 transition-all group">
                  <td className="p-5 flex items-center gap-4">
                    <span className="text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
                      {flags[rate.currency_code] || '🏳️'}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-bold text-lg text-foreground tracking-tight">{rate.currency_code}</span>
                      <span className="text-xs text-muted-foreground uppercase">{rate.currency_name}</span>
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <span className="font-mono text-xl font-semibold text-primary/80">
                      {rate.buy_rate.toFixed(2)}
                    </span>
                  </td>
                  <td className="p-5 text-center">
                    <span className="font-mono text-xl font-semibold text-primary">
                      {rate.sell_rate.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-10">
          <button className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 hover:scale-105 transition-all shadow-lg active:scale-95 group">
            View Full Forex Rates
            <svg 
              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="right" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
