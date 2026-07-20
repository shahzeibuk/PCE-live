import type { Payload, PayloadRequest } from 'payload'

import {
  SERVICE_PAGES_SEED,
  lexicalFromParagraphs,
  type ServicePageSeed,
} from '../scripts/servicesPagesSeed'

function serviceData(s: ServicePageSeed) {
  return {
    title: s.title,
    slug: s.slug,
    generateSlug: false,
    short_description: s.short_description,
    description: s.description,
    content: lexicalFromParagraphs(s.paragraphs),
    process_steps: s.process_steps,
    benefits: s.benefits,
    cta_text: s.cta_text ?? 'Contact us',
    cta_link: s.cta_link ?? '/contact',
  }
}

/** Upsert all service detail pages (idempotent). Used by migration + seed scripts. */
export async function upsertServicePages(
  payload: Payload,
  req?: PayloadRequest,
): Promise<{ created: number; updated: number }> {
  let created = 0
  let updated = 0
  const context = { disableRevalidate: true }

  for (const s of SERVICE_PAGES_SEED) {
    const { docs } = await payload.find({
      collection: 'services',
      where: { slug: { equals: s.slug } },
      limit: 1,
      depth: 0,
      req,
    })

    const data = serviceData(s)

    if (docs[0]) {
      await payload.update({
        collection: 'services',
        id: docs[0].id,
        data,
        context,
        req,
      })
      updated += 1
    } else {
      await payload.create({
        collection: 'services',
        data,
        context,
        req,
      })
      created += 1
    }
  }

  return { created, updated }
}
