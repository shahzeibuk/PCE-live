import { currencyFlagEmoji } from '@/utilities/currencyFlags'
import { cn } from '@/utilities/ui'

export type MobileCurrencyRateItem = {
  id: string | number
  currency_code: string
  currency_name?: string | null
  buy_rate: number
  sell_rate: number
}

type Props = {
  rates: MobileCurrencyRateItem[]
  /** Shown above buy column (e.g. "Buying" on marketing tables) */
  buyLabel?: string
  sellLabel?: string
  /** Stripe alternate rows like the desktop table */
  striped?: boolean
  /** Centered Travelex-style cards (homepage tabbed rates) */
  variant?: 'default' | 'centered'
  className?: string
  'aria-label'?: string
}

/**
 * Stacked rate rows for small viewports — avoids horizontal table scrolling on phones.
 */
export function MobileCurrencyRateCards({
  rates,
  buyLabel = 'Buy',
  sellLabel = 'Sell',
  striped = true,
  variant = 'default',
  className,
  'aria-label': ariaLabel,
}: Props) {
  if (rates.length === 0) return null

  return (
    <ul
      className={cn('md:hidden space-y-2', className)}
      aria-label={ariaLabel}
    >
      {rates.map((rate, i) => (
        <li
          key={`${rate.id}-${rate.currency_code}`}
          className={cn(
            'rounded-lg border border-slate-200 bg-white px-3 py-3 shadow-sm',
            striped && i % 2 === 1 && 'bg-slate-50/95',
          )}
        >
          {variant === 'centered' ? (
            <div className="flex flex-col items-center text-center gap-3 py-1">
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl leading-none" aria-hidden>
                  {currencyFlagEmoji(rate.currency_code)}
                </span>
                <div className="font-bold text-slate-900 text-sm tabular-nums">{rate.currency_code}</div>
                {rate.currency_name ? (
                  <div className="text-xs text-slate-600 leading-snug line-clamp-2 max-w-[16rem]">
                    {rate.currency_name}
                  </div>
                ) : null}
              </div>
              <div className="flex w-full max-w-xs justify-center gap-8 sm:gap-10">
                <div className="text-center min-w-[3.5rem]">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500 leading-none mb-1">
                    {buyLabel}
                  </div>
                  <div className="font-mono text-sm font-semibold tabular-nums text-slate-800">
                    {rate.buy_rate.toFixed(2)}
                  </div>
                </div>
                <div className="text-center min-w-[3.5rem]">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500 leading-none mb-1">
                    {sellLabel}
                  </div>
                  <div className="font-mono text-sm font-semibold tabular-nums text-[#099546]">
                    {rate.sell_rate.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-2.5">
                <span className="text-xl leading-none shrink-0 md:text-2xl" aria-hidden>
                  {currencyFlagEmoji(rate.currency_code)}
                </span>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-sm tabular-nums">{rate.currency_code}</div>
                  {rate.currency_name ? (
                    <div className="text-xs text-slate-600 leading-snug line-clamp-2 mt-0.5">
                      {rate.currency_name}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="grid shrink-0 grid-cols-2 gap-x-4 text-right">
                <div className="min-w-[3.25rem]">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500 leading-none mb-1">
                    {buyLabel}
                  </div>
                  <div className="font-mono text-sm font-semibold tabular-nums text-slate-800">
                    {rate.buy_rate.toFixed(2)}
                  </div>
                </div>
                <div className="min-w-[3.25rem]">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500 leading-none mb-1">
                    {sellLabel}
                  </div>
                  <div className="font-mono text-sm font-semibold tabular-nums text-[#099546]">
                    {rate.sell_rate.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

/** Map CMS / API rate rows to card items */
export function ratesToMobileItems(
  rows: Array<{
    id: string | number
    currency_code: string
    currency_name?: string | null
    buy_rate?: unknown
    sell_rate?: unknown
  }>,
): MobileCurrencyRateItem[] {
  return rows.map((r) => ({
    id: r.id,
    currency_code: r.currency_code,
    currency_name: r.currency_name,
    buy_rate: Number(r.buy_rate ?? 0),
    sell_rate: Number(r.sell_rate ?? 0),
  }))
}
