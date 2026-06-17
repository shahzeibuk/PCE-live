import { HOME_WHY_US } from '@/components/home/homeContent'
import type { HomeWhyUs, Media } from '@/payload-types'
import { resolveMediaResourceUrl } from '@/utilities/normalizeStoredMediaPath'

export type WhyChooseIconKind = 'shield' | 'trending' | 'lock' | 'zap' | 'users' | 'map'

export type HomeWhyUsItemProps = {
  icon: WhyChooseIconKind
  text: string
}

export type HomeWhyUsSectionProps = {
  heading: string
  subheading: string
  imageSrc: string
  items: HomeWhyUsItemProps[]
  footer: string
}

function mediaToImageSrc(image: number | Media | null | undefined): string | null {
  return resolveMediaResourceUrl(image)
}

function fallbackSection(): HomeWhyUsSectionProps {
  const fb = HOME_WHY_US
  return {
    heading: fb.heading,
    subheading: fb.subheading,
    imageSrc: fb.imageSrc,
    footer: fb.footer,
    items: fb.items.map((i) => ({ icon: i.icon, text: i.text })),
  }
}

/** Maps Payload `homeWhyUs` global to homepage section props; fills gaps from `HOME_WHY_US`. */
export function homeWhyUsGlobalToSectionProps(global: HomeWhyUs | null | undefined): HomeWhyUsSectionProps {
  if (!global) return fallbackSection()

  const fb = HOME_WHY_US
  const heading = global.heading?.trim() || fb.heading
  const subheading = global.subheading?.trim() || fb.subheading
  const footer = global.footer?.trim() || fb.footer
  const imageSrc = mediaToImageSrc(global.image) || fb.imageSrc

  const mapped: HomeWhyUsItemProps[] = []
  if (global.items?.length) {
    for (const row of global.items) {
      const text = row.text?.trim()
      if (!text) continue
      const icon = row.icon
      if (!icon) continue
      mapped.push({ icon, text })
    }
  }

  const items = mapped.length > 0 ? mapped : fb.items.map((i) => ({ icon: i.icon, text: i.text }))

  return {
    heading,
    subheading,
    imageSrc,
    footer,
    items,
  }
}
