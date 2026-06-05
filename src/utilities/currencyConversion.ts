import type { CurrencyRate } from '@/payload-types'

export type RateRow = Pick<CurrencyRate, 'currency_code' | 'currency_name' | 'buy_rate' | 'sell_rate'> & {
  id?: string | number
}

export function normalizeCurrencyOptions(rates: RateRow[]): RateRow[] {
  const byCode = new Map<string, RateRow>()
  for (const r of rates) {
    const code = r.currency_code?.trim().toUpperCase()
    if (!code) continue
    if (!byCode.has(code)) {
      byCode.set(code, {
        ...r,
        currency_code: code,
        buy_rate: r.buy_rate,
        sell_rate: r.sell_rate,
        currency_name: r.currency_name || code,
      })
    }
  }
  if (!byCode.has('PKR')) {
    byCode.set('PKR', {
      currency_code: 'PKR',
      currency_name: 'Pakistani Rupee',
      buy_rate: 1,
      sell_rate: 1,
    })
  }

  return Array.from(byCode.values()).sort((a, b) => {
    if (a.currency_code === 'PKR') return -1
    if (b.currency_code === 'PKR') return 1
    return a.currency_code.localeCompare(b.currency_code)
  })
}

export function defaultFromCode(codes: string[]): string {
  if (codes.includes('USD')) return 'USD'
  const nonPkr = codes.find((c) => c !== 'PKR')
  return nonPkr ?? codes[0] ?? 'USD'
}

export function defaultToCode(codes: string[], from: string): string {
  if (codes.includes('PKR') && from !== 'PKR') return 'PKR'
  const other = codes.find((c) => c !== from)
  return other ?? codes[0] ?? 'PKR'
}

export function computeConversion(
  options: RateRow[],
  amount: number,
  from: string,
  to: string,
): number {
  const fromRateDoc = options.find((r) => r.currency_code === from)
  const toRateDoc = options.find((r) => r.currency_code === to)

  const fromBuy = Number(fromRateDoc?.buy_rate ?? 1)
  const toSell = Number(toRateDoc?.sell_rate ?? 1)

  if (from === 'PKR' && to === 'PKR') return amount
  if (from === 'PKR') return amount / toSell
  if (to === 'PKR') return amount * fromBuy
  const inPkr = amount * fromBuy
  return inPkr / toSell
}

/** Customer buys foreign currency: pays PKR at sell rate. */
export function estimatePkrForBuy(options: RateRow[], foreignCode: string, foreignAmount: number): number {
  const rate = options.find((r) => r.currency_code === foreignCode)
  const sell = Number(rate?.sell_rate ?? 1)
  return foreignAmount * sell
}

/** Customer sells foreign currency: receives PKR at buy rate. */
export function estimatePkrForSell(options: RateRow[], foreignCode: string, foreignAmount: number): number {
  const rate = options.find((r) => r.currency_code === foreignCode)
  const buy = Number(rate?.buy_rate ?? 1)
  return foreignAmount * buy
}
