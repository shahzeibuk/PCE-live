import fs from 'fs'
import path from 'path'
import type { Payload, PayloadRequest } from 'payload'

import { PARTNER_LOGOS } from '../constants/partnerLogos'

const ctx = { disableRevalidate: true }

function mimeFromFilename(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  if (ext === 'png') return 'image/png'
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg'
  if (ext === 'webp') return 'image/webp'
  if (ext === 'gif') return 'image/gif'
  if (ext === 'svg') return 'image/svg+xml'
  return 'application/octet-stream'
}

function mediaAltForSlug(slug: string): string {
  return `Partner service icon: ${slug}`
}

async function upsertPartnerMedia(
  payload: Payload,
  opts: { slug: string; name: string; file: string; absolutePath: string },
  req?: PayloadRequest,
): Promise<number | null> {
  const alt = mediaAltForSlug(opts.slug)

  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } },
    limit: 1,
    depth: 0,
    req,
  })

  if (existing.docs[0]) {
    return existing.docs[0].id as number
  }

  if (!fs.existsSync(opts.absolutePath)) {
    payload.logger.warn(`Partner logo missing on disk, skip: ${opts.absolutePath}`)
    return null
  }

  const data = fs.readFileSync(opts.absolutePath)
  const created = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data,
      mimetype: mimeFromFilename(opts.file),
      name: opts.file,
      size: data.byteLength,
    },
    context: ctx,
    req,
  })

  return created.id as number
}

/**
 * Upload partner logos from `public/partners/` into Media and assign as service icons.
 * Idempotent by media alt (`Partner service icon: {slug}`).
 */
export async function upsertServicePartnerIcons(
  payload: Payload,
  req?: PayloadRequest,
): Promise<{ iconsAssigned: number; skipped: number }> {
  const partnersDir = path.join(process.cwd(), 'public', 'partners')
  let iconsAssigned = 0
  let skipped = 0

  for (const logo of PARTNER_LOGOS) {
    const absolutePath = path.join(partnersDir, logo.file)
    const mediaId = await upsertPartnerMedia(
      payload,
      {
        slug: logo.serviceSlug,
        name: logo.name,
        file: logo.file,
        absolutePath,
      },
      req,
    )

    if (!mediaId) {
      skipped += 1
      continue
    }

    const { docs } = await payload.find({
      collection: 'services',
      where: { slug: { equals: logo.serviceSlug } },
      limit: 1,
      depth: 0,
      req,
    })

    if (!docs[0]) {
      payload.logger.warn(`Service not found for partner logo: ${logo.serviceSlug}`)
      skipped += 1
      continue
    }

    await payload.update({
      collection: 'services',
      id: docs[0].id,
      data: { icon: mediaId },
      context: ctx,
      req,
    })
    iconsAssigned += 1
  }

  return { iconsAssigned, skipped }
}
