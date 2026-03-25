/** Margin applied to open-market PKR quotes for buy/sell spread (same as sync). */
export const CURRENCY_RATE_MARGIN = 0.005

/**
 * Currencies we support for sync + live fallback. Names are for new DB rows / empty-DB display only.
 */
export const STANDARD_CURRENCY_ROWS: { currency_code: string; currency_name: string }[] = [
  { currency_code: 'USD', currency_name: 'US Dollar' },
  { currency_code: 'EUR', currency_name: 'Euro' },
  { currency_code: 'GBP', currency_name: 'British Pound' },
  { currency_code: 'AED', currency_name: 'UAE Dirham' },
  { currency_code: 'SAR', currency_name: 'Saudi Riyal' },
  { currency_code: 'CAD', currency_name: 'Canadian Dollar' },
  { currency_code: 'AUD', currency_name: 'Australian Dollar' },
  { currency_code: 'JPY', currency_name: 'Japanese Yen' },
  { currency_code: 'CNY', currency_name: 'Chinese Yuan' },
]

export function buySellFromPkrQuote(rateAgainstPkr: number): { buy_rate: number; sell_rate: number } {
  const basePrice = 1 / rateAgainstPkr
  const m = CURRENCY_RATE_MARGIN
  return {
    buy_rate: Number((basePrice - basePrice * m).toFixed(4)),
    sell_rate: Number((basePrice + basePrice * m).toFixed(4)),
  }
}
