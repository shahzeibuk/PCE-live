'use client'

import React, { useMemo, useState } from 'react'
import { POPULAR_FOREX_CODES, isPopularForexCode } from '@/constants/popularCurrencyCodes'
import type { FrontendCurrencyRate } from '@/utilities/getCurrencyRatesForFrontend'
import { MobileCurrencyRateCards, ratesToMobileItems } from '@/components/currency/MobileCurrencyRateCards'
import { CurrencyFlag } from '@/components/currency/CurrencyFlag'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

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
        No rows in this group.
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

export function CurrencyRatesDualSection({ rates }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<'all' | 'other'>('all')

  const popularOrdered = useMemo(() => {
    return POPULAR_FOREX_CODES.map((code) => rates.find((r) => r.currency_code === code)).filter(
      (r): r is FrontendCurrencyRate => Boolean(r),
    )
  }, [rates])

  const otherRates = useMemo(
    () => rates.filter((r) => !isPopularForexCode(r.currency_code)),
    [rates],
  )

  const showDual = popularOrdered.length > 0 && otherRates.length > 0
  const mobileOtherPreview = otherRates.slice(0, 6)
  const hasMoreOther = otherRates.length > mobileOtherPreview.length

  const openFullList = () => {
    setDialogMode('all')
    setDialogOpen(true)
  }

  const openOtherOnly = () => {
    setDialogMode('other')
    setDialogOpen(true)
  }

  const dialogRates = dialogMode === 'other' ? otherRates : rates

  return (
    <div className="w-full space-y-6">
      {showDual ? (
        <>
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4">Major open market pairs</h2>
              <RatesTable rates={popularOrdered} aria-label="Major currency buy and sell rates" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4">All other quoted rates</h2>
              <RatesTable rates={otherRates} aria-label="Additional currency buy and sell rates" />
            </div>
          </div>

          <div className="lg:hidden space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-3">Major open market pairs</h2>
              <RatesTable rates={popularOrdered} compact aria-label="Major currency rates" />
            </div>
            <div>
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-slate-900">More quoted rates</h2>
                {hasMoreOther ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full shrink-0 border-[#099546] font-semibold text-[#099546] hover:bg-[#099546]/5 sm:w-auto"
                    onClick={openOtherOnly}
                  >
                    All quoted rates ({otherRates.length})
                  </Button>
                ) : null}
              </div>
              <RatesTable rates={mobileOtherPreview} compact aria-label="Additional currency rates preview" />
              {hasMoreOther ? (
                <p className="mt-3 text-sm text-slate-600 text-center">
                  Showing {mobileOtherPreview.length} of {otherRates.length}. Tap <strong>All quoted rates</strong>{' '}
                  for the full list.
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-center px-0 pt-2 lg:hidden">
            <Button
              type="button"
              variant="outline"
              className="h-12 min-h-12 w-full max-w-lg border-2 border-[#099546] px-4 font-semibold text-[#099546] hover:bg-[#099546]/5 sm:w-auto sm:max-w-none sm:px-8"
              onClick={openFullList}
            >
              All quoted rates in one view ({rates.length})
            </Button>
          </div>
        </>
      ) : (
        <RatesTable rates={rates} aria-label="Currency buy and sell rates" />
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[min(90vh,900px)] w-[calc(100vw-1.25rem)] max-w-4xl gap-3 overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === 'other' ? 'All additional quoted rates' : 'Complete rate list'}
            </DialogTitle>
          </DialogHeader>
          <RatesTable rates={dialogRates} aria-label="Full currency rate list" />
        </DialogContent>
      </Dialog>
    </div>
  )
}
