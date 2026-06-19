import { postgresAdapter, type MigrateUpArgs } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { CurrencyRates } from './collections/CurrencyRates'
import { Branches } from './collections/Branches'
import { Services } from './collections/Services'
import { News } from './collections/News'
import { Gallery } from './collections/Gallery'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Partners } from './collections/Partners'
import { Testimonials } from './collections/Testimonials'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { HomeHero } from './HomeHero/config'
import { HomeServices } from './HomeServices/config'
import { HomeWhyUs } from './HomeWhyUs/config'
import { HomeFaq } from './HomeFaq/config'
import { PromoBanner } from './PromoBanner/config'
import { SiteBranding } from './SiteBranding/config'
// Uploads: Vercel Blob (token + public store) or S3 — configured in `src/plugins/index.ts` and `src/plugins/vercelBlobStorage.ts`
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getLiveSiteURL, getServerSideURL } from './utilities/getURL'
import { seedHandler } from './endpoints/seed'
import { seedNavHandler } from './endpoints/seedNav'
import { seedBranches } from './scripts/seed_branches'
import { denySeedInProduction } from './utilities/seedEndpointGuard'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

import { up as initializeSchema } from './migrations/20260319_013549_init_collections'
import { migrations } from './migrations'

export default buildConfig({
  serverURL: getServerSideURL(),
  onInit: async (payload) => {
    if (process.env.PAYLOAD_SEED === 'true' || process.env.NODE_ENV === 'development') {
        payload.logger.info('ONINIT: Running schema initialization from migration...');
        try {
            const adapter = payload.db as { drizzle?: unknown }
            if (!adapter?.drizzle) {
                payload.logger.error('ONINIT: Postgres adapter has no drizzle client; schema init skipped.')
                return
            }
            await initializeSchema({
              db: adapter.drizzle as MigrateUpArgs['db'],
              payload,
              req: {} as MigrateUpArgs['req'],
            })
            payload.logger.info('ONINIT: Schema initialization complete.');
        } catch (e: any) {
            payload.logger.error(`ONINIT ERROR: ${e.message}`);
        }
    }
  },
  admin: {
    meta: {
      title: 'Pakistan Currency Exchange',
      description:
        'Manage exchange rates, content, branches, and site settings for Pakistan Currency Exchange.',
      titleSuffix: ' | PCE Admin',
      defaultOGImageType: 'off',
      icons: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          url: '/api/branding/favicon?variant=ico',
          sizes: '32x32',
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          url: '/api/branding/favicon?variant=svg',
        },
        {
          rel: 'apple-touch-icon',
          type: 'image/png',
          url: '/api/branding/favicon?variant=ico',
        },
      ],
      openGraph: {
        siteName: 'Pakistan Currency Exchange Admin',
        title: 'PCE Admin',
        description:
          'Admin panel for Pakistan Currency Exchange — rates, content, and site configuration.',
      },
    },
    components: {
      graphics: {
        Logo: '@/components/Logo/PayloadLogo#PayloadLogo',
        Icon: '@/components/Logo/PayloadLogo#PayloadIcon',
      },
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/AdminDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    prodMigrations: migrations,
    /**
     * Always off: dev `push` writes `batch = -1` rows in `payload_migrations`, which triggers an
     * interactive “dev mode” migrate prompt and can stall `next build` / CI. After schema edits run
     * `pnpm payload migrate:create` then `pnpm db:migrate`. To clean an existing DB: delete dev
     * markers — `scripts/sql/clean-payload-dev-migration-markers.sql`.
     */
    push: false,
  }),
  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    CurrencyRates,
    Branches,
    Services,
    News,
    Gallery,
    ContactSubmissions,
    Partners,
    Testimonials,
  ],
  cors: [...new Set([getServerSideURL(), getLiveSiteURL()].map((url) => url.replace(/\/$/, '')))].filter(
    Boolean,
  ),
  globals: [SiteBranding, Header, Footer, HomeHero, HomeServices, HomeWhyUs, HomeFaq, PromoBanner],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
  endpoints: [
    {
      path: '/seed',
      method: 'get',
      handler: seedHandler,
    },
    {
      path: '/seed-nav',
      method: 'get',
      handler: seedNavHandler,
    },
    {
      path: '/seed-branches',
      method: 'get',
      handler: async (req: PayloadRequest) => {
        const forbidden = denySeedInProduction(req)
        if (forbidden) return forbidden
        try {
          await seedBranches(req.payload)
          return Response.json({ message: 'Branches seeded successfully' })
        } catch (error: any) {
          return Response.json({ error: error.message }, { status: 500 })
        }
      },
    },
  ],
})
