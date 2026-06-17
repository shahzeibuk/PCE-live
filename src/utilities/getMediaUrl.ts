import { getClientSideURL } from '@/utilities/getURL'
import { normalizeStoredMediaPath } from '@/utilities/normalizeStoredMediaPath'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  const normalized = normalizeStoredMediaPath(url)

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  // Check if URL already has http/https protocol
  if (normalized.startsWith('http://') || normalized.startsWith('https://')) {
    return cacheTag ? `${normalized}?${cacheTag}` : normalized
  }

  // Otherwise prepend client-side URL
  const baseUrl = getClientSideURL()
  return cacheTag ? `${baseUrl}${normalized}?${cacheTag}` : `${baseUrl}${normalized}`
}
