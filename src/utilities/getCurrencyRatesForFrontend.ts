import type { Payload, Where } from 'payload'

import {
  STANDARD_CURRENCY_ROWS,
  buySellFromPkrQuote,
  INTERBANK_RATE_CATEGORY,
  isInterbankRateCategory,
  type CurrencyRateCategory,
} from './currencyRatesShared'
import { isCurrencyApiEnabled } from './isCurrencyApiEnabled'
import { safeRevalidatePath } from './safeRevalidatePath'
import { runCurrencyRatesSync } from './syncCurrencyRates'

export type FrontendCurrencyRate = {
  id: number
  currency_name: string
  currency_code: string
  buy_rate: number
  sell_rate: number
  rate_category?: CurrencyRateCategory
  last_updated?: string | null
  updatedAt?: string | null
  /** Set when DB has no rows — figures from open.er-api.com (indicative). */
  isLiveFallback?: boolean
}

function newestTimestamp(...values: Array<string | null | undefined>): string | null {
  let best = 0
  let bestIso: string | null = null
  for (const value of values) {
    if (!value) continue
    const t = new Date(value).getTime()
    if (Number.isFinite(t) && t > best) {
      best = t
      bestIso = new Date(t).toISOString()
    }
  }
  return bestIso
}

function mapDocs(docs: {
  id: unknown
  currency_name: string
  currency_code: string
  buy_rate: number
  sell_rate: number
  rate_category?: CurrencyRateCategory | null
  last_updated?: string | null
  updatedAt?: string | null
}[]): FrontendCurrencyRate[] {
  return docs.map((d) => ({
    id: typeof d.id === 'number' ? d.id : Number(d.id),
    currency_name: d.currency_name,
    currency_code: d.currency_code,
    buy_rate: d.buy_rate,
    sell_rate: d.sell_rate,
    rate_category: isInterbankRateCategory(d.rate_category) ? INTERBANK_RATE_CATEGORY : 'open_market',
    // Prefer explicit last_updated, but never show older than the document save time.
    last_updated: newestTimestamp(d.last_updated, d.updatedAt),
    updatedAt: d.updatedAt ?? null,
    isLiveFallback: false,
  }))
}

function rateCategoryWhere(rateCategory?: CurrencyRateCategory | 'all'): Where | undefined {
  if (!rateCategory || rateCategory === 'all') return undefined
  return { rate_category: { equals: rateCategory } }
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

function filterOpenMarketDocs<T extends { rate_category?: string | null }>(docs: T[]): T[] {
  return docs.filter((d) => !isInterbankRateCategory(d.rate_category))
}

async function findCurrencyRateDocs(
  payload: Payload,
  opts: { limit: number; rateCategory: CurrencyRateCategory | 'all' },
) {
  const base = {
    collection: 'currency-rates' as const,
    limit: opts.limit,
    sort: 'currency_name' as const,
    pagination: false as const,
    depth: 0 as const,
    overrideAccess: false as const,
  }

  const where = rateCategoryWhere(opts.rateCategory)
  if (!where) {
    return payload.find({ ...base })
  }

  try {
    return await payload.find({ ...base, where })
  } catch (error) {
    console.error('currency-rates filtered query failed, falling back:', error)
    const fallback = await payload.find({ ...base })
    if (opts.rateCategory === 'open_market') {
      return { ...fallback, docs: filterOpenMarketDocs(fallback.docs) }
    }
    if (opts.rateCategory === INTERBANK_RATE_CATEGORY) {
      return {
        ...fallback,
        docs: fallback.docs.filter((d) => isInterbankRateCategory(d.rate_category)),
      }
    }
    return fallback
  }
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
  opts?: { limit?: number; rateCategory?: CurrencyRateCategory | 'all' },
): Promise<FrontendCurrencyRate[]> {
  const limit = opts?.limit ?? 200
  const rateCategory = opts?.rateCategory ?? 'open_market'
  const staleHours = getAutoSyncStaleHours()

  let result = await findCurrencyRateDocs(payload, { limit, rateCategory })
  const apiEnabled = await isCurrencyApiEnabled(payload)

  const maybeSync =
    apiEnabled && rateCategory === 'open_market' && staleHours > 0 && isStale(result.docs, staleHours)

  if (maybeSync) {
    const sync = await runCurrencyRatesSync(payload)
    if (sync.ok) {
      safeRevalidatePath('/')
      safeRevalidatePath('/currency-rates')
      result = await findCurrencyRateDocs(payload, { limit, rateCategory })
    }
  }

  if (result.docs.length > 0) {
    return mapDocs(result.docs)
  }

  if (rateCategory === INTERBANK_RATE_CATEGORY) {
    return []
  }

  // Empty CMS + API disabled → no external fetch; show empty rather than live fallback.
  if (!apiEnabled) {
    return []
  }

  return fetchLiveRatesDisplay()
}

export async function getInterbankUsdRateForFrontend(
  payload: Payload,
): Promise<FrontendCurrencyRate | null> {
  const rates = await getCurrencyRatesForFrontend(payload, { rateCategory: INTERBANK_RATE_CATEGORY, limit: 5 })
  return rates.find((r) => r.currency_code?.toUpperCase() === 'USD') ?? rates[0] ?? null
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
        rate_category: 'open_market',
        last_updated: now,
        isLiveFallback: true,
      })
    }

    return out.sort((a, b) => a.currency_name.localeCompare(b.currency_name))
  } catch {
    return []
  }
}
