import type { Payload } from 'payload'

import { LEGACY_TESTIMONIALS } from './legacySiteSeedData'
import { upsertServicePages } from './upsertServicePages'

export async function replaceLegacyServices(payload: Payload): Promise<void> {
  const { created, updated } = await upsertServicePages(payload)
  console.log(`  services upserted: ${created} created, ${updated} updated`)
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
