import fs from 'fs'
import path from 'path'
import type { Payload, PayloadRequest } from 'payload'

import { PARTNER_LOGOS } from '../constants/partnerLogos'

/**
 * Ensures partner logo files exist in `public/partners/` (shipped with the deploy).
 * Service UI reads these static paths directly — do NOT rely on CMS Media uploads
 * for production icons (ephemeral/local disk or missing S3 breaks Media URLs).
 */
export async function upsertServicePartnerIcons(
  payload: Payload,
  _req?: PayloadRequest,
): Promise<{ iconsAssigned: number; skipped: number }> {
  const partnersDir = path.join(process.cwd(), 'public', 'partners')
  let iconsAssigned = 0
  let skipped = 0

  for (const logo of PARTNER_LOGOS) {
    const absolutePath = path.join(partnersDir, logo.file)
    if (!fs.existsSync(absolutePath)) {
      payload.logger.warn(
        `Partner logo missing from public/partners (will not show on services): ${logo.file}`,
      )
      skipped += 1
      continue
    }

    payload.logger.info(
      `Partner logo OK for /services/${logo.serviceSlug}: /partners/${encodeURIComponent(logo.file)}`,
    )
    iconsAssigned += 1
  }

  return { iconsAssigned, skipped }
}
