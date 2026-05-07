'use client'

import React, { useMemo } from 'react'
import { POPULAR_FOREX_CODES, isPopularForexCode } from '@/constants/popularCurrencyCodes'
import type { FrontendCurrencyRate } from '@/utilities/getCurrencyRatesForFrontend'
import { MobileCurrencyRateCards, ratesToMobileItems } from '@/components/currency/MobileCurrencyRateCards'
import { CurrencyFlag } from '@/components/currency/CurrencyFlag'

function RatesTable({
  rates,
  compact,
  'aria-label': ariaLabel,
}: {
  rates: FrontendCurrencyRate[]
  compact?: boolean
  'aria-label'?: string
}) {
  const th = compact
    ? 'px-2.5 py-2 text-xs font-bold sm:px-3 sm:py-2.5 sm:text-sm md:text-base'
    : 'px-3 py-3 text-sm font-bold sm:px-4 sm:py-3.5 md:text-lg'
  const td = compact
    ? 'px-2.5 py-2 sm:px-3 sm:py-2.5 md:py-3'
    : 'px-3 py-3 sm:px-4 md:py-[1.125rem]'
  const codeCls = compact ? 'font-bold text-slate-900 text-sm sm:text-base' : 'font-bold text-slate-900 text-sm md:text-lg'
  const nameCls = compact
    ? 'text-[10px] uppercase tracking-tight text-slate-500 sm:text-xs'
    : 'text-xs uppercase tracking-tight text-slate-500 sm:text-sm'
  const numCls = compact
    ? 'text-right font-mono text-xs font-semibold tabular-nums sm:text-sm md:text-base'
    : 'text-right font-mono text-sm font-semibold tabular-nums md:text-lg'

  if (rates.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 py-8 text-center text-sm text-slate-600">
        No rates available.
      </p>
    )
  }

  return (
    <div className="space-y-2">
      <MobileCurrencyRateCards
        rates={ratesToMobileItems(rates)}
        aria-label={`${ariaLabel ?? 'Rates'} (mobile list)`}
      />
      <div className="hidden md:block overflow-x-auto overflow-y-auto max-h-[min(70vh,32rem)] lg:max-h-none rounded-xl border border-slate-200 bg-white shadow-sm [-webkit-overflow-scrolling:touch]">
        <table className="w-full border-collapse text-left" aria-label={ariaLabel}>
          <thead className="sticky top-0 z-10 shadow-[0_1px_0_0_rgb(226_232_240)]">
            <tr className="bg-[#099546] text-white">
              <th className={th}>Currency</th>
              <th className={`${th} text-right`}>Buy</th>
              <th className={`${th} text-right`}>Sell</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate, i) => (
              <tr
                key={`${rate.id}-${rate.currency_code}`}
                className={`border-t border-slate-200 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/80'}`}
              >
                <td className={td}>
                  <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <CurrencyFlag currencyCode={rate.currency_code} className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
                    <div className="min-w-0">
                      <div className={codeCls}>{rate.currency_code}</div>
                      <div className={`${nameCls} line-clamp-2`}>{rate.currency_name}</div>
                    </div>
                  </div>
                </td>
                <td className={`${td} ${numCls} text-slate-800 whitespace-nowrap`}>
                  {Number(rate.buy_rate).toFixed(2)}
                </td>
                <td className={`${td} ${numCls} text-emerald-700 whitespace-nowrap`}>
                  {Number(rate.sell_rate).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

type Props = {
  rates: FrontendCurrencyRate[]
}

/** Single table: major pairs first (same order as before), then other codes A–Z. */
export function CurrencyRatesDualSection({ rates }: Props) {
  const allRatesOrdered = useMemo(() => {
    const popularOrdered = POPULAR_FOREX_CODES.map((code) => rates.find((r) => r.currency_code === code)).filter(
      (r): r is FrontendCurrencyRate => Boolean(r),
    )
    const others = rates
      .filter((r) => !isPopularForexCode(r.currency_code))
      .slice()
      .sort((a, b) => a.currency_code.localeCompare(b.currency_code))
    return [...popularOrdered, ...others]
  }, [rates])

  return (
    <div className="w-full">
      <RatesTable rates={allRatesOrdered} aria-label="Open market currency buy and sell rates" />
    </div>
  )
}
