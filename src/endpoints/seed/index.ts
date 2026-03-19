import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'
import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { home } from './home'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'news',
  'gallery',
  'services',
  'forms',
  'form-submissions',
  'search',
]

const globals: GlobalSlug[] = ['header', 'footer']

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  payload.logger.info(`— Clearing collections and globals...`)

  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {},
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL('https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp'),
    fetchFileByURL('https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp'),
    fetchFileByURL('https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp'),
    fetchFileByURL('https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp'),
  ])

  const [image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
    payload.create({ collection: 'media', data: { alt: 'Image 1' }, file: image1Buffer }),
    payload.create({ collection: 'media', data: { alt: 'Image 2' }, file: image2Buffer }),
    payload.create({ collection: 'media', data: { alt: 'Image 3' }, file: image3Buffer }),
    payload.create({ collection: 'media', data: { alt: 'Home Image' }, file: hero1Buffer }),
  ])

  payload.logger.info(`— Seeding categories...`)

  const categoryDocs = await Promise.all(
    ['Technology', 'News', 'Finance', 'Design', 'Software', 'Engineering'].map((category) =>
      payload.create({ collection: 'categories', data: { title: category } }),
    ),
  )

  payload.logger.info(`— Seeding posts...`)

  const [post1Doc, post2Doc, post3Doc] = await Promise.all([
    payload.create({ collection: 'posts', data: post1({ categories: [categoryDocs[0].id], image: image1Doc.id, author: '' }) }),
    payload.create({ collection: 'posts', data: post2({ categories: [categoryDocs[1].id, categoryDocs[2].id], image: image2Doc.id, author: '' }) }),
    payload.create({ collection: 'posts', data: post3({ categories: [categoryDocs[0].id, categoryDocs[2].id], image: image3Doc.id, author: '' }) }),
  ])

  payload.logger.info(`— Seeding services...`)

  const serviceItems = [
    { title: 'Currency Exchange', slug: 'currency-exchange' },
    { title: 'Remittance', slug: 'remittance' },
    { title: 'Western Union', slug: 'western-union' },
    { title: 'Demand Draft', slug: 'demand-draft' },
    { title: 'Telegraphic Transfer', slug: 'telegraphic-transfer' },
    { title: 'RIA', slug: 'ria' },
    { title: 'Money Gram', slug: 'moneygram' },
  ]

  const serviceDocs = await Promise.all(
    serviceItems.map((item) =>
      payload.create({
        collection: 'services',
        data: {
          title: item.title,
          slug: item.slug,
          description: `Our professional ${item.title} services ensure secure and efficient transactions.`,
        },
      }),
    )
  )

  payload.logger.info(`— Seeding news...`)

  const newsDocs = await Promise.all([
    payload.create({ collection: 'news', data: { title: 'New Branch Opening', slug: 'new-branch-opening', published_date: new Date().toISOString() } }),
    payload.create({ collection: 'news', data: { title: 'Q1 Financial Report', slug: 'q1-financial-report', published_date: new Date().toISOString() } }),
  ])

  payload.logger.info(`— Seeding gallery...`)

  await Promise.all([
    payload.create({ collection: 'gallery', data: { title: 'Head Office', image: image1Doc.id, description: 'Our main office in Karachi' } }),
    payload.create({ collection: 'gallery', data: { title: 'Annual Team Meet', image: image2Doc.id, description: 'Celebrating our team' } }),
  ])

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  payload.logger.info(`— Seeding pages...`)

  const [homePage, contactPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: home({ heroImage: imageHomeDoc, metaImage: image2Doc }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: contactPageData({ contactForm: contactForm }),
    }),
  ])

  payload.logger.info(`— Seeding additional pages...`)
  const additionalPagesInfo = [
    { title: 'Company Profile', slug: 'about' },
    { title: 'Mission & Vision', slug: 'mission-vision' },
    { title: 'Careers', slug: 'careers' },
    { title: 'Partners & Associates', slug: 'partners-associates' },
    { title: 'Complaints & Feedback', slug: 'complaints-feedback' },
    { title: 'Terms & Conditions', slug: 'terms' },
    { title: 'Privacy Policy', slug: 'privacy' },
    { title: 'KYC & Compliance', slug: 'kyc' },
    { title: 'News', slug: 'news', relationTo: 'news' },
    { title: 'Gallery', slug: 'gallery', relationTo: 'gallery' },
  ]

  const additionalPageDocs = await Promise.all(
    additionalPagesInfo.map((page) =>
      payload.create({
        collection: 'pages',
        data: {
          title: page.title,
          slug: page.slug,
          _status: 'published',
          hero: { type: 'none' },
          layout: page.relationTo ? [
            {
              blockType: 'archive',
              populateBy: 'collection',
              relationTo: page.relationTo as any,
              limit: 12,
            }
          ] : [
            {
              blockType: 'content',
              columns: [{
                size: 'full',
                richText: {
                  root: {
                    type: 'root',
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                    children: [
                      { type: 'heading', tag: 'h1', direction: 'ltr', format: '', indent: 0, version: 1, children: [{ type: 'text', text: page.title, version: 1 }] },
                      { type: 'paragraph', direction: 'ltr', format: '', indent: 0, version: 1, children: [{ type: 'text', text: `This is the ${page.title} page. Content coming soon.`, version: 1 }] }
                    ]
                  }
                }
              }]
            }
          ],
        },
      }),
    ),
  )

  const allPages = [homePage, contactPage, ...additionalPageDocs]
  const getPageId = (slug: string) => allPages.find(p => p.slug === slug)?.id

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          { link: { type: 'reference', label: 'Home', reference: { relationTo: 'pages', value: homePage.id } } },
          { link: { type: 'reference', label: 'About', reference: { relationTo: 'pages', value: getPageId('about') } } },
          { link: { type: 'custom', label: 'Services', url: '/services' } },
          { link: { type: 'reference', label: 'News', reference: { relationTo: 'pages', value: getPageId('news') } } },
          { link: { type: 'reference', label: 'Contact', reference: { relationTo: 'pages', value: contactPage.id } } },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        groups: [
          {
            label: 'Company',
            navItems: [
              { link: { type: 'reference', label: 'Company Profile', reference: { relationTo: 'pages', value: getPageId('about') } } },
              { link: { type: 'reference', label: 'Mission & Vision', reference: { relationTo: 'pages', value: getPageId('mission-vision') } } },
              { link: { type: 'reference', label: 'Careers', reference: { relationTo: 'pages', value: getPageId('careers') } } },
              { link: { type: 'reference', label: 'Partners & Associates', reference: { relationTo: 'pages', value: getPageId('partners-associates') } } },
              { link: { type: 'reference', label: 'Complaints & Feedback', reference: { relationTo: 'pages', value: getPageId('complaints-feedback') } } },
            ],
          },
          {
            label: 'Product & Services',
            navItems: serviceDocs.map(doc => ({
              link: { type: 'reference', label: doc.title, reference: { relationTo: 'services' as any, value: doc.id } }
            })),
          },
          {
            label: 'Media Center',
            navItems: [
              { link: { type: 'reference', label: 'Gallery', reference: { relationTo: 'pages', value: getPageId('gallery') } } },
              { link: { type: 'custom', label: 'Blog', url: '/posts' } },
              { link: { type: 'reference', label: 'News', reference: { relationTo: 'pages', value: getPageId('news') } } },
            ],
          },
          {
            label: 'Legal',
            navItems: [
              { link: { type: 'reference', label: 'Terms & Conditions', reference: { relationTo: 'pages', value: getPageId('terms') } } },
              { link: { type: 'reference', label: 'Privacy Policy', reference: { relationTo: 'pages', value: getPageId('privacy') } } },
              { link: { type: 'reference', label: 'KYC & Compliance', reference: { relationTo: 'pages', value: getPageId('kyc') } } },
            ],
          },
        ],
      },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  const data = await res.arrayBuffer()
  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
