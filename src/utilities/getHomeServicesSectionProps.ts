import { HOME_SERVICES_ORDER_SECTION } from '@/components/home/homeContent'
import type { HomeService, Media } from '@/payload-types'

export type HomeServicesBoxProps = {
  imageSrc: string
  title: string
  description: string
  href: string
  ctaLabel: string
  openInNewTab?: boolean
}

export type HomeServicesSectionProps = {
  title: string
  description: string | null
  boxes: HomeServicesBoxProps[]
}

function mediaToImageSrc(image: number | Media | null | undefined): string | null {
  if (image === null || image === undefined || typeof image === 'number') return null
  const u = image.url
  if (!u) return null
  if (u.startsWith('http://') || u.startsWith('https://')) return u
  return u.startsWith('/') ? u : `/${u}`
}

function normalizeHref(url: string): string {
  const t = url.trim()
  if (!t) return '/services'
  if (t.startsWith('http://') || t.startsWith('https://')) return t
  return t.startsWith('/') ? t : `/${t}`
}

function fallbackBoxes(): HomeServicesBoxProps[] {
  return HOME_SERVICES_ORDER_SECTION.boxes.map((b) => ({
    imageSrc: b.imageSrc,
    title: b.title,
    description: b.description,
    href: b.href,
    ctaLabel: b.ctaLabel,
    openInNewTab: false,
  }))
}

/** Maps Payload `homeServices` global to homepage section props; falls back to bundled defaults if boxes are empty or invalid. */
export function homeServicesGlobalToSectionProps(homeServices: HomeService | null | undefined): HomeServicesSectionProps {
  const fb = HOME_SERVICES_ORDER_SECTION
  if (!homeServices) {
    return {
      title: fb.heading,
      description: fb.description || null,
      boxes: fallbackBoxes(),
    }
  }

  const title = homeServices.title?.trim() || fb.heading
  const descriptionRaw = homeServices.description?.trim()

  const cmsBoxes = homeServices.boxes
  const mapped: HomeServicesBoxProps[] = []

  if (cmsBoxes?.length) {
    for (const b of cmsBoxes) {
      if (!b?.title?.trim() || !b?.description?.trim()) continue
      const imageSrc = mediaToImageSrc(b.icon)
      if (!imageSrc) continue
      mapped.push({
        imageSrc,
        title: b.title.trim(),
        description: b.description.trim(),
        href: normalizeHref(b.url ?? ''),
        ctaLabel: (b.ctaLabel ?? 'Learn more').trim() || 'Learn more',
        openInNewTab: Boolean(b.openInNewTab),
      })
    }
  }

  if (mapped.length === 0) {
    return {
      title,
      description: descriptionRaw || fb.description || null,
      boxes: fallbackBoxes(),
    }
  }

  return {
    title,
    description: descriptionRaw ?? null,
    boxes: mapped,
  }
}
