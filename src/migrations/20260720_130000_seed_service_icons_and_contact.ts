import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

import { PARTNER_LOGOS } from '../constants/partnerLogos'
import {
  ensureContactNavLink,
  upsertContactPage,
} from '../scripts/upsertContactPage'
import { upsertServicePartnerIcons } from '../scripts/upsertServicePartnerIcons'

/**
 * Uploads Valued Partners logos into Media, assigns them as service icons,
 * and upserts the Contact Us CMS page at `/contact`.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const { iconsAssigned, skipped } = await upsertServicePartnerIcons(payload, req)
  payload.logger.info(
    `Service partner icons: ${iconsAssigned} assigned, ${skipped} skipped (${PARTNER_LOGOS.length} logos)`,
  )

  const contact = await upsertContactPage(payload, req)
  await ensureContactNavLink(payload, req)
  payload.logger.info(
    `Contact page /contact ${contact.created ? 'created' : 'updated'} (page ${contact.pageId}, form ${contact.formId})`,
  )
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Keep contact page and media — only clear icons we attached for partner services.
  for (const logo of PARTNER_LOGOS) {
    const { docs } = await payload.find({
      collection: 'services',
      where: { slug: { equals: logo.serviceSlug } },
      limit: 1,
      depth: 0,
      req,
    })
    if (!docs[0]) continue
    await payload.update({
      collection: 'services',
      id: docs[0].id,
      data: { icon: null },
      context: { disableRevalidate: true },
      req,
    })
  }
}
