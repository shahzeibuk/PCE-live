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

  // Must match the Blob store in Vercel: private stores require access: 'private' or @vercel/blob
  // throws "Cannot use public access on a private store". Public stores: use 'public' (default) or
  // omit BLOB_STORE_ACCESS.
  const access: 'public' | 'private' =
    process.env.BLOB_STORE_ACCESS === 'private' ? 'private' : 'public'

  return vercelBlobStorage({
    enabled: true,
    token,
    access,
    collections: {
      media: true,
    },
    ...(process.env.VERCEL_BLOB_CLIENT_UPLOADS === 'true' ? { clientUploads: true } : {}),
  } as Parameters<typeof vercelBlobStorage>[0])
}
