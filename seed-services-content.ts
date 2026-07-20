/**
 * Refresh rich-text content on existing service pages.
 * Prefer `pnpm db:migrate` (seeds via 20260720_120000_seed_services_pages) on deploy.
 *
 * Run: `pnpm exec tsx seed-services-content.ts`
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from './src/payload.config'
import { upsertServicePages } from './src/scripts/upsertServicePages'

async function run() {
  const payload = await getPayload({ config })
  const { created, updated } = await upsertServicePages(payload)
  console.log(`Service pages: ${created} created, ${updated} updated`)
}

run()
  .catch(console.error)
  .then(() => process.exit(0))
