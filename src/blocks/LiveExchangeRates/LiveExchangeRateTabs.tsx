'use client'

import type { MobileCurrencyRateItem } from '@/components/currency/MobileCurrencyRateCards'
import { MobileCurrencyRateCards } from '@/components/currency/MobileCurrencyRateCards'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { currencyFlagEmoji } from '@/utilities/currencyFlags'

const thCurrency =
  'px-4 py-3 text-left text-sm font-bold uppercase tracking-wide text-white md:px-5 md:py-3.5 md:text-base'
const thNumeric =
  'px-4 py-3 text-right text-sm font-bold uppercase tracking-wide text-white md:px-5 md:py-3.5 md:text-base'
const tdCls = 'px-4 py-3 md:px-5 md:py-4 align-middle border-b border-slate-200'

function RatesTable({ rows, ariaLabel }: { rows: MobileCurrencyRateItem[]; ariaLabel: string }) {
  return (
    <>
      {rows.length === 0 ? (
        <p className="md:hidden rounded-md border border-dashed border-slate-300 bg-slate-50 py-10 text-center text-sm text-slate-600">
          No rates in this group.
        </p>
      ) : (
        <MobileCurrencyRateCards
          rates={rows}
          buyLabel="Buying"
          sellLabel="Selling"
          aria-label={`${ariaLabel} (mobile list)`}
        />
      )}
      <div className="hidden md:block w-full overflow-x-auto overflow-y-auto max-h-[min(72vh,38rem)] lg:max-h-[min(78vh,44rem)] rounded-md border border-slate-300 bg-white [-webkit-overflow-scrolling:touch]">
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
                  No rates in this group.
                </td>
              </tr>
            ) : (
              rows.map((rate, i) => (
                <tr key={`${rate.id}-${rate.currency_code}`} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className={tdCls}>
                    <div className="flex items-center gap-3 md:gap-4">
                      <span className="text-2xl md:text-3xl shrink-0 leading-none" aria-hidden>
                        {currencyFlagEmoji(rate.currency_code)}
                      </span>
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
                    {rate.buy_rate.toFixed(2)}
                  </td>
                  <td
                    className={`${tdCls} text-right font-mono text-base md:text-lg font-semibold text-slate-900 tabular-nums whitespace-nowrap`}
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

/** Tabbed popular / other rate tables */
export function LiveExchangeRateTabs({ popularLabel, otherLabel, popularRows, otherRows }: LiveExchangeRateTabsProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Tabs defaultValue="popular" className="w-full">
        <div className="flex justify-center mb-5 md:mb-6">
          <TabsList className="inline-flex h-auto flex-wrap justify-center gap-1 rounded-md border border-slate-300 bg-slate-100 p-1">
            <TabsTrigger
              value="popular"
              className="rounded-md px-4 py-2 text-sm font-semibold text-slate-700 data-[state=active]:bg-white data-[state=active]:text-[#099546] data-[state=active]:shadow-sm"
            >
              {popularLabel}
            </TabsTrigger>
            <TabsTrigger
              value="other"
              className="rounded-md px-4 py-2 text-sm font-semibold text-slate-700 data-[state=active]:bg-white data-[state=active]:text-[#099546] data-[state=active]:shadow-sm"
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
