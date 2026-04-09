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
import { currencyFlagEmoji } from '@/utilities/currencyFlags'

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

const thCls = 'px-3 py-3 text-sm font-bold sm:px-4 sm:py-3.5 sm:text-base md:px-5 md:py-4 md:text-lg'
const tdCls = 'px-3 py-3 sm:px-4 sm:py-3.5 md:px-5 md:py-4'

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

  const renderTable = (rows: CurrencyRate[], ariaLabel: string) => (
    <div className="space-y-2">
      {rows.length === 0 ? (
        <p className="md:hidden rounded-lg border border-dashed border-slate-200 bg-slate-50 py-8 text-center text-sm text-slate-600">
          No rates in this group.
        </p>
      ) : (
        <MobileCurrencyRateCards
          rates={ratesToMobileItems(rows)}
          buyLabel="Buying"
          sellLabel="Selling"
          aria-label={`${ariaLabel} (mobile list)`}
        />
      )}
      <div className="hidden md:block overflow-x-auto overflow-y-auto max-h-[min(70vh,32rem)] lg:max-h-none rounded border border-slate-200 bg-white shadow-sm [-webkit-overflow-scrolling:touch]">
        <table className="w-full border-collapse text-left" aria-label={ariaLabel}>
          <thead className="sticky top-0 z-10 shadow-[0_1px_0_0_rgb(226_232_240)]">
            <tr className="bg-[#099546] text-white">
              <th className={`${thCls} text-left`}>Currency</th>
              <th className={`${thCls} text-center`}>Buying</th>
              <th className={`${thCls} text-center`}>Selling</th>
            </tr>
          </thead>
          <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={3} className={`${tdCls} text-center text-slate-500 text-base`}>
                No rates in this group.
              </td>
            </tr>
          ) : (
            rows.map((rate, i) => (
              <tr
                key={`${rate.id}-${rate.currency_code}`}
                className={`border-t border-slate-200 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-100'}`}
              >
                <td className={tdCls}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl sm:text-2xl lg:text-[1.75rem]" aria-hidden>
                      {currencyFlagEmoji(rate.currency_code)}
                    </span>
                    <div className="min-w-0">
                      <span className="font-bold text-slate-900 text-sm sm:text-base lg:text-lg">{rate.currency_code}</span>
                      <span className="text-slate-500 block text-xs sm:text-sm lg:text-base line-clamp-2">{rate.currency_name}</span>
                    </div>
                  </div>
                </td>
                <td
                  className={`${tdCls} text-center font-mono text-sm sm:text-base lg:text-lg font-semibold text-slate-800 tabular-nums whitespace-nowrap`}
                >
                  {Number(rate.buy_rate ?? 0).toFixed(2)}
                </td>
                <td
                  className={`${tdCls} text-center font-mono text-sm sm:text-base lg:text-lg font-semibold text-[#099546] tabular-nums whitespace-nowrap`}
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
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
            {title || 'Live Exchange Rates'}
          </h2>
          {intro ? (
            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-3">
              {intro}
            </p>
          ) : null}
          {supportingText ? (
            <p className="text-slate-500 text-base leading-relaxed max-w-2xl mx-auto">{supportingText}</p>
          ) : null}
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-10 md:space-y-12">
        {popularTitle && popularList.length > 0 && otherList.length > 0 ? (
          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:gap-10 lg:items-start">
            <div className="w-full order-1">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 text-center lg:text-left">
                {popularTitle}
              </h3>
              {renderTable(popularList, 'Popular currency exchange rates')}
            </div>
            <div className="w-full order-2">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 text-center lg:text-left">
                Other quoted rates
              </h3>
              {renderTable(otherList, 'Additional currency exchange rates')}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {popularTitle ? (
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 text-center">{popularTitle}</h3>
            ) : null}
            {renderTable(fullList, 'Open market currency rates')}
          </div>
        )}

        {!disableInnerContainer && (
          <div className="text-center mt-8 md:mt-10 space-y-5">
            <Button asChild className="rounded bg-[#099546] hover:bg-[#088040] text-white h-12 px-8 font-semibold">
              <Link href="/currency-rates" className="inline-flex items-center gap-2">
                {ctaLabel || 'View Full Forex Rates'}
                <ChevronDown className="h-4 w-4" />
              </Link>
            </Button>
            <CurrencyNoteSurface className="p-4 md:p-5">
              <p className="text-sm md:text-base text-slate-600 text-center leading-relaxed">
                Open-market figures for reference — confirm live rates at your branch before transacting.
              </p>
            </CurrencyNoteSurface>
          </div>
        )}
      </div>
    </div>
  )
}
