import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

import { STANDARD_CURRENCY_ROWS } from '../utilities/currencyRatesShared'
import { upsertCurrencyRates } from '../scripts/upsertCurrencyRates'

/**
 * Seeds currency-rates for production: live open-market sync when possible,
 * fallback rows for STANDARD_CURRENCY_ROWS, and USD Interbank (`sbp`) if missing.
 * Does not overwrite existing admin-edited rates — only creates missing rows
 * (sync updates open-market buy/sell when the upstream API is reachable).
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const result = await upsertCurrencyRates(payload, req)

  if (result.syncOk) {
    payload.logger.info(
      `Currency rates sync OK (${result.syncUpdated.length} codes): ${result.syncUpdated.join(', ') || 'none'}`,
    )
  } else {
    payload.logger.warn(`Currency rates sync failed, using fallbacks where needed: ${result.syncError}`)
  }

  payload.logger.info(
    `Currency rates seed: ${result.openMarketCreated} open-market created, interbank ${result.interbankCreated ? 'created' : 'already present'} (${STANDARD_CURRENCY_ROWS.length} standard codes)`,
  )
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Do not delete live rate data on rollback — rates are operational content.
  payload.logger.info('Skipping currency-rates delete on down (preserves production rates)')
  void req
}
