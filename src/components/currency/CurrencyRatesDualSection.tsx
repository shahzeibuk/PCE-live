'use client'

import React, { useMemo, useState } from 'react'
import { POPULAR_FOREX_CODES, isPopularForexCode } from '@/constants/popularCurrencyCodes'
import type { FrontendCurrencyRate } from '@/utilities/getCurrencyRatesForFrontend'
import { currencyFlagEmoji } from '@/utilities/currencyFlags'
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
    ? 'px-3 py-2.5 text-sm md:text-base font-bold'
    : 'px-4 py-3.5 text-base md:text-lg font-bold'
  const td = compact ? 'px-3 py-2.5 md:py-3' : 'px-4 py-4 md:py-[1.125rem]'
  const codeCls = compact ? 'font-bold text-slate-900' : 'font-bold text-slate-900 text-base md:text-lg'
  const nameCls = compact
    ? 'text-xs uppercase tracking-tight text-slate-500'
    : 'text-sm uppercase tracking-tight text-slate-500'
  const numCls = compact
    ? 'text-center font-mono text-sm md:text-base font-semibold tabular-nums'
    : 'text-center font-mono text-base md:text-lg font-semibold tabular-nums'

  return (
    <div className="space-y-2">
      <p className="text-center text-xs text-slate-500 sm:hidden px-1" aria-hidden>
        Swipe sideways for all columns
      </p>
      <div className="overflow-x-auto overflow-y-auto max-h-[min(70vh,26rem)] sm:max-h-none rounded-xl border border-slate-200 bg-white shadow-sm [-webkit-overflow-scrolling:touch]">
        <table className="w-full min-w-[16rem] border-collapse text-left" aria-label={ariaLabel}>
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
                <div className="flex items-center gap-3">
                  <span className="text-2xl md:text-[1.75rem]" aria-hidden>
                    {currencyFlagEmoji(rate.currency_code)}
                  </span>
                  <div>
                    <div className={codeCls}>{rate.currency_code}</div>
                    <div className={nameCls}>{rate.currency_name}</div>
                  </div>
                </div>
              </td>
              <td className={`${td} ${numCls} text-slate-800`}>
                {Number(rate.buy_rate).toFixed(2)}
              </td>
              <td className={`${td} ${numCls} text-emerald-700`}>
                {Number(rate.sell_rate).toFixed(2)}
              </td>
            </tr>
          ))}
          {rates.length === 0 && (
            <tr>
              <td colSpan={3} className="px-4 py-10 text-center text-slate-500">
                No rows in this group.
              </td>
            </tr>
          )}
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
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <h2 className="text-lg font-bold text-slate-900">More quoted rates</h2>
                {hasMoreOther ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="border-[#099546] text-[#099546] hover:bg-[#099546]/5 font-semibold"
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

          <div className="flex justify-center pt-2 lg:hidden">
            <Button
              type="button"
              variant="outline"
              className="border-2 border-[#099546] text-[#099546] hover:bg-[#099546]/5 font-semibold h-11 px-8"
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
        <DialogContent className="max-h-[85vh] max-w-4xl overflow-y-auto sm:max-w-4xl">
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
