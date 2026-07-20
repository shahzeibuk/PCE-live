import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

import { SERVICE_PAGES_SEED } from '../scripts/servicesPagesSeed'
import { upsertServicePages } from '../scripts/upsertServicePages'

/**
 * Ensures services.generate_slug exists (required by Payload slugField),
 * then upserts all public service detail pages with two-paragraph content.
 * Safe to re-run after deploy — updates existing rows by slug.
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "services"
    ADD COLUMN IF NOT EXISTS "generate_slug" boolean DEFAULT true;
  `)

  const { created, updated } = await upsertServicePages(payload, req)
  payload.logger.info(
    `Seeded service pages: ${created} created, ${updated} updated (${SERVICE_PAGES_SEED.length} total)`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  const slugs = SERVICE_PAGES_SEED.map((s) => s.slug)

  await payload.delete({
    collection: 'services',
    where: { slug: { in: slugs } },
    req,
    context: { disableRevalidate: true },
  })

  await db.execute(sql`
    ALTER TABLE "services" DROP COLUMN IF EXISTS "generate_slug";
  `)
}
