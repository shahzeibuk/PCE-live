import React from 'react'
import { CurrencyTable } from '@/components/CurrencyTable'
import { CurrencyConverter } from '@/components/CurrencyConverter'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { getCurrencyRatesForFrontend } from '@/utilities/getCurrencyRatesForFrontend'
import { InnerPageHeader } from '@/components/layout/InnerPageHeader'
import { CurrencyNoteSurface } from '@/components/layout/currencyBrandSurfaces'

export default async function RatesPage() {
  let rates: any[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    rates = await getCurrencyRatesForFrontend(payload, { limit: 100 })
  } catch (error) {
    console.error('Error fetching currency rates:', error)
  }

  const converterRates = rates.map((r: any) => ({
    id: r.id,
    currency_name: r.currency_name,
    currency_code: r.currency_code,
    buy_rate: r.buy_rate,
    sell_rate: r.sell_rate,
  }))

  return (
    <div className="pb-16 md:pb-24">
      <InnerPageHeader
        variant="currency"
        title="Live Exchange Rates"
        description="Get competitive open-market rates. Figures update regularly; confirm at your branch before transacting."
      />

      <div className="container px-4 py-10 md:py-12 grid lg:grid-cols-3 gap-10 lg:gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded overflow-hidden">
            <CurrencyTable rates={rates} />
          </div>
          <CurrencyNoteSurface className="p-5 md:p-6 text-sm text-slate-600">
            <strong className="text-slate-900">Disclaimer:</strong> Rates may change without
            notice. Information only — confirm with a branch before any transaction.
          </CurrencyNoteSurface>
        </div>

        <div className="space-y-8">
          <CurrencyConverter rates={converterRates} />

          <div className="bg-white border border-slate-200 rounded p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Bulk or treasury rates</h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              For large volumes, ask about preferential pricing at our main branch or treasury desk.
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex justify-between gap-4">
                <span>Hours</span>
                <span className="font-medium">9:00 AM – 6:00 PM</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Mon – Sat</span>
                <span className="font-medium">Open</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Sunday</span>
                <span className="font-medium text-red-600">Closed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
