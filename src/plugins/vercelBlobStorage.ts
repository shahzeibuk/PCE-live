import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import type { Plugin } from 'payload'

/**
 * Vercel Blob for Media uploads (see `plugins` in `payload.config.ts` via `src/plugins/index.ts`).
 * Set `BLOB_READ_WRITE_TOKEN` in Vercel; with a public Blob store, `clientUploads` is enabled for
 * large files on Vercel serverless. Private stores: set `BLOB_STORE_ACCESS=private` (and do not
 * use public `access` on a private store). Takes priority over S3 when the token is present.
 */
export function vercelBlobStoragePlugin(): Plugin | null {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim()
  if (!token) return null

  const access: 'public' | 'private' =
    process.env.BLOB_STORE_ACCESS === 'private' ? 'private' : 'public'

  return vercelBlobStorage({
    enabled: true,
    token,
    access,
    collections: {
      media: true,
    },
    // Public stores support client-side uploads; set VERCEL_BLOB_CLIENT_UPLOADS=false to disable.
    clientUploads: process.env.VERCEL_BLOB_CLIENT_UPLOADS !== 'false',
  } as Parameters<typeof vercelBlobStorage>[0])
}
