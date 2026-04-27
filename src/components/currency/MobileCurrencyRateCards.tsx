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
  /** Tighter padding and type (e.g. homepage rates) */
  size?: 'default' | 'compact'
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
  size = 'default',
  className,
  'aria-label': ariaLabel,
}: Props) {
  if (rates.length === 0) return null

  const compact = size === 'compact'

  return (
    <ul
      className={cn('md:hidden', compact ? 'space-y-1.5' : 'space-y-2', className)}
      aria-label={ariaLabel}
    >
      {rates.map((rate, i) => (
        <li
          key={`${rate.id}-${rate.currency_code}`}
          className={cn(
            'rounded-lg border border-slate-200 bg-white shadow-sm',
            compact ? 'px-2 py-2' : 'px-3 py-3',
            striped && i % 2 === 1 && 'bg-slate-50/95',
          )}
        >
          {variant === 'centered' ? (
            <div className={cn('flex flex-col items-center text-center py-1', compact ? 'gap-2' : 'gap-3')}>
              <div className="flex flex-col items-center gap-1">
                <span className={cn('leading-none', compact ? 'text-xl' : 'text-2xl')} aria-hidden>
                  {currencyFlagEmoji(rate.currency_code)}
                </span>
                <div
                  className={cn('font-bold text-slate-900 tabular-nums', compact ? 'text-xs' : 'text-sm')}
                >
                  {rate.currency_code}
                </div>
                {rate.currency_name ? (
                  <div
                    className={cn(
                      'text-slate-600 leading-snug line-clamp-2 max-w-[16rem]',
                      compact ? 'text-[10px]' : 'text-xs',
                    )}
                  >
                    {rate.currency_name}
                  </div>
                ) : null}
              </div>
              <div className={cn('flex w-full max-w-xs justify-center', compact ? 'gap-6' : 'gap-8 sm:gap-10')}>
                <div className="text-center min-w-[3rem]">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500 leading-none mb-1">
                    {buyLabel}
                  </div>
                  <div
                    className={cn('font-mono font-semibold tabular-nums text-slate-800', compact ? 'text-xs' : 'text-sm')}
                  >
                    {rate.buy_rate.toFixed(2)}
                  </div>
                </div>
                <div className="text-center min-w-[3rem]">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500 leading-none mb-1">
                    {sellLabel}
                  </div>
                  <div
                    className={cn('font-mono font-semibold tabular-nums text-[#099546]', compact ? 'text-xs' : 'text-sm')}
                  >
                    {rate.sell_rate.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={cn('flex items-start justify-between', compact ? 'gap-2' : 'gap-3')}>
              <div className={cn('flex min-w-0 flex-1 items-center', compact ? 'gap-2' : 'gap-2.5')}>
                <span
                  className={cn('leading-none shrink-0', compact ? 'text-lg' : 'text-xl md:text-2xl')}
                  aria-hidden
                >
                  {currencyFlagEmoji(rate.currency_code)}
                </span>
                <div className="min-w-0">
                  <div
                    className={cn('font-bold text-slate-900 tabular-nums', compact ? 'text-xs' : 'text-sm')}
                  >
                    {rate.currency_code}
                  </div>
                  {rate.currency_name ? (
                    <div
                      className={cn(
                        'text-slate-600 leading-snug line-clamp-2 mt-0.5',
                        compact ? 'text-[10px]' : 'text-xs',
                      )}
                    >
                      {rate.currency_name}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className={cn('grid shrink-0 grid-cols-2 text-right', compact ? 'gap-x-3' : 'gap-x-4')}>
                <div className={cn(compact ? 'min-w-[2.75rem]' : 'min-w-[3.25rem]')}>
                  <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500 leading-none mb-1">
                    {buyLabel}
                  </div>
                  <div
                    className={cn('font-mono font-semibold tabular-nums text-slate-800', compact ? 'text-xs' : 'text-sm')}
                  >
                    {rate.buy_rate.toFixed(2)}
                  </div>
                </div>
                <div className={cn(compact ? 'min-w-[2.75rem]' : 'min-w-[3.25rem]')}>
                  <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500 leading-none mb-1">
                    {sellLabel}
                  </div>
                  <div
                    className={cn('font-mono font-semibold tabular-nums text-[#099546]', compact ? 'text-xs' : 'text-sm')}
                  >
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
