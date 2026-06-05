import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { HOME_RATES_SECTION } from '@/components/home/homeContent'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import {
  getCurrencyRatesForFrontend,
  type FrontendCurrencyRate,
} from '@/utilities/getCurrencyRatesForFrontend'
import { MobileCurrencyRateCards, ratesToMobileItems } from '@/components/currency/MobileCurrencyRateCards'
import { CurrencyNoteSurface } from '@/components/layout/currencyBrandSurfaces'
import { CurrencyFlag } from '@/components/currency/CurrencyFlag'
import { getRatesSyncMeta } from '@/utilities/currencyRatesDisplay'
import { POPULAR_FOREX_CODES, isPopularForexCode } from '@/constants/popularCurrencyCodes'
import { cn } from '@/utilities/ui'

type Props = {
  /** When omitted, loads from CMS with live API fallback (no rates stored on branches). */
  rates?: FrontendCurrencyRate[]
  /** Compact panel for homepage hero (popular pairs, desktop table). */
  variant?: 'default' | 'hero'
}

function orderHeroRates(rates: FrontendCurrencyRate[]): FrontendCurrencyRate[] {
  const popular = POPULAR_FOREX_CODES.map((code) =>
    rates.find((r) => r.currency_code?.toUpperCase() === code),
  ).filter((r): r is FrontendCurrencyRate => Boolean(r))
  const others = rates
    .filter((r) => !isPopularForexCode(r.currency_code))
    .sort((a, b) => a.currency_code.localeCompare(b.currency_code))
  return [...popular, ...others]
}

