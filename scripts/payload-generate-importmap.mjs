/**
 * Ensures a format-valid BLOB_READ_WRITE_TOKEN when missing so
 * @payloadcms/storage-vercel-blob registers VercelBlobClientUploadHandler
 * in the import map. Real builds (e.g. Vercel) use the project token; local
 * dev without Blob still generates a map that includes the handler.
 */
import { execSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

if (!String(process.env.BLOB_READ_WRITE_TOKEN ?? '').trim()) {
  process.env.BLOB_READ_WRITE_TOKEN = 'vercel_blob_rw_abc123def456_0123456789abcdef'
}

const env = {
  ...process.env,
  NODE_OPTIONS: process.env.NODE_OPTIONS?.includes('--no-deprecation')
    ? process.env.NODE_OPTIONS
    : [process.env.NODE_OPTIONS, '--no-deprecation'].filter(Boolean).join(' ').trim(),
}

execSync('pnpm exec payload generate:importmap', {
  stdio: 'inherit',
  env,
  shell: true,
  cwd: root,
})
