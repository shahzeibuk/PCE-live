import type { Media, PromoBanner } from '@/payload-types'
import { resolveMediaResourceUrl } from '@/utilities/normalizeStoredMediaPath'

export type PromoBannerClientProps = {
  imageSrc: string
  imageAlt: string
  ctaUrl: string | null
  openInNewTab: boolean
  dismissalVersion: number
  maxWidthClass: string
}

function mediaToImageSrc(image: number | Media | null | undefined): string | null {
  return resolveMediaResourceUrl(image)
}

/** Maps Payload `promoBanner` global to client popup props, or `null` when the popup should not show. */
export function promoBannerGlobalToClientProps(
  promo: PromoBanner | null | undefined,
): PromoBannerClientProps | null {
  if (!promo?.enabled) return null
  const imageSrc = mediaToImageSrc(promo.image)
  if (!imageSrc) return null

  const alt = promo.imageAlt?.trim() || 'Promotion'
  const url = promo.cta?.url?.trim() || ''
  const ctaUrl = url.length > 0 ? url : null

  const v = Number(promo.dismissalVersion)
  const dismissalVersion = Number.isFinite(v) && v >= 1 ? Math.max(1, Math.floor(v)) : 1
  const maxWidth = promo.maxWidth
  const maxWidthClass =
    typeof maxWidth === 'string' && maxWidth.trim() ? maxWidth.trim() : 'max-w-2xl'

  return {
    imageSrc,
    imageAlt: alt,
    ctaUrl,
    openInNewTab: promo.cta?.openInNewTab ?? true,
    dismissalVersion,
    maxWidthClass,
  }
}
