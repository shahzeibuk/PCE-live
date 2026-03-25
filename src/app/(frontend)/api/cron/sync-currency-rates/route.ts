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
 * Scheduled currency sync for cron (Vercel Cron, GitHub Actions, etc.).
 *
 * Security: Authorization: Bearer <CRON_SECRET>
 *
 * Schedule: set vercel.json crons (or external caller) to match desired frequency.
 * Examples: every 6h at minute 0 (0 star-slash-6...), every 12h, or daily at 08:00 UTC.
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
