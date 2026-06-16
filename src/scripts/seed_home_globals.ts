/**
 * Seeds homepage Payload globals from bundled defaults in `homeContent.ts`.
 *
 * Run: `pnpm seed:home-globals`
 * Force overwrite: `pnpm seed:home-globals -- --force`
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../payload.config'
import { seedHomeGlobals } from './seedHomeGlobalsCore'

async function main() {
  const force = process.argv.includes('--force')
  const payload = await getPayload({ config })

  payload.logger.info(
    force
      ? 'Seeding homepage globals (force overwrite)…'
      : 'Seeding homepage globals (empty globals only)…',
  )

  const { seeded, skipped } = await seedHomeGlobals(payload, { force })

  if (seeded.length) {
    payload.logger.info(`Seeded: ${seeded.join(', ')}`)
  }
  if (skipped.length) {
    payload.logger.info(`Skipped (already has content): ${skipped.join(', ')}`)
    payload.logger.info('Re-run with --force to overwrite.')
  }

  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
