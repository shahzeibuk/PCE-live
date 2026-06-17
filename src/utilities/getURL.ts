import canUseDOM from './canUseDOM'

const DEFAULT_LIVE_SITE_URL = 'https://www.pakistancurrency.com'

const LOCAL_HOST_PATTERN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i

export const getServerSideURL = () => {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://127.0.0.1:3001')
  )
}

/** Public marketing site URL — used for admin “view live site” and external links. */
export const getLiveSiteURL = () => {
  const configured =
    process.env.NEXT_PUBLIC_LIVE_SITE_URL?.trim() || process.env.LIVE_SITE_URL?.trim()
  if (configured) return configured.replace(/\/$/, '')

  const serverUrl = getServerSideURL().replace(/\/$/, '')
  if (LOCAL_HOST_PATTERN.test(serverUrl)) {
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

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  // Server components must use an absolute URL for fetch(); '' would make `/api/...` invalid in Node.
  return process.env.NEXT_PUBLIC_SERVER_URL || getServerSideURL()
}
