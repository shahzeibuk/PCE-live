import React from 'react'
import type { FrontendCurrencyRate } from '@/utilities/getCurrencyRatesForFrontend'
import { getRatesSyncMeta } from '@/utilities/currencyRatesDisplay'
import { CurrencyNoteSurface } from '@/components/layout/currencyBrandSurfaces'

type Props = {
  rates: FrontendCurrencyRate[]
}

export function CurrencyRatesLiveHeader({ rates }: Props) {
  const { isFallback, syncLabel } = getRatesSyncMeta(rates)

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse shrink-0" aria-hidden />
          <span className="text-sm font-bold uppercase tracking-wider text-emerald-600">Live Market</span>
        </div>
        <span className="text-sm text-muted-foreground font-medium sm:text-right">{syncLabel}</span>
      </div>
      {isFallback ? (
        <CurrencyNoteSurface className="p-3 md:p-4">
          <p className="text-sm text-amber-900 leading-relaxed">
            CMS has no saved rates yet — showing the same API figures sync uses. Run sync or schedules to store rows
            under <strong>Currency Rates</strong> (separate from branches).
          </p>
        </CurrencyNoteSurface>
      ) : null}
    </>
  )
}
