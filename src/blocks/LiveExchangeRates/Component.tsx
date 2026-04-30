import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getCurrencyRatesForFrontend } from '@/utilities/getCurrencyRatesForFrontend'
import type { CurrencyRate } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { CurrencyNoteSurface } from '@/components/layout/currencyBrandSurfaces'
import { POPULAR_FOREX_CODES, isPopularForexCode } from '@/constants/popularCurrencyCodes'
import { MobileCurrencyRateCards, ratesToMobileItems } from '@/components/currency/MobileCurrencyRateCards'
import { CurrencyFlag } from '@/components/currency/CurrencyFlag'
import { HOME_INDEX_HEADING_CLASS } from '@/components/home/homeContent'
import { LiveExchangeRateTabs } from '@/blocks/LiveExchangeRates/LiveExchangeRateTabs'

export type LiveExchangeRatesProps = {
  title?: string
  intro?: string
  ctaLabel?: string
  /** When set with data, shows Travelex-style tabbed popular / other tables */
  popularTitle?: string
  popularTabLabel?: string
  otherTabLabel?: string
  rates?: CurrencyRate[]
  disableInnerContainer?: boolean
  /** Overrides default container padding (e.g. tighter top after flush hero) */
  containerClassName?: string
}

const thCurrency =
  'px-4 py-3 text-left text-sm font-bold uppercase tracking-wide text-white md:px-5 md:py-3.5 md:text-base'
const thNumeric =
  'px-4 py-3 text-right text-sm font-bold uppercase tracking-wide text-white md:px-5 md:py-3.5 md:text-base'
const tdCls = 'px-4 py-3 md:px-5 md:py-4 align-middle border-b border-slate-200'

export const LiveExchangeRatesBlock: React.FC<LiveExchangeRatesProps> = async ({
  title,
  intro,
  ctaLabel,
  popularTitle,
  popularTabLabel = 'Popular Forex Rates',
  otherTabLabel = 'Other quoted rates',
  rates: providedRates,
  disableInnerContainer = false,
  containerClassName,
}) => {
  let rates = providedRates

  if (!rates) {
    const payload = await getPayload({ config: configPromise })
    rates = (await getCurrencyRatesForFrontend(payload, { limit: 24 })) as unknown as CurrencyRate[]
  }

  const fullList = rates ?? []
  const popularList = POPULAR_FOREX_CODES.map((code) =>
    fullList.find((r) => r.currency_code === code),
  ).filter((r): r is CurrencyRate => Boolean(r))

  const otherList = fullList.filter((r) => !isPopularForexCode(r.currency_code))

  const containerClasses = disableInnerContainer
    ? ''
    : (containerClassName ?? 'container px-4 py-16')

  const renderSimpleTable = (rows: CurrencyRate[], ariaLabel: string) => (
    <div className="space-y-2 max-w-2xl mx-auto w-full">
      {rows.length === 0 ? (
        <p className="md:hidden rounded-lg border border-dashed border-slate-200 bg-slate-50 py-8 text-center text-sm text-slate-600">
          No rates available.
        </p>
      ) : (
        <MobileCurrencyRateCards
          rates={ratesToMobileItems(rows)}
          buyLabel="Buying"
          sellLabel="Selling"
          aria-label={`${ariaLabel} (mobile list)`}
        />
      )}
      <div className="hidden md:block overflow-x-auto overflow-y-auto max-h-[min(72vh,38rem)] lg:max-h-none rounded-md border border-slate-300 bg-white [-webkit-overflow-scrolling:touch] w-full">
        <table className="w-full border-collapse text-left text-base md:text-lg" aria-label={ariaLabel}>
          <thead className="sticky top-0 z-10 bg-[#099546]">
            <tr>
              <th className={thCurrency}>Currency</th>
              <th className={thNumeric}>Buying (PKR)</th>
              <th className={thNumeric}>Selling (PKR)</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={3} className={`${tdCls} py-8 text-center text-slate-500 text-base`}>
                  No rates available.
                </td>
              </tr>
            ) : (
              rows.map((rate, i) => (
                <tr
                  key={`${rate.id}-${rate.currency_code}`}
                  className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                >
                  <td className={tdCls}>
                    <div className="flex items-center gap-3 md:gap-4">
                      <CurrencyFlag currencyCode={rate.currency_code} className="h-6 w-6 shrink-0 md:h-7 md:w-7" />
                      <div className="min-w-0 text-left">
                        <span className="font-semibold text-slate-900 tabular-nums text-base md:text-lg block leading-tight">
                          {rate.currency_code}
                        </span>
                        {rate.currency_name ? (
                          <span className="text-slate-600 block text-sm md:text-base leading-snug line-clamp-2 mt-0.5">
                            {rate.currency_name}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td
                    className={`${tdCls} text-right font-mono text-base md:text-lg font-semibold text-slate-800 tabular-nums whitespace-nowrap`}
                  >
                    {Number(rate.buy_rate ?? 0).toFixed(2)}
                  </td>
                  <td
                    className={`${tdCls} text-right font-mono text-base md:text-lg font-semibold text-slate-900 tabular-nums whitespace-nowrap`}
                  >
                    {Number(rate.sell_rate ?? 0).toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className={containerClasses}>
      {!disableInnerContainer && (
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
          <h2 className={`text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-4 ${HOME_INDEX_HEADING_CLASS}`}>
            {title || 'Live Exchange Rates'}
          </h2>
          {intro ? (
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              {intro}
            </p>
          ) : null}
        </div>
      )}

      <div className="max-w-2xl mx-auto w-full space-y-8 md:space-y-10">
        {popularTitle && fullList.length > 0 ? (
          <LiveExchangeRateTabs
            popularLabel={popularTabLabel}
            otherLabel={otherTabLabel}
            popularRows={ratesToMobileItems(popularList)}
            otherRows={ratesToMobileItems(otherList)}
          />
        ) : (
          <div>
            {popularTitle ? (
              <h3 className={`text-lg md:text-xl mb-4 text-center ${HOME_INDEX_HEADING_CLASS}`}>{popularTitle}</h3>
            ) : null}
            {renderSimpleTable(fullList, 'Open market currency rates')}
          </div>
        )}

        {!disableInnerContainer && (
          <div className="text-center mt-8 md:mt-10 space-y-5">
            <Button asChild className="h-12 rounded p-0">
              <Link
                href="/currency-rates"
                className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded bg-[#099546] px-8 font-semibold text-white"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-[#088040] transition-transform duration-500 ease-out group-hover:scale-y-100"
                />
                <span className="relative z-10 inline-flex items-center gap-2">
                  {ctaLabel || 'View Full Forex Rates'}
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            </Button>
            <CurrencyNoteSurface className="p-3 md:p-4 max-w-2xl mx-auto">
              <p className="text-xs md:text-sm text-slate-600 text-center leading-relaxed">
                Open-market figures for reference — confirm live rates at your branch before transacting.
              </p>
            </CurrencyNoteSurface>
          </div>
        )}
      </div>
    </div>
  )
}
