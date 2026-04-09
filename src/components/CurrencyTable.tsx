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
      <p className="text-center text-xs text-muted-foreground md:hidden px-1" aria-hidden>
        Swipe to see all columns
      </p>

      {isFallback && (
        <CurrencyNoteSurface className="p-3 -mt-2">
          <p className="text-xs text-amber-900 leading-snug">
            CMS has no saved rates yet — showing the same API figures sync uses. Run sync or schedules to store rows
            under <strong>Currency Rates</strong> (separate from branches).
          </p>
        </CurrencyNoteSurface>
      )}

      <div className="overflow-x-auto overflow-y-auto max-h-[min(70vh,28rem)] md:max-h-none rounded-2xl border bg-white shadow-sm [-webkit-overflow-scrolling:touch]">
        <Table className="min-w-[17rem]">
          <TableHeader className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur-sm shadow-[inset_0_-1px_0_0_var(--border)]">
            <TableRow className="hover:bg-transparent border-b">
              <TableHead className="font-bold text-slate-900 h-14 text-base">Currency</TableHead>
              <TableHead className="font-bold text-slate-900 h-14 text-right text-base">Buy</TableHead>
              <TableHead className="font-bold text-slate-900 h-14 text-right text-base">Sell</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rates.map((rate) => (
              <TableRow
                key={`${rate.id}-${rate.currency_code}`}
                className="group hover:bg-slate-50/50 transition-colors border-b last:border-0"
              >
                <TableCell className="py-4 md:py-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl md:text-[1.75rem] grayscale-0 group-hover:grayscale-0 transition-all duration-300">
                      {currencyFlagEmoji(rate.currency_code)}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 text-base md:text-lg">{rate.currency_code}</div>
                      <div className="text-xs uppercase tracking-tight text-muted-foreground font-medium">
                        {rate.currency_name}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right py-4 md:py-5 font-mono font-bold text-slate-700 tabular-nums text-base md:text-lg">
                  {Number(rate.buy_rate).toFixed(2)}
                </TableCell>
                <TableCell className="text-right py-4 md:py-5 font-mono font-bold text-emerald-600 tabular-nums text-base md:text-lg">
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
