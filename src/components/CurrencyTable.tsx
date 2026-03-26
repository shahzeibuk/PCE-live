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

const FLAG_MAP: Record<string, string> = {
  USD: '🇺🇸',
  GBP: '🇬🇧',
  EUR: '🇪🇺',
  SAR: '🇸🇦',
  AED: '🇦🇪',
  CAD: '🇨🇦',
  AUD: '🇦🇺',
  JPY: '🇯🇵',
  CNY: '🇨🇳',
  PKR: '🇵🇰',
}

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

  const isFallback = rates.some((r) => r.isLiveFallback)
  const latestTs = rates.reduce((max, r) => {
    if (!r.last_updated) return max
    const t = new Date(r.last_updated).getTime()
    return Number.isFinite(t) && t > max ? t : max
  }, 0)

  const syncLabel = isFallback
    ? 'Indicative · open market API'
    : latestTs > 0
      ? `Last updated ${new Date(latestTs).toLocaleString()}`
      : '—'

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Live Market
          </span>
        </div>
        <span className="text-xs text-muted-foreground font-medium text-right max-w-[70%]">{syncLabel}</span>
      </div>

      {isFallback && (
        <CurrencyNoteSurface className="p-3 -mt-2">
          <p className="text-xs text-amber-900 leading-snug">
            CMS has no saved rates yet — showing the same API figures sync uses. Run sync or schedules to store rows
            under <strong>Currency Rates</strong> (separate from branches).
          </p>
        </CurrencyNoteSurface>
      )}

      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-b">
              <TableHead className="font-bold text-slate-900 h-12">Currency</TableHead>
              <TableHead className="font-bold text-slate-900 h-12 text-right">Buy</TableHead>
              <TableHead className="font-bold text-slate-900 h-12 text-right">Sell</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rates.map((rate) => (
              <TableRow
                key={`${rate.id}-${rate.currency_code}`}
                className="group hover:bg-slate-50/50 transition-colors border-b last:border-0"
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl grayscale group-hover:grayscale-0 transition-all duration-300">
                      {FLAG_MAP[rate.currency_code] || '🏳️'}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">{rate.currency_code}</div>
                      <div className="text-[10px] uppercase tracking-tighter text-muted-foreground font-medium">
                        {rate.currency_name}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right py-4 font-mono font-bold text-slate-700 tabular-nums">
                  {Number(rate.buy_rate).toFixed(2)}
                </TableCell>
                <TableCell className="text-right py-4 font-mono font-bold text-emerald-600 tabular-nums">
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
