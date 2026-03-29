import type { Payload } from 'payload'

import {
  LEGACY_SERVICES,
  LEGACY_TESTIMONIALS,
  lexicalParagraph,
} from './legacySiteSeedData'

export async function replaceLegacyServices(payload: Payload): Promise<void> {
  await payload.delete({
    collection: 'services',
    where: { id: { exists: true } },
  })
  for (const s of LEGACY_SERVICES) {
    await payload.create({
      collection: 'services',
      data: {
        title: s.title,
        slug: s.slug,
        short_description: s.short_description,
        description: s.description,
        process_steps: s.process_steps,
        benefits: s.benefits,
        content: lexicalParagraph(s.body),
        cta_text: 'Contact us',
        cta_link: '/contact',
      },
    })
    console.log(`  created service: ${s.slug}`)
  }
}

export async function replaceLegacyTestimonials(payload: Payload): Promise<void> {
  await payload.delete({
    collection: 'testimonials',
    where: { id: { exists: true } },
  })
  for (const t of LEGACY_TESTIMONIALS) {
    await payload.create({
      collection: 'testimonials',
      data: t,
    })
    console.log(`  created testimonial: ${t.name}`)
  }
}
