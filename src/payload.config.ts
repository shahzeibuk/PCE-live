import { postgresAdapter } from '@payloadcms/db-postgres'
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
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { seedHandler } from './endpoints/seed'
import { seedNavHandler } from './endpoints/seedNav'
import { seedBranches } from './scripts/seed_branches'
import { denySeedInProduction } from './utilities/seedEndpointGuard'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

import { up as initializeSchema } from './migrations/20260319_013549_init_collections'

export default buildConfig({
  onInit: async (payload) => {
    if (process.env.PAYLOAD_SEED === 'true' || process.env.NODE_ENV === 'development') {
        payload.logger.info('ONINIT: Running schema initialization from migration...');
        try {
            await initializeSchema({ db: payload.db as any, payload, req: {} as any })
            payload.logger.info('ONINIT: Schema initialization complete.');
        } catch (e: any) {
            payload.logger.error(`ONINIT ERROR: ${e.message}`);
        }
    }
  },
  admin: {
    components: {
      graphics: {
        Logo: '@/components/Logo/PayloadLogo#PayloadLogo',
        Icon: '@/components/Logo/PayloadLogo#PayloadIcon',
      },
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
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
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
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
