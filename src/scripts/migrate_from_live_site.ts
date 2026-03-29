/**
 * One command to align Payload with pakistancurrency.com public marketing content:
 * services, testimonials, About/Contact pages, header/footer, branch data (optional).
 *
 * This does NOT scrape HTML in real time — it loads curated parity data from
 * legacySiteSeedData.ts + legacyCmsCopy.ts (maintained when the live site changes).
 * Use snapshot:legacy to save raw HTML from the live server for manual diffing.
 *
 * Usage:
 *   pnpm migrate:site
 *
 * Branches: place branches_data.json in repo root (see scripts/scrape_branches.js),
 * or set SKIP_LEGACY_BRANCHES=true to skip.
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

const LIVE_URL = (process.env.LEGACY_PUBLIC_SITE_URL || 'https://www.pakistancurrency.com').replace(
  /\/$/,
  '',
)

async function probeLiveSite(): Promise<void> {
  try {
    const res = await fetch(LIVE_URL, {
      headers: {
        'User-Agent': 'PCE-migration-probe/1.0 (+dev)',
        Accept: 'text/html',
      },
      redirect: 'follow',
    })
    const text = (await res.text()).slice(0, 4000)
    if (text.includes('<?php') || text.startsWith('PD9waH')) {
      console.warn(
        '\n⚠️  Live site returned PHP source or encoded payload instead of HTML.',
        'Fix server routing / PHP-FPM on the legacy host before relying on snapshot:legacy.',
        'Seeding will still run using bundled copy.\n',
      )
      return
    }
    if (!res.ok) {
      console.warn(`\n⚠️  Live site HTTP ${res.status} for ${LIVE_URL} — check DNS / SSL.\n`)
      return
    }
    console.log(`✓ Live URL responded (${res.status}): ${LIVE_URL}\n`)
  } catch (e) {
    console.warn('\n⚠️  Could not reach live URL — offline or blocked. Continuing with bundled data.\n', e)
  }
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('Set DATABASE_URL in .env')
    process.exit(1)
  }

  await probeLiveSite()

  const payload = await getPayload({ config })
  const jsonPath = path.join(repoRoot, 'branches_data.json')
  const skipBranches =
    process.env.SKIP_LEGACY_BRANCHES === 'true' || process.env.SKIP_LEGACY_BRANCHES === '1'

  if (!skipBranches && fs.existsSync(jsonPath)) {
    console.log('→ Branches (replace from branches_data.json)')
    await seedBranches(payload, { replace: true })
  } else if (!skipBranches && !fs.existsSync(jsonPath)) {
    console.warn(
      '→ Branches skipped (no branches_data.json). Run: node scripts/scrape_branches.js',
    )
  } else {
    console.log('→ Branches skipped (SKIP_LEGACY_BRANCHES set)')
  }

  console.log('→ Services (replace with legacy-site-aligned set)')
  await replaceLegacyServices(payload)

  console.log('→ Testimonials (replace)')
  await replaceLegacyTestimonials(payload)

  console.log('→ CMS pages, header, footer, contact form, service detail bodies')
  await seedCmsFromLegacy(payload)

  console.log('\nDone. Blog posts (/posts) and News must be created in Payload admin or a future import.')
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
