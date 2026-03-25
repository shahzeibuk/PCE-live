import config from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest } from 'next/server'

import { runCurrencyRatesSync } from '@/utilities/syncCurrencyRates'
import { revalidatePath } from 'next/cache'

function unauthorized() {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), {
    status: 401,
    headers: { 'content-type': 'application/json' },
  })
}

/**
 * Optional manual or external currency sync (GitHub Actions, uptime ping, etc.).
 *
 * Public pages do not need a cron: they use `RATES_AUTO_SYNC_STALE_HOURS` and traffic to
 * refresh DB rates (see `getCurrencyRatesForFrontend`).
 *
 * Security: `Authorization: Bearer <CRON_SECRET>` when `CRON_SECRET` is set.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret) {
    return new Response(JSON.stringify({ error: 'CRON_SECRET is not configured' }), {
      status: 503,
      headers: { 'content-type': 'application/json' },
    })
  }

  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${secret}`) {
    return unauthorized()
  }

  const payload = await getPayload({ config })
  const result = await runCurrencyRatesSync(payload)

  if (!result.ok) {
    return new Response(JSON.stringify({ error: result.error }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }

  revalidatePath('/')
  revalidatePath('/currency-rates')

  return Response.json({
    success: true,
    updated: result.updated,
    count: result.updated.length,
    source: result.source,
    intervalNote: process.env.CURRENCY_SYNC_INTERVAL_HOURS || 'see vercel.json / external cron',
  })
}

export const POST = GET
