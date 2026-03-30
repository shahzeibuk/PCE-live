import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import type { Plugin } from 'payload'

/**
 * Vercel Blob for Media uploads on Vercel deployments.
 * Set `BLOB_READ_WRITE_TOKEN` in Vercel (often injected when Blob is enabled for the project).
 *
 * Takes priority over S3 when the token is present.
 */
export function vercelBlobStoragePlugin(): Plugin | null {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim()
  if (!token) return null

  return vercelBlobStorage({
    enabled: true,
    token,
    collections: {
      media: true,
    },
    ...(process.env.VERCEL_BLOB_CLIENT_UPLOADS === 'true' ? { clientUploads: true } : {}),
  })
}
