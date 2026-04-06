/** Major pairs shown first in dual-table / homepage rate layouts. Order preserved in UI. */
export const POPULAR_FOREX_CODES = ['USD', 'SAR', 'AED', 'EUR', 'GBP', 'CAD', 'AUD'] as const

export type PopularForexCode = (typeof POPULAR_FOREX_CODES)[number]

export function isPopularForexCode(code: string): boolean {
  return (POPULAR_FOREX_CODES as readonly string[]).includes(code?.trim().toUpperCase())
}
