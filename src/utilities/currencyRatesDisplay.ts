import type { FrontendCurrencyRate } from '@/utilities/getCurrencyRatesForFrontend'

export function getRatesSyncMeta(rates: FrontendCurrencyRate[]): {
  isFallback: boolean
  syncLabel: string
} {
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

  return { isFallback, syncLabel }
}
