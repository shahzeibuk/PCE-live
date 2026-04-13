'use client'

import type { MobileCurrencyRateItem } from '@/components/currency/MobileCurrencyRateCards'
import { MobileCurrencyRateCards } from '@/components/currency/MobileCurrencyRateCards'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { currencyFlagEmoji } from '@/utilities/currencyFlags'

const thCls =
  'px-3 py-3 text-center text-sm font-bold sm:px-4 sm:py-3.5 sm:text-base md:px-5 md:py-4 md:text-lg'
const tdCls = 'px-3 py-3 text-center sm:px-4 sm:py-3.5 md:px-5 md:py-4'

function RatesTable({ rows, ariaLabel }: { rows: MobileCurrencyRateItem[]; ariaLabel: string }) {
  return (
    <>
      {rows.length === 0 ? (
        <p className="md:hidden rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 py-10 text-center text-sm text-slate-600">
          No rates in this group.
        </p>
      ) : (
        <MobileCurrencyRateCards
          rates={rows}
          buyLabel="Buying"
          sellLabel="Selling"
          variant="centered"
          aria-label={`${ariaLabel} (mobile list)`}
        />
      )}
      <div className="hidden md:block overflow-x-auto overflow-y-auto max-h-[min(70vh,32rem)] lg:max-h-[min(78vh,40rem)] rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100/80 max-w-4xl mx-auto [-webkit-overflow-scrolling:touch]">
        <table className="w-full border-collapse text-center" aria-label={ariaLabel}>
          <thead className="sticky top-0 z-10 shadow-[0_1px_0_0_rgb(226_232_240)]">
            <tr className="bg-[#099546] text-white">
              <th className={thCls}>Currency</th>
              <th className={thCls}>Buying (PKR)</th>
              <th className={thCls}>Selling (PKR)</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={3} className={`${tdCls} text-slate-500 text-base py-10`}>
                  No rates in this group.
                </td>
              </tr>
            ) : (
              rows.map((rate, i) => (
                <tr
                  key={`${rate.id}-${rate.currency_code}`}
                  className={`border-t border-slate-200 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/90'}`}
                >
                  <td className={tdCls}>
                    <div className="flex flex-col items-center justify-center gap-1.5 text-center mx-auto max-w-[14rem]">
                      <span className="text-xl sm:text-2xl lg:text-[1.65rem] leading-none" aria-hidden>
                        {currencyFlagEmoji(rate.currency_code)}
                      </span>
                      <span className="font-bold text-slate-900 text-sm sm:text-base lg:text-lg">{rate.currency_code}</span>
                      {rate.currency_name ? (
                        <span className="text-slate-500 text-xs sm:text-sm lg:text-[0.9375rem] leading-snug line-clamp-2">
                          {rate.currency_name}
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td
                    className={`${tdCls} font-mono text-sm sm:text-base lg:text-lg font-semibold text-slate-800 tabular-nums whitespace-nowrap`}
                  >
                    {rate.buy_rate.toFixed(2)}
                  </td>
                  <td
                    className={`${tdCls} font-mono text-sm sm:text-base lg:text-lg font-semibold text-[#099546] tabular-nums whitespace-nowrap`}
                  >
                    {rate.sell_rate.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export type LiveExchangeRateTabsProps = {
  popularLabel: string
  otherLabel: string
  popularRows: MobileCurrencyRateItem[]
  otherRows: MobileCurrencyRateItem[]
}

/** Travelex-style pill tabs + centered rate tables */
export function LiveExchangeRateTabs({ popularLabel, otherLabel, popularRows, otherRows }: LiveExchangeRateTabsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="popular" className="w-full">
        <div className="flex justify-center mb-8 md:mb-10">
          <TabsList className="inline-flex h-auto flex-wrap justify-center gap-1 rounded-full border border-slate-200/90 bg-slate-100 p-1.5 shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)]">
            <TabsTrigger
              value="popular"
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all data-[state=active]:bg-white data-[state=active]:text-[#099546] data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-slate-200/90"
            >
              {popularLabel}
            </TabsTrigger>
            <TabsTrigger
              value="other"
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all data-[state=active]:bg-white data-[state=active]:text-[#099546] data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-slate-200/90"
            >
              {otherLabel}
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="popular" className="mt-0 outline-none focus-visible:outline-none">
          <RatesTable rows={popularRows} ariaLabel="Popular open market currency rates" />
        </TabsContent>
        <TabsContent value="other" className="mt-0 outline-none focus-visible:outline-none">
          <RatesTable rows={otherRows} ariaLabel="Additional open market currency rates" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
