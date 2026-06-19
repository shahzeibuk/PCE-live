import canUseDOM from './canUseDOM'

const DEFAULT_LIVE_SITE_URL = 'https://www.pakistancurrency.com'

const LOCAL_HOST_PATTERN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i

function normalizeOrigin(url: string): string {
  return url.trim().replace(/\/$/, '')
}

function isLocalOrigin(url: string): boolean {
  return LOCAL_HOST_PATTERN.test(normalizeOrigin(url))
}

function isVercelRuntime(): boolean {
  return Boolean(process.env.VERCEL)
}

/** Resolve a public origin, skipping localhost values when running on Vercel. */
function pickPublicOrigin(candidates: Array<string | undefined>): string | null {
  for (const candidate of candidates) {
    if (!candidate) continue
    const normalized = normalizeOrigin(candidate)
    if (!normalized) continue
    if (isVercelRuntime() && isLocalOrigin(normalized)) continue
    return normalized
  }
  return null
}

export const getServerSideURL = () => {
  const fromEnv = pickPublicOrigin([
    process.env.NEXT_PUBLIC_SERVER_URL,
    process.env.NEXT_PUBLIC_LIVE_SITE_URL,
    process.env.LIVE_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
    DEFAULT_LIVE_SITE_URL,
  ])

  if (fromEnv) return fromEnv

  const devFallback = process.env.NEXT_PUBLIC_SERVER_URL?.trim()
  if (devFallback) return normalizeOrigin(devFallback)

  return 'http://127.0.0.1:3001'
}

/** Public marketing site URL — used for admin “view live site” and external links. */
export const getLiveSiteURL = () => {
  const configured = pickPublicOrigin([
    process.env.NEXT_PUBLIC_LIVE_SITE_URL,
    process.env.LIVE_SITE_URL,
    DEFAULT_LIVE_SITE_URL,
  ])
  if (configured) return configured

  const serverUrl = getServerSideURL()
  if (isLocalOrigin(serverUrl)) {
    return DEFAULT_LIVE_SITE_URL
  }

  return serverUrl
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  return getServerSideURL()
}

/** Allowed origins for Payload API (CORS). Must include the live domain on Vercel. */
export const getCorsOrigins = (): string[] => {
  const origins = new Set<string>()

  const candidates = [
    process.env.NEXT_PUBLIC_SERVER_URL,
    process.env.NEXT_PUBLIC_LIVE_SITE_URL,
    process.env.LIVE_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
    DEFAULT_LIVE_SITE_URL,
    getServerSideURL(),
    getLiveSiteURL(),
  ]

  for (const candidate of candidates) {
    if (!candidate) continue
    const normalized = normalizeOrigin(candidate)
    if (!normalized) continue
    if (isVercelRuntime() && isLocalOrigin(normalized)) continue
    origins.add(normalized)
  }

  if (origins.size === 0) {
    origins.add(getServerSideURL())
  }

  return [...origins]
}
