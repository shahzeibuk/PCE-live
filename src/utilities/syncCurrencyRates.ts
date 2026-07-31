import type { Payload } from 'payload'
import type { PayloadRequest } from 'payload'

import { STANDARD_CURRENCY_ROWS, buySellFromPkrQuote, isInterbankRateCategory } from './currencyRatesShared'
import { isCurrencyApiEnabled } from './isCurrencyApiEnabled'

export type CurrencySyncResult =
  | { ok: true; updated: string[]; source: string }
  | { ok: false; error: string; disabled?: boolean }

function filterOpenMarketDocs<T extends { rate_category?: string | null }>(docs: T[]): T[] {
  return docs.filter((d) => !isInterbankRateCategory(d.rate_category))
}

/**
 * Fetches PKR-based FX from open.er-api.com, updates existing `currency-rates` rows,
 * and creates any missing rows for {@link STANDARD_CURRENCY_ROWS} when the API lists them.
 * Branch documents are never touched — rates live only in `currency-rates`.
 * No-ops when Currency API settings → “Enable live currency API” is off.
 */
export async function runCurrencyRatesSync(
  payload: Payload,
  req?: PayloadRequest,
): Promise<CurrencySyncResult> {
  try {
    if (!(await isCurrencyApiEnabled(payload, req))) {
      return {
        ok: false,
        disabled: true,
        error:
          'Live currency API is disabled in Admin → Currency API settings. Enable it to sync, or edit rates manually.',
      }
    }

    const res = await fetch('https://open.er-api.com/v6/latest/PKR', {
      cache: 'no-store',
    })

    if (!res.ok) {
      return { ok: false, error: `Upstream API HTTP ${res.status}` }
    }

    const data = (await res.json()) as { rates?: Record<string, number> }
    const rates = data.rates
    if (!rates || typeof rates !== 'object') {
      return { ok: false, error: 'Invalid upstream payload' }
    }

    const existingCurrencies = await payload.find({
      collection: 'currency-rates',
      limit: 200,
      pagination: false,
      depth: 0,
      ...(req ? { req } : {}),
    })

    const openMarketDocs = filterOpenMarketDocs(existingCurrencies.docs)

    const knownCodes = new Set(openMarketDocs.map((d) => d.currency_code as string))

    const updated: string[] = []

    for (const doc of openMarketDocs) {
      if (doc.currency_code === 'PKR') continue

      const rateAgainstPkr = rates[doc.currency_code as string]
      if (!rateAgainstPkr) continue

      const { buy_rate, sell_rate } = buySellFromPkrQuote(rateAgainstPkr)

      await payload.update({
        collection: 'currency-rates',
        id: doc.id,
        data: {
          buy_rate,
          sell_rate,
          last_updated: new Date().toISOString(),
        },
        context: { disableRevalidate: true },
        ...(req ? { req } : {}),
      })

      updated.push(doc.currency_code as string)
    }

    for (const { currency_code, currency_name } of STANDARD_CURRENCY_ROWS) {
      if (currency_code === 'PKR' || knownCodes.has(currency_code)) continue

      const rateAgainstPkr = rates[currency_code]
      if (!rateAgainstPkr) continue

      const { buy_rate, sell_rate } = buySellFromPkrQuote(rateAgainstPkr)

      await payload.create({
        collection: 'currency-rates',
        data: {
          currency_name,
          currency_code,
          rate_category: 'open_market',
          buy_rate,
          sell_rate,
          last_updated: new Date().toISOString(),
        },
        context: { disableRevalidate: true },
        ...(req ? { req } : {}),
      })

      updated.push(currency_code)
      knownCodes.add(currency_code)
    }

    return { ok: true, updated, source: 'open.er-api.com/v6/latest/PKR' }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Sync failed'
    return { ok: false, error: message }
  }
}
