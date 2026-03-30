import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getCurrencyRatesForFrontend } from '@/utilities/getCurrencyRatesForFrontend'
import type { CurrencyRate } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { CurrencyNoteSurface } from '@/components/layout/currencyBrandSurfaces'

export type LiveExchangeRatesProps = {
  title?: string
  intro?: string
  supportingText?: string
  ctaLabel?: string
  popularTitle?: string
  rates?: CurrencyRate[]
  disableInnerContainer?: boolean
  /** Overrides default container padding (e.g. tighter top after flush hero) */
  containerClassName?: string
}

const POPULAR_CODES = ['USD', 'SAR', 'AED', 'EUR', 'GBP'] as const

export const LiveExchangeRatesBlock: React.FC<LiveExchangeRatesProps> = async ({
  title,
  intro,
  supportingText,
  ctaLabel,
  popularTitle,
  rates: providedRates,
  disableInnerContainer = false,
  containerClassName,
}) => {
  let rates = providedRates

  if (!rates) {
    const payload = await getPayload({ config: configPromise })
    rates = (await getCurrencyRatesForFrontend(payload, { limit: 10 })) as unknown as CurrencyRate[]
  }

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

  const fullList = rates ?? []
  const popularList = fullList.filter((r) =>
    POPULAR_CODES.includes(r.currency_code as (typeof POPULAR_CODES)[number]),
  )
  const list = fullList

  const containerClasses = disableInnerContainer
    ? ''
    : (containerClassName ?? 'container px-4 py-16')

  return (
    <div className={containerClasses}>
      {!disableInnerContainer && (
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            {title || 'Live Exchange Rates'}
          </h2>
          {intro ? (
            <p className="text-slate-600 text-base leading-relaxed max-w-3xl mx-auto mb-3">{intro}</p>
          ) : null}
          {supportingText ? (
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">{supportingText}</p>
          ) : null}
        </div>
      )}

      <div className="max-w-3xl mx-auto space-y-10">
        {popularList.length > 0 && popularTitle ? (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 text-center md:text-left">
              {popularTitle}
            </h3>
            <div className="overflow-hidden rounded border border-slate-200 bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#099546] text-white">
                    <th className="px-4 py-3 text-sm font-bold">Currency</th>
                    <th className="px-4 py-3 text-sm font-bold text-center">Buying</th>
                    <th className="px-4 py-3 text-sm font-bold text-center">Selling</th>
                  </tr>
                </thead>
                <tbody>
                  {popularList.map((rate, i) => (
                    <tr
                      key={`pop-${rate.id}`}
                      className={`border-t border-slate-200 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-100'}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{flags[rate.currency_code] || '🏳️'}</span>
                          <div>
                            <span className="font-bold text-slate-900">{rate.currency_code}</span>
                            <span className="text-xs text-slate-500 block">{rate.currency_name}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-sm font-semibold text-slate-800 tabular-nums">
                        {Number(rate.buy_rate ?? 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-sm font-semibold text-[#099546] tabular-nums">
                        {Number(rate.sell_rate ?? 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        <div>
          {popularTitle ? (
            <h3 className="text-lg font-bold text-slate-900 mb-4 text-center md:text-left">All quoted rates</h3>
          ) : null}
          <div className="overflow-hidden rounded border border-slate-200 bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#099546] text-white">
                <th className="px-4 py-3 text-sm font-bold">Currency</th>
                <th className="px-4 py-3 text-sm font-bold text-center">Buying</th>
                <th className="px-4 py-3 text-sm font-bold text-center">Selling</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 ? (
                <tr key="empty">
                  <td colSpan={3} className="px-4 py-10 text-center text-slate-500 text-sm">
                    No rates available yet.
                  </td>
                </tr>
              ) : (
                list.map((rate, i) => {
                  return (
                    <tr
                      key={rate.id}
                      className={`border-t border-slate-200 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-100'}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{flags[rate.currency_code] || '🏳️'}</span>
                          <div>
                            <span className="font-bold text-slate-900">{rate.currency_code}</span>
                            <span className="text-xs text-slate-500 block">{rate.currency_name}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-sm font-semibold text-slate-800 tabular-nums">
                        {Number(rate.buy_rate ?? 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-sm font-semibold text-[#099546] tabular-nums">
                        {Number(rate.sell_rate ?? 0).toFixed(2)}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        </div>
        {!disableInnerContainer && (
          <div className="text-center mt-8 space-y-5">
            <Button asChild className="rounded bg-[#099546] hover:bg-[#088040] text-white h-11 px-6 font-semibold">
              <Link href="/currency-rates" className="inline-flex items-center gap-2">
                {ctaLabel || 'View Full Forex Rates'}
                <ChevronDown className="h-4 w-4" />
              </Link>
            </Button>
            <CurrencyNoteSurface className="p-3 md:p-4">
              <p className="text-xs text-slate-600 text-center leading-relaxed">
                Open-market figures for reference — confirm live rates at your branch before transacting.
              </p>
            </CurrencyNoteSurface>
          </div>
        )}
      </div>
    </div>
  )
}
