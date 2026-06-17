const LOCAL_HOST_PATTERN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i

/**
 * Media uploaded in local dev is often stored with a full localhost URL.
 * On production, strip the dev origin and keep the path so the live site serves it.
 */
export function normalizeStoredMediaPath(url: string): string {
  const trimmed = url.trim()
  if (!trimmed) return trimmed

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      const parsed = new URL(trimmed)
      const origin = `${parsed.protocol}//${parsed.host}`
      if (LOCAL_HOST_PATTERN.test(origin)) {
        const path = `${parsed.pathname}${parsed.search}`
        return path.startsWith('/') ? path : `/${path}`
      }
    } catch {
      return trimmed
    }
    return trimmed
  }

  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}

export function resolveMediaResourceUrl(
  image: number | { url?: string | null } | null | undefined,
): string | null {
  if (image === null || image === undefined || typeof image === 'number') return null
  const url = image.url
  if (!url) return null
  return normalizeStoredMediaPath(url)
}
