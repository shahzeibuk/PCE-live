import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import type { File, Payload } from 'payload'

import {
  HOME_FAQ,
  HOME_HERO_CAROUSEL,
  HOME_SERVICES_ORDER_SECTION,
  HOME_WHY_US,
} from '@/components/home/homeContent'

const publicDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../public')

const seedContext = { disableRevalidate: true }

export type SeedHomeGlobalsOptions = {
  /** Overwrite globals even when they already have content */
  force?: boolean
}

function loadPublicFile(webPath: string): File {
  const rel = webPath.replace(/^\//, '')
  const abs = path.join(publicDir, rel)
  if (!fs.existsSync(abs)) {
    throw new Error(`Missing public file: ${webPath} (expected at ${abs})`)
  }
  const data = fs.readFileSync(abs)
  const name = path.basename(abs)
  const ext = path.extname(abs).slice(1).toLowerCase()
  const mimetype =
    ext === 'svg'
      ? 'image/svg+xml'
      : ext === 'jpg' || ext === 'jpeg'
        ? 'image/jpeg'
        : `image/${ext}`
  return { name, data, mimetype, size: data.length }
}

async function getOrCreateMedia(payload: Payload, webPath: string, alt: string) {
  const file = loadPublicFile(webPath)
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: file.name } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  if (existing.docs[0]) {
    return existing.docs[0]
  }

  return payload.create({
    collection: 'media',
    data: { alt },
    file,
    overrideAccess: true,
  })
}

async function isHomeHeroEmpty(payload: Payload): Promise<boolean> {
  const global = await payload.findGlobal({ slug: 'homeHero', depth: 0 })
  return !global.banners?.length
}

async function isHomeServicesEmpty(payload: Payload): Promise<boolean> {
  const global = await payload.findGlobal({ slug: 'homeServices', depth: 0 })
  return !global.boxes?.length
}

async function isHomeWhyUsEmpty(payload: Payload): Promise<boolean> {
  const global = await payload.findGlobal({ slug: 'homeWhyUs', depth: 0 })
  return !global.items?.length && !global.image
}

async function isHomeFaqEmpty(payload: Payload): Promise<boolean> {
  const global = await payload.findGlobal({ slug: 'homeFaq', depth: 0 })
  return !global.items?.length
}

async function seedHomeHero(payload: Payload) {
  payload.logger.info('— Seeding homeHero global…')

  const banners = await Promise.all(
    HOME_HERO_CAROUSEL.slides.map(async (slide) => {
      const media = await getOrCreateMedia(payload, slide.imageSrc, slide.h1)
      return {
        image: media.id,
        eyebrow: slide.eyebrow,
        heading: slide.h1,
        leadShort: slide.leadShort,
        lead: slide.lead,
      }
    }),
  )

  await payload.updateGlobal({
    slug: 'homeHero',
    data: {
      banners,
      primaryCta: {
        buttonLabel: HOME_HERO_CAROUSEL.primaryCta.label,
        link: {
          type: 'custom',
          url: HOME_HERO_CAROUSEL.primaryCta.href,
          newTab: false,
        },
      },
      secondaryCta: {
        buttonLabel: HOME_HERO_CAROUSEL.secondaryCta.label,
        url: HOME_HERO_CAROUSEL.secondaryCta.href,
        openInNewTab: HOME_HERO_CAROUSEL.secondaryCta.external ?? true,
      },
    },
    context: seedContext,
    overrideAccess: true,
  })
}

async function seedHomeServices(payload: Payload) {
  payload.logger.info('— Seeding homeServices global…')

  const boxes = await Promise.all(
    HOME_SERVICES_ORDER_SECTION.boxes.map(async (box) => {
      const media = await getOrCreateMedia(payload, box.imageSrc, box.title)
      return {
        icon: media.id,
        title: box.title,
        description: box.description,
        ctaLabel: box.ctaLabel,
        url: box.href,
        openInNewTab: false,
      }
    }),
  )

  await payload.updateGlobal({
    slug: 'homeServices',
    data: {
      title: HOME_SERVICES_ORDER_SECTION.heading,
      description: HOME_SERVICES_ORDER_SECTION.description,
      boxes,
    },
    context: seedContext,
    overrideAccess: true,
  })
}

async function seedHomeWhyUs(payload: Payload) {
  payload.logger.info('— Seeding homeWhyUs global…')

  const image = await getOrCreateMedia(payload, HOME_WHY_US.imageSrc, 'Pakistan Currency Exchange')

  await payload.updateGlobal({
    slug: 'homeWhyUs',
    data: {
      heading: HOME_WHY_US.heading,
      subheading: HOME_WHY_US.subheading,
      image: image.id,
      items: HOME_WHY_US.items.map((item) => ({
        icon: item.icon,
        text: item.text,
      })),
      footer: HOME_WHY_US.footer,
    },
    context: seedContext,
    overrideAccess: true,
  })
}

async function seedHomeFaq(payload: Payload) {
  payload.logger.info('— Seeding homeFaq global…')

  await payload.updateGlobal({
    slug: 'homeFaq',
    data: {
      heading: HOME_FAQ.heading,
      subheading: HOME_FAQ.subheading,
      initialVisibleCount: 5,
      items: HOME_FAQ.items.map((item) => ({
        question: item.q,
        answer: item.a,
      })),
    },
    context: seedContext,
    overrideAccess: true,
  })
}

/** Populates homepage globals from `homeContent.ts` defaults (hero, services, why us, FAQ). */
export async function seedHomeGlobals(
  payload: Payload,
  options: SeedHomeGlobalsOptions = {},
): Promise<{ seeded: string[]; skipped: string[] }> {
  const force = options.force === true
  const seeded: string[] = []
  const skipped: string[] = []

  if (force || (await isHomeHeroEmpty(payload))) {
    await seedHomeHero(payload)
    seeded.push('homeHero')
  } else {
    skipped.push('homeHero')
  }

  if (force || (await isHomeServicesEmpty(payload))) {
    await seedHomeServices(payload)
    seeded.push('homeServices')
  } else {
    skipped.push('homeServices')
  }

  if (force || (await isHomeWhyUsEmpty(payload))) {
    await seedHomeWhyUs(payload)
    seeded.push('homeWhyUs')
  } else {
    skipped.push('homeWhyUs')
  }

  if (force || (await isHomeFaqEmpty(payload))) {
    await seedHomeFaq(payload)
    seeded.push('homeFaq')
  } else {
    skipped.push('homeFaq')
  }

  return { seeded, skipped }
}
