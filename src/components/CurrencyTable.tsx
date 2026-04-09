import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import {
  getCurrencyRatesForFrontend,
  type FrontendCurrencyRate,
} from '@/utilities/getCurrencyRatesForFrontend'
import { MobileCurrencyRateCards, ratesToMobileItems } from '@/components/currency/MobileCurrencyRateCards'
import { CurrencyNoteSurface } from '@/components/layout/currencyBrandSurfaces'
import { currencyFlagEmoji } from '@/utilities/currencyFlags'
import { getRatesSyncMeta } from '@/utilities/currencyRatesDisplay'

type Props = {
  /** When omitted, loads from CMS with live API fallback (no rates stored on branches). */
  rates?: FrontendCurrencyRate[]
}

export const CurrencyTable = async ({ rates: providedRates }: Props = {}) => {
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

  const { isFallback, syncLabel } = getRatesSyncMeta(rates)

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between px-2 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="size-2 shrink-0 rounded-full bg-emerald-500 animate-pulse motion-reduce:animate-none" />
          <span className="text-sm font-bold uppercase tracking-wider text-emerald-600">
            Live Market
          </span>
        </div>
        <span className="text-sm text-muted-foreground font-medium text-right max-w-[70%]">{syncLabel}</span>
      </div>
      {rates.length > 0 ? (
        <MobileCurrencyRateCards
          rates={ratesToMobileItems(rates)}
          aria-label="Live currency rates (mobile list)"
        />
      ) : (
        <p className="md:hidden rounded-lg border border-dashed border-slate-200 bg-slate-50 py-8 text-center text-sm text-muted-foreground">
          Rates unavailable — check your connection or try again shortly.
        </p>
      )}

      {isFallback && (
        <CurrencyNoteSurface className="p-3 -mt-2">
          <p className="text-xs text-amber-900 leading-snug">
            CMS has no saved rates yet — showing the same API figures sync uses. Run sync or schedules to store rows
            under <strong>Currency Rates</strong> (separate from branches).
          </p>
        </CurrencyNoteSurface>
      )}

      <div className="hidden md:block overflow-x-auto overflow-y-auto max-h-[min(70vh,32rem)] lg:max-h-none rounded-2xl border bg-white shadow-sm [-webkit-overflow-scrolling:touch]">
        <Table className="w-full min-w-0">
          <TableHeader className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur-sm shadow-[inset_0_-1px_0_0_var(--border)]">
            <TableRow className="hover:bg-transparent border-b">
              <TableHead className="font-bold text-slate-900 h-12 text-sm lg:h-14 lg:text-base">Currency</TableHead>
              <TableHead className="font-bold text-slate-900 h-12 text-right text-sm lg:h-14 lg:text-base">Buy</TableHead>
              <TableHead className="font-bold text-slate-900 h-12 text-right text-sm lg:h-14 lg:text-base">Sell</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rates.map((rate) => (
              <TableRow
                key={`${rate.id}-${rate.currency_code}`}
                className="group hover:bg-slate-50/50 transition-colors border-b last:border-0"
              >
                <TableCell className="py-3 md:py-5">
                  <div className="flex min-w-0 items-center gap-2 md:gap-3">
                    <span className="text-xl shrink-0 md:text-2xl lg:text-[1.75rem] grayscale-0 group-hover:grayscale-0 transition-all duration-300">
                      {currencyFlagEmoji(rate.currency_code)}
                    </span>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 text-sm md:text-base lg:text-lg">{rate.currency_code}</div>
                      <div className="text-[10px] uppercase tracking-tight text-muted-foreground font-medium md:text-xs line-clamp-2">
                        {rate.currency_name}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right py-3 md:py-5 font-mono font-bold text-slate-700 tabular-nums text-sm md:text-base lg:text-lg whitespace-nowrap">
                  {Number(rate.buy_rate).toFixed(2)}
                </TableCell>
                <TableCell className="text-right py-3 md:py-5 font-mono font-bold text-emerald-600 tabular-nums text-sm md:text-base lg:text-lg whitespace-nowrap">
                  {Number(rate.sell_rate).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            {rates.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-12 text-muted-foreground italic font-medium">
                  Rates unavailable — check your connection or try again shortly.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
