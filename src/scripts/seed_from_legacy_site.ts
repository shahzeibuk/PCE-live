/**
 * One-shot import from pakistancurrency.com legacy data:
 * - branches_data.json (run `node scripts/scrape_branches.js` first)
 * - services + testimonials aligned with the public marketing site
 *
 * Usage: pnpm seed:legacy
 *
 * Prefer: pnpm migrate:site (same data + optional branch skip + live URL probe)
 */
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'

import config from '../payload.config'
import { replaceLegacyServices, replaceLegacyTestimonials } from './legacySiteMigrationCore'
import { seedBranches } from './seed_branches'
import { seedCmsFromLegacy } from './seed_cms_from_legacy'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const repoRoot = path.resolve(dirname, '../..')

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('Set DATABASE_URL in .env')
    process.exit(1)
  }

  const jsonPath = path.join(repoRoot, 'branches_data.json')
  if (!fs.existsSync(jsonPath)) {
    console.error('Missing branches_data.json — run: node scripts/scrape_branches.js')
    process.exit(1)
  }

  const payload = await getPayload({ config })

  console.log('→ Branches (replace all from JSON)')
  await seedBranches(payload, { replace: true })

  console.log('→ Services (replace with legacy-site-aligned set)')
  await replaceLegacyServices(payload)

  console.log('→ Testimonials (replace)')
  await replaceLegacyTestimonials(payload)

  console.log('→ CMS pages, header, contact form, service bodies (legacy site copy)')
  await seedCmsFromLegacy(payload)

  console.log('Done.')
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
