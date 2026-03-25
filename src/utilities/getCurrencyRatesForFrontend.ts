import type { Payload } from 'payload'

import { STANDARD_CURRENCY_ROWS, buySellFromPkrQuote } from './currencyRatesShared'
import { safeRevalidatePath } from './safeRevalidatePath'
import { runCurrencyRatesSync } from './syncCurrencyRates'

export type FrontendCurrencyRate = {
  id: number
  currency_name: string
  currency_code: string
  buy_rate: number
  sell_rate: number
  last_updated?: string | null
  /** Set when DB has no rows — figures from open.er-api.com (indicative). */
  isLiveFallback?: boolean
}

function mapDocs(docs: { id: unknown; currency_name: string; currency_code: string; buy_rate: number; sell_rate: number; last_updated?: string | null }[]): FrontendCurrencyRate[] {
  return docs.map((d) => ({
    id: typeof d.id === 'number' ? d.id : Number(d.id),
    currency_name: d.currency_name,
    currency_code: d.currency_code,
    buy_rate: d.buy_rate,
    sell_rate: d.sell_rate,
    last_updated: d.last_updated ?? null,
    isLiveFallback: false,
  }))
}

/** Hours; if set (>0), traffic to pages that load rates may trigger a sync when data is older. */
function getAutoSyncStaleHours(): number {
  const raw = process.env.RATES_AUTO_SYNC_STALE_HOURS
  if (raw === undefined || raw === '') return 12
  const n = Number(raw)
  return Number.isFinite(n) && n > 0 ? n : 0
}

function isStale(docs: { last_updated?: string | null }[], staleHours: number): boolean {
  const thresholdMs = staleHours * 3600 * 1000
  if (docs.length === 0) return true

  const newest = docs.reduce((max, d) => {
    if (!d.last_updated) return max
    const t = new Date(d.last_updated).getTime()
    return Number.isFinite(t) && t > max ? t : max
  }, 0)

  if (!newest) return true
  return Date.now() - newest > thresholdMs
}

/**
 * Rates for public pages: CMS `currency-rates` when present; otherwise a one-shot fetch from
 * the same API used by sync so the site isn't empty before seed runs.
 *
 * **Without a cron:** set `RATES_AUTO_SYNC_STALE_HOURS` (default 12). When someone visits a
 * page that loads rates and the newest `last_updated` is older than that, we run the same sync
 * as the admin endpoint, then return fresh rows.
 */
export async function getCurrencyRatesForFrontend(
  payload: Payload,
  opts?: { limit?: number },
): Promise<FrontendCurrencyRate[]> {
  const limit = opts?.limit ?? 200
  const staleHours = getAutoSyncStaleHours()

  let result = await payload.find({
    collection: 'currency-rates',
    limit,
    sort: 'currency_name',
    pagination: false,
    depth: 0,
    overrideAccess: false,
  })

  const maybeSync = staleHours > 0 && isStale(result.docs, staleHours)

  if (maybeSync) {
    const sync = await runCurrencyRatesSync(payload)
    if (sync.ok) {
      safeRevalidatePath('/')
      safeRevalidatePath('/currency-rates')
      result = await payload.find({
        collection: 'currency-rates',
        limit,
        sort: 'currency_name',
        pagination: false,
        depth: 0,
        overrideAccess: false,
      })
    }
  }

  if (result.docs.length > 0) {
    return mapDocs(result.docs)
  }

  return fetchLiveRatesDisplay()
}

async function fetchLiveRatesDisplay(): Promise<FrontendCurrencyRate[]> {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/PKR', {
      next: { revalidate: 300 },
    })
    if (!res.ok) return []

    const data = (await res.json()) as { rates?: Record<string, number> }
    const rates = data.rates
    if (!rates || typeof rates !== 'object') return []

    const now = new Date().toISOString()
    const out: FrontendCurrencyRate[] = []
    let i = 0

    for (const row of STANDARD_CURRENCY_ROWS) {
      const q = rates[row.currency_code]
      if (typeof q !== 'number' || q <= 0) continue
      const { buy_rate, sell_rate } = buySellFromPkrQuote(q)
      i += 1
      out.push({
        id: -i,
        currency_name: row.currency_name,
        currency_code: row.currency_code,
        buy_rate,
        sell_rate,
        last_updated: now,
        isLiveFallback: true,
      })
    }

    return out.sort((a, b) => a.currency_name.localeCompare(b.currency_name))
  } catch {
    return []
  }
}
