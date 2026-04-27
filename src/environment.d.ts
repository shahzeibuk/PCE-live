declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URL: string
      NEXT_PUBLIC_SERVER_URL: string
      /** Facebook Page Plugin href override (defaults to official PK Currency page). */
      NEXT_PUBLIC_FACEBOOK_PAGE_URL?: string
      VERCEL_PROJECT_PRODUCTION_URL: string
      /** Vercel Blob — enables @payloadcms/storage-vercel-blob for Media */
      BLOB_READ_WRITE_TOKEN?: string
      /**
       * Must match the Blob store’s access in Vercel. Use `private` if the store is private
       * (default UI for new stores). Omitted or any other value → public (direct URLs).
       */
      BLOB_STORE_ACCESS?: 'public' | 'private'
      /** Set to `true` for large uploads on Vercel (see Payload Vercel Blob client uploads) */
      VERCEL_BLOB_CLIENT_UPLOADS?: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
