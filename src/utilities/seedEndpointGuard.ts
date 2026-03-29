import type { PayloadRequest } from 'payload'

/**
 * In production, seed / destructive demo endpoints return 404 unless
 * SEED_ENDPOINT_SECRET is set and the request sends
 * Authorization: Bearer <SEED_ENDPOINT_SECRET>.
 */
export function denySeedInProduction(req: PayloadRequest): Response | undefined {
  if (process.env.NODE_ENV !== 'production') return undefined

  const secret = process.env.SEED_ENDPOINT_SECRET
  if (!secret) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }

  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${secret}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return undefined
}
