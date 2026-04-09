import React from 'react'
import { CurrencyRatesDualSection } from '@/components/currency/CurrencyRatesDualSection'
import { CurrencyRatesLiveHeader } from '@/components/currency/CurrencyRatesLiveHeader'
import { CurrencyConverter } from '@/components/CurrencyConverter'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { getCurrencyRatesForFrontend } from '@/utilities/getCurrencyRatesForFrontend'
import { InnerPageHeader } from '@/components/layout/InnerPageHeader'
import { CurrencyNoteSurface } from '@/components/layout/currencyBrandSurfaces'

export const dynamic = 'force-dynamic'

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
    <div className="pb-16 md:pb-24 flush-under-site-header">
      <InnerPageHeader
        variant="currency"
        title="Live Exchange Rates"
        description="Get competitive open-market rates. Figures update regularly; confirm at your branch before transacting."
      />

      <div className="container min-w-0 px-3 sm:px-4 py-8 md:py-12 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10 xl:gap-12">
        <div className="min-w-0 space-y-6 lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 md:p-6 overflow-hidden shadow-sm">
            <div className="mb-4 space-y-4 md:mb-6">
              <CurrencyRatesLiveHeader rates={rates} />
            </div>
            <CurrencyRatesDualSection rates={rates} />
          </div>
          <CurrencyNoteSurface className="p-4 text-sm leading-relaxed text-slate-600 sm:p-5 md:p-6 md:text-base">
            <strong className="text-slate-900">Disclaimer:</strong> Rates may change without
            notice. Information only — confirm with a branch before any transaction.
          </CurrencyNoteSurface>
        </div>

        <aside className="min-w-0 space-y-6 lg:sticky lg:top-[calc(var(--site-header-height)+0.75rem)] lg:self-start xl:top-[calc(var(--site-header-height)+1rem)]">
          <CurrencyConverter rates={converterRates} />

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Bulk or treasury rates</h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              For large volumes, ask about preferential pricing at our main branch or treasury desk.
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="min-w-0 shrink">Hours</span>
                <span className="font-medium tabular-nums text-right">9:00 AM – 6:00 PM</span>
              </li>
              <li className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="min-w-0 shrink">Mon – Sat</span>
                <span className="font-medium text-right">Open</span>
              </li>
              <li className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="min-w-0 shrink">Sunday</span>
                <span className="font-medium text-right text-red-600">Closed</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
