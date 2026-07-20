import type { Payload, PayloadRequest } from 'payload'

import {
  INTERBANK_CURRENCY_CODE,
  INTERBANK_RATE_CATEGORY,
  INTERBANK_RATE_LABEL,
  STANDARD_CURRENCY_ROWS,
  buySellFromPkrQuote,
  isInterbankRateCategory,
} from '../utilities/currencyRatesShared'
import { runCurrencyRatesSync } from '../utilities/syncCurrencyRates'

const ctx = { disableRevalidate: true }

/** Fallback open-market PKR rates if live sync is unavailable during migrate. */
const FALLBACK_OPEN_MARKET: Record<string, { buy_rate: number; sell_rate: number }> = {
  USD: { buy_rate: 278.5, sell_rate: 281.0 },
  EUR: { buy_rate: 302.2, sell_rate: 305.5 },
  GBP: { buy_rate: 352.4, sell_rate: 356.8 },
  AED: { buy_rate: 75.8, sell_rate: 76.5 },
  SAR: { buy_rate: 74.2, sell_rate: 74.9 },
  CAD: { buy_rate: 201.5, sell_rate: 204.0 },
  AUD: { buy_rate: 182.0, sell_rate: 185.0 },
  JPY: { buy_rate: 1.85, sell_rate: 1.95 },
  CNY: { buy_rate: 38.2, sell_rate: 39.0 },
}

const FALLBACK_INTERBANK = { buy_rate: 278.0, sell_rate: 279.5 }

async function findRate(
  payload: Payload,
  currencyCode: string,
  rateCategory: 'open_market' | 'sbp',
  req?: PayloadRequest,
) {
  const { docs } = await payload.find({
    collection: 'currency-rates',
    where: {
      and: [
        { currency_code: { equals: currencyCode } },
        { rate_category: { equals: rateCategory } },
      ],
    },
    limit: 1,
    depth: 0,
    req,
  })
  return docs[0] ?? null
}

async function upsertOpenMarketRate(
  payload: Payload,
  row: { currency_code: string; currency_name: string; buy_rate: number; sell_rate: number },
  req?: PayloadRequest,
): Promise<'created' | 'updated' | 'unchanged'> {
  const existing = await findRate(payload, row.currency_code, 'open_market', req)
  const data = {
    currency_name: row.currency_name,
    currency_code: row.currency_code,
    rate_category: 'open_market' as const,
    buy_rate: row.buy_rate,
    sell_rate: row.sell_rate,
    last_updated: new Date().toISOString(),
  }

  if (existing) {
    // Keep admin-edited rates; only fill missing rows from fallbacks.
    return 'unchanged'
  }

  await payload.create({
    collection: 'currency-rates',
    data,
    context: ctx,
    req,
  })
  return 'created'
}

async function ensureInterbankRate(
  payload: Payload,
  rates: { buy_rate: number; sell_rate: number },
  req?: PayloadRequest,
): Promise<'created' | 'unchanged'> {
  const existing = await findRate(payload, INTERBANK_CURRENCY_CODE, INTERBANK_RATE_CATEGORY, req)
  if (existing) return 'unchanged'

  await payload.create({
    collection: 'currency-rates',
    data: {
      currency_name: INTERBANK_RATE_LABEL,
      currency_code: INTERBANK_CURRENCY_CODE,
      rate_category: INTERBANK_RATE_CATEGORY,
      buy_rate: rates.buy_rate,
      sell_rate: rates.sell_rate,
      last_updated: new Date().toISOString(),
    },
    context: ctx,
    req,
  })
  return 'created'
}

/**
 * Seeds / refreshes `currency-rates` for deploy:
 * 1) Live sync from open.er-api.com when network works
 * 2) Creates any missing STANDARD open-market rows (fallback numbers if needed)
 * 3) Ensures USD Interbank (`sbp`) row exists
 */
export async function upsertCurrencyRates(
  payload: Payload,
  req?: PayloadRequest,
): Promise<{
  syncOk: boolean
  syncUpdated: string[]
  syncError?: string
  openMarketCreated: number
  interbankCreated: boolean
}> {
  const sync = await runCurrencyRatesSync(payload, req)

  let openMarketCreated = 0

  // After sync (or on failure), ensure every standard currency exists.
  for (const { currency_code, currency_name } of STANDARD_CURRENCY_ROWS) {
    const existing = await findRate(payload, currency_code, 'open_market', req)
    if (existing) continue

    let buy_rate = FALLBACK_OPEN_MARKET[currency_code]?.buy_rate
    let sell_rate = FALLBACK_OPEN_MARKET[currency_code]?.sell_rate

    if (buy_rate == null || sell_rate == null) {
      // Last resort placeholders so the row exists for admin edits.
      buy_rate = 1
      sell_rate = 1.01
    }

    const result = await upsertOpenMarketRate(
      payload,
      { currency_code, currency_name, buy_rate, sell_rate },
      req,
    )
    if (result === 'created') openMarketCreated += 1
  }

  // Prefer interbank near current open-market USD when seeding.
  const usdOpen = await findRate(payload, INTERBANK_CURRENCY_CODE, 'open_market', req)
  const interbankSeed = usdOpen
    ? {
        buy_rate: Number(usdOpen.buy_rate),
        sell_rate: Number(usdOpen.sell_rate),
      }
    : FALLBACK_INTERBANK

  const interbank = await ensureInterbankRate(payload, interbankSeed, req)

  return {
    syncOk: sync.ok,
    syncUpdated: sync.ok ? sync.updated : [],
    syncError: sync.ok ? undefined : sync.error,
    openMarketCreated,
    interbankCreated: interbank === 'created',
  }
}

/** Optional helper for scripts that only need live PKR quotes → buy/sell. */
export async function fetchLiveBuySell(
  currencyCode: string,
): Promise<{ buy_rate: number; sell_rate: number } | null> {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/PKR', { cache: 'no-store' })
    if (!res.ok) return null
    const data = (await res.json()) as { rates?: Record<string, number> }
    const quote = data.rates?.[currencyCode]
    if (!quote) return null
    return buySellFromPkrQuote(quote)
  } catch {
    return null
  }
}

export function isOpenMarketDoc(doc: { rate_category?: string | null }): boolean {
  return !isInterbankRateCategory(doc.rate_category)
}
