type RateTimestampRow = {
  last_updated?: string | null
  updatedAt?: string | null
  isLiveFallback?: boolean | null
}

function rowTimestamp(row: RateTimestampRow): number {
  let best = 0
  for (const value of [row.last_updated, row.updatedAt]) {
    if (!value) continue
    const t = new Date(value).getTime()
    if (Number.isFinite(t) && t > best) best = t
  }
  return best
}

export function getRatesSyncMeta(rates: RateTimestampRow[]): {
  isFallback: boolean
  syncLabel: string
  latestUpdatedAt: string | null
} {
  const isFallback = rates.some((r) => Boolean(r.isLiveFallback))
  const latestTs = rates.reduce((max, r) => Math.max(max, rowTimestamp(r)), 0)

  const latestUpdatedAt = latestTs > 0 ? new Date(latestTs).toISOString() : null

  const syncLabel = isFallback
    ? 'Indicative · open market API'
    : latestTs > 0
      ? `Last updated ${new Date(latestTs).toLocaleString()}`
      : '—'

  return { isFallback, syncLabel, latestUpdatedAt }
}
