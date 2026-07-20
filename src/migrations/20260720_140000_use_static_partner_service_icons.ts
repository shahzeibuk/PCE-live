import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

import { PARTNER_LOGOS } from '../constants/partnerLogos'

/**
 * Clear CMS Media icon relations on partner services.
 * Icons are served from static `public/partners/` files (see partnerLogos.ts /
 * ServiceListingIcon). Previous migration uploaded to Media, which often fails
 * to serve on production without durable object storage.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  let cleared = 0

  for (const logo of PARTNER_LOGOS) {
    const { docs } = await payload.find({
      collection: 'services',
      where: { slug: { equals: logo.serviceSlug } },
      limit: 1,
      depth: 0,
      req,
    })

    if (!docs[0]?.icon) continue

    await payload.update({
      collection: 'services',
      id: docs[0].id,
      data: { icon: null },
      context: { disableRevalidate: true },
      req,
    })
    cleared += 1
  }

  payload.logger.info(
    `Cleared ${cleared} CMS service icons; UI uses static /partners logos (${PARTNER_LOGOS.length} files in repo)`,
  )
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // No-op: cannot restore previous Media relations reliably.
}
