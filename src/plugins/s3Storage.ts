import { s3Storage } from '@payloadcms/storage-s3'
import type { Plugin } from 'payload'

/**
 * Production uploads: S3-compatible storage (AWS S3, Cloudflare R2, MinIO, etc.).
 * When required env vars are missing, returns null and the Media collection keeps
 * local `public/media` (fine for local dev or a single long-lived server).
 */
export function s3StoragePlugin(): Plugin | null {
  const bucket = process.env.S3_BUCKET?.trim()
  const accessKeyId = process.env.S3_ACCESS_KEY_ID?.trim()
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY?.trim()
  const region = process.env.S3_REGION?.trim()

  if (!bucket || !accessKeyId || !secretAccessKey || !region) {
    return null
  }

  const endpoint = process.env.S3_ENDPOINT?.trim()
  const forcePathStyle =
    process.env.S3_FORCE_PATH_STYLE === 'true' || Boolean(endpoint)

  const aclEnv = process.env.S3_ACL?.trim()
  const acl =
    aclEnv === 'private' || aclEnv === 'public-read' ? aclEnv : undefined

  return s3Storage({
    collections: {
      media: true,
    },
    bucket,
    ...(acl ? { acl } : {}),
    config: {
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
      ...(endpoint
        ? {
            endpoint,
            forcePathStyle,
          }
        : {}),
    },
    ...(process.env.S3_CLIENT_UPLOADS === 'true' ? { clientUploads: true } : {}),
  })
}