export const CurrencyTable = async ({ rates: providedRates, variant = 'default' }: Props = {}) => {
  const isHero = variant === 'hero'
  let rates: FrontendCurrencyRate[] = []
  try {
    if (providedRates?.length) {
      rates = providedRates
    } else {
      const payload = await getPayload({ config: configPromise })
      rates = await getCurrencyRatesForFrontend(payload)
    }
  } catch (error) {
    console.error('Error fetching currency rates in CurrencyTable:', error)
  }

  const displayRates = isHero ? orderHeroRates(rates) : rates
  const { isFallback, syncLabel } = getRatesSyncMeta(rates)

  return (
    <div
      className={cn(
        'w-full',
        isHero
          ? 'flex flex-col space-y-3 border-t border-slate-200 bg-white p-4 lg:h-full lg:space-y-0 lg:rounded-md lg:border lg:border-slate-200/90 lg:bg-white/80 lg:p-0 lg:backdrop-blur-md'
          : 'space-y-4',
      )}
    >
      <div
        className={cn(
          'flex shrink-0 items-center justify-between gap-2',
          isHero ? 'border-b border-slate-200 px-3 py-2 lg:px-3 lg:py-2.5' : 'px-2',
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="size-2 shrink-0 rounded-full bg-emerald-500 animate-pulse motion-reduce:animate-none" />
          <span
            className={cn(
              'font-bold uppercase tracking-wider text-emerald-600',
              isHero ? 'text-xs' : 'text-sm',
            )}
          >
            Live Market
          </span>
        </div>
        <span
          className={cn(
            'text-muted-foreground font-medium text-right max-w-[70%]',
            isHero ? 'text-[10px] leading-tight sm:text-xs' : 'text-sm',
          )}
        >
          {syncLabel}
        </span>
      </div>
      {displayRates.length > 0 ? (
        <div className={isHero ? 'lg:hidden' : undefined}>
          <MobileCurrencyRateCards
            rates={ratesToMobileItems(displayRates)}
            aria-label="Live currency rates (mobile list)"
          />
        </div>
      ) : (
        <p
          className={cn(
            'rounded-lg border border-dashed border-slate-200 bg-slate-50 py-8 text-center text-sm text-muted-foreground',
            isHero ? 'lg:hidden' : 'md:hidden',
          )}
        >
          Rates unavailable — check your connection or try again shortly.
        </p>
      )}

      {isFallback && !isHero && (
        <CurrencyNoteSurface className="p-3 -mt-2">
          <p className="text-xs text-amber-900 leading-snug">
            CMS has no saved rates yet — showing the same API figures sync uses. Run sync or schedules to store rows
            under <strong>Currency Rates</strong> (separate from branches).
          </p>
        </CurrencyNoteSurface>
      )}

      <div
        className={cn(
          'overflow-x-auto overflow-y-auto [-webkit-overflow-scrolling:touch]',
          isHero ? 'hidden lg:flex lg:min-h-0 lg:flex-1 lg:flex-col' : 'hidden md:block',
          isHero
            ? 'lg:rounded-none lg:border-0 lg:bg-transparent'
            : 'max-h-[min(70vh,32rem)] lg:max-h-none rounded-2xl border bg-white shadow-sm',
        )}
      >
        <Table className={cn('w-full min-w-0', isHero && 'lg:h-full lg:table-fixed')}>
          <TableHeader
            className={cn(
              'sticky top-0 z-10 shadow-[inset_0_-1px_0_0_var(--border)]',
              isHero ? 'bg-[#099546]' : 'bg-slate-50/95 backdrop-blur-sm',
            )}
          >
            <TableRow className={cn('hover:bg-transparent border-b', isHero && 'border-transparent')}>
              <TableHead
                className={cn(
                  'font-bold text-sm',
                  isHero ? 'h-9 px-3 text-white lg:h-10' : 'h-10 text-slate-900 lg:h-14 lg:text-base',
                )}
              >
                Currency
              </TableHead>
              <TableHead
                className={cn(
                  'font-bold text-right text-sm',
                  isHero ? 'h-9 px-3 text-white lg:h-10' : 'h-10 text-slate-900 lg:h-14 lg:text-base',
                )}
              >
                Buy
              </TableHead>
              <TableHead
                className={cn(
                  'font-bold text-right text-sm',
                  isHero ? 'h-9 px-3 text-white lg:h-10' : 'h-10 text-slate-900 lg:h-14 lg:text-base',
                )}
              >
                Sell
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayRates.map((rate) => (
              <TableRow
                key={`${rate.id}-${rate.currency_code}`}
                className="group hover:bg-slate-50/50 transition-colors border-b last:border-0"
              >
                <TableCell className={cn(isHero ? 'px-3 py-2 lg:py-2.5' : 'py-3 md:py-5')}>
                  <div className="flex min-w-0 items-center gap-2 md:gap-3">
                    <CurrencyFlag
                      currencyCode={rate.currency_code}
                      className={cn(
                        'shrink-0 grayscale-0 group-hover:grayscale-0 transition-all duration-300',
                        isHero ? 'h-5 w-5' : 'h-6 w-6 md:h-7 md:w-7',
                      )}
                    />
                    <div className="min-w-0">
                      <div
                        className={cn(
                          'font-bold text-slate-900',
                          isHero ? 'text-sm' : 'text-sm md:text-base lg:text-lg',
                        )}
                      >
                        {rate.currency_code}
                      </div>
                      {!isHero && (
                        <div className="text-[10px] uppercase tracking-tight text-muted-foreground font-medium md:text-xs line-clamp-2">
                          {rate.currency_name}
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className={cn(
                    'text-right font-mono font-bold text-slate-700 tabular-nums whitespace-nowrap',
                    isHero ? 'px-3 py-2 text-sm lg:py-2.5' : 'py-3 md:py-5 text-sm md:text-base lg:text-lg',
                  )}
                >
                  {Number(rate.buy_rate).toFixed(2)}
                </TableCell>
                <TableCell
                  className={cn(
                    'text-right font-mono font-bold text-emerald-600 tabular-nums whitespace-nowrap',
                    isHero ? 'px-3 py-2 text-sm lg:py-2.5' : 'py-3 md:py-5 text-sm md:text-base lg:text-lg',
                  )}
                >
                  {Number(rate.sell_rate).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            {displayRates.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-12 text-muted-foreground italic font-medium">
                  Rates unavailable — check your connection or try again shortly.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {isHero ? (
        <div className="shrink-0 border-t border-slate-200 bg-white p-3 lg:bg-transparent lg:p-3">
          <Button asChild className="h-11 w-full rounded bg-[#099546] font-semibold text-white hover:bg-[#088040]">
            <Link href="/currency-rates">{HOME_RATES_SECTION.ctaLabel}</Link>
          </Button>
        </div>
      ) : null}
    </div>
  )
}
