import {
  HOME_HERO,
  HOME_HERO_CAROUSEL,
  type HomeHeroCarouselSlide,
} from '@/components/home/homeContent'
import type { HomeHero, Media } from '@/payload-types'
import { resolveMediaResourceUrl } from '@/utilities/normalizeStoredMediaPath'

export type HomeHeroSliderProps = {
  slides: HomeHeroCarouselSlide[]
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string; external?: boolean }
}

function mediaToImageSrc(image: number | Media | null | undefined): string | null {
  return resolveMediaResourceUrl(image)
}

function primaryHref(link: HomeHero['primaryCta']['link'] | undefined): string {
  if (!link) return HOME_HERO_CAROUSEL.primaryCta.href
  if (link.type === 'custom' && link.url) return link.url
  if (link.type === 'reference' && link.reference) {
    const ref = link.reference
    const value = typeof ref.value === 'object' && ref.value ? ref.value : null
    if (value && 'slug' in value && value.slug) {
      const base = ref.relationTo === 'pages' ? '' : `/${ref.relationTo}`
      return `${base}/${value.slug}`
    }
  }
  return HOME_HERO_CAROUSEL.primaryCta.href
}

/** Maps Payload `homeHero` global to hero slider props; falls back to bundled defaults if empty or invalid. */
export function homeHeroGlobalToSliderProps(homeHero: HomeHero | null): HomeHeroSliderProps {
  const banners = homeHero?.banners
  const slides: HomeHeroCarouselSlide[] = []

  if (banners?.length) {
    for (const b of banners) {
      const imageSrc = mediaToImageSrc(b.image)
      if (!imageSrc) continue
      slides.push({
        imageSrc,
        eyebrow: b.eyebrow?.trim() || HOME_HERO.eyebrow,
        h1: b.heading,
        leadShort: (b.leadShort ?? b.lead ?? '').trim() || HOME_HERO.leadShort,
        lead: (b.lead ?? b.leadShort ?? '').trim() || HOME_HERO.lead,
      })
    }
  }

  if (slides.length === 0) {
    return {
      slides: HOME_HERO_CAROUSEL.slides.map((s) => ({ ...s })),
      primaryCta: { ...HOME_HERO_CAROUSEL.primaryCta },
      secondaryCta: { ...HOME_HERO_CAROUSEL.secondaryCta },
    }
  }

  const primary = homeHero?.primaryCta
  const secondary = homeHero?.secondaryCta

  return {
    slides,
    primaryCta: {
      label: primary?.buttonLabel?.trim() || HOME_HERO_CAROUSEL.primaryCta.label,
      href: primaryHref(primary?.link),
    },
    secondaryCta: {
      label: secondary?.buttonLabel?.trim() || HOME_HERO_CAROUSEL.secondaryCta.label,
      href: secondary?.url?.trim() || HOME_HERO_CAROUSEL.secondaryCta.href,
      external: secondary?.openInNewTab ?? true,
    },
  }
}
