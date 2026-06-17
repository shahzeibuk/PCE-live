import type { Media, SiteBranding } from '@/payload-types'

import { normalizeStoredMediaPath } from './normalizeStoredMediaPath'
import { getServerSideURL } from './getURL'

type MediaRef = number | Media | null | undefined

function resolveMediaPath(media: MediaRef, fallback: string): string {
  if (media && typeof media === 'object' && typeof media.url === 'string' && media.url) {
    return normalizeStoredMediaPath(media.url)
  }

  return fallback
}

export function getSiteBrandingFaviconPaths(branding: SiteBranding | null | undefined) {
  return {
    ico: resolveMediaPath(branding?.favicon, '/favicon.ico'),
    svg: resolveMediaPath(branding?.faviconSvg, '/favicon.svg'),
  }
}

export function toAbsoluteSiteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  const base = getServerSideURL()
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}
