/**
 * Seeds CMS pages (About, Contact), header navigation, contact form, and service detail copy
 * from Pakistan Currency Exchange public website content.
 *
 * Run: `pnpm run seed:cms` or via `pnpm run seed:legacy` (chained).
 */
import 'dotenv/config'
import type { Payload } from 'payload'
import { getPayload } from 'payload'

import config from '../payload.config'
import { contactForm as contactFormSeed } from '../endpoints/seed/contact-form'
import {
  ABOUT_COPY,
  CONTACT_COPY,
  FOOTER_GROUPS,
  HEADER_NAV,
  SERVICE_DETAIL_PARAGRAPHS,
} from './legacyCmsCopy'

const ctx = { disableRevalidate: true }

function tx(text: string) {
  return {
    type: 'text',
    text,
    detail: 0,
    format: 0,
    mode: 'normal',
    style: '',
    version: 1,
  }
}

function pText(text: string) {
  return {
    type: 'paragraph',
    children: [tx(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}

function heading(tag: 'h1' | 'h2' | 'h3', text: string) {
  return {
    type: 'heading',
    tag,
    children: [tx(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}

function lexicalRoot(children: Record<string, unknown>[]) {
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

function buildAboutBodyLexical() {
  const children: Record<string, unknown>[] = []
  for (const section of ABOUT_COPY.sections) {
    children.push(heading('h2', section.heading))
    for (const para of section.paragraphs) {
      children.push(pText(para))
    }
  }
  return lexicalRoot(children)
}

function buildContactInfoLexical() {
  return lexicalRoot([
    heading('h2', 'Get in touch'),
    pText(CONTACT_COPY.intro),
    heading('h3', 'Head office'),
    pText(CONTACT_COPY.addressLine),
    heading('h3', 'Phone'),
    pText(`${CONTACT_COPY.phone} (UAN) · Toll-free ${CONTACT_COPY.tollFree}`),
    heading('h3', 'Email'),
    pText(CONTACT_COPY.email),
    pText('For branch-specific numbers and maps, use the Branches page.'),
  ])
}

async function upsertPublishedPage(payload: Payload, data: Record<string, unknown>) {
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: data.slug as string } },
    limit: 1,
    depth: 0,
  })

  const payloadData = {
    ...data,
    _status: 'published' as const,
    publishedAt: new Date().toISOString(),
  }

  if (docs[0]) {
    await payload.update({
      collection: 'pages',
      id: docs[0].id,
      data: payloadData,
      context: ctx,
    })
  } else {
    await payload.create({
      collection: 'pages',
      data: payloadData,
      context: ctx,
    })
  }
}

async function upsertContactForm(payload: Payload): Promise<number> {
  const { docs } = await payload.find({
    collection: 'forms',
    where: { title: { equals: 'Contact Form' } },
    limit: 1,
    depth: 0,
  })

  const data = {
    ...contactFormSeed,
  } as Record<string, unknown>
  delete data.createdAt
  delete data.updatedAt

  if (docs[0]) {
    const updated = await payload.update({
      collection: 'forms',
      id: docs[0].id,
      data: data as typeof contactFormSeed,
      context: ctx,
    })
    return updated.id as number
  }

  const created = await payload.create({
    collection: 'forms',
    data: data as typeof contactFormSeed,
    context: ctx,
  })
  return created.id as number
}

export async function seedCmsFromLegacy(payload: Payload): Promise<void> {
  console.log('→ CMS: contact form')
  const formId = await upsertContactForm(payload)

  console.log('→ CMS: About page (/about)')
  await upsertPublishedPage(payload, {
    title: 'About Us',
    slug: 'about',
    meta: {
      title: ABOUT_COPY.metaTitle,
      description: ABOUT_COPY.metaDescription,
    },
    hero: {
      type: 'lowImpact',
      richText: lexicalRoot([
        heading('h1', ABOUT_COPY.heroTitle),
        pText(ABOUT_COPY.heroLead),
      ]),
      links: [
        {
          link: {
            type: 'custom',
            url: '/contact',
            label: 'Contact us',
            newTab: false,
          },
        },
        {
          link: {
            type: 'custom',
            url: '/services',
            label: 'Our services',
            newTab: false,
          },
        },
      ],
    },
    layout: [
      {
        blockType: 'content',
        columns: [
          {
            size: 'full',
            richText: buildAboutBodyLexical(),
            enableLink: false,
          },
        ],
      },
      {
        blockType: 'servicesGrid',
        title: 'Our products & services',
      },
    ],
  })

  console.log('→ CMS: Contact page (/contact)')
  await upsertPublishedPage(payload, {
    title: 'Contact',
    slug: 'contact',
    meta: {
      title: CONTACT_COPY.metaTitle,
      description: CONTACT_COPY.metaDescription,
    },
    hero: {
      type: 'lowImpact',
      richText: lexicalRoot([
        heading('h1', CONTACT_COPY.heroTitle),
        pText(CONTACT_COPY.intro),
      ]),
      links: [
        {
          link: {
            type: 'custom',
            url: '/branches',
            label: 'Branch locator',
            newTab: false,
          },
        },
        {
          link: {
            type: 'custom',
            url: `tel:${CONTACT_COPY.tollFree.replace(/\D/g, '')}`,
            label: `Call ${CONTACT_COPY.tollFree}`,
            newTab: false,
          },
        },
      ],
    },
    layout: [
      {
        blockType: 'content',
        columns: [
          {
            size: 'full',
            richText: buildContactInfoLexical(),
            enableLink: false,
          },
        ],
      },
      {
        blockType: 'formBlock',
        form: formId,
        enableIntro: false,
      },
    ],
  })

  console.log('→ CMS: Header navigation')
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: HEADER_NAV.map(({ url, label }) => ({
        link: {
          type: 'custom',
          url,
          label,
          newTab: false,
        },
      })),
    },
    context: ctx,
  })

  console.log('→ CMS: Footer link groups')
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      groups: FOOTER_GROUPS.map((g) => ({
        label: g.label,
        navItems: g.navItems.map(({ url, label }) => ({
          link: { type: 'custom', url, label, newTab: false },
        })),
      })),
    },
    context: ctx,
  })

  console.log('→ CMS: Service detail bodies (richtext from legacy site)')
  for (const [slug, paragraphs] of Object.entries(SERVICE_DETAIL_PARAGRAPHS)) {
    const { docs } = await payload.find({
      collection: 'services',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })
    if (!docs[0]) {
      console.warn(`  skip service (not in DB): ${slug}`)
      continue
    }

    const children: Record<string, unknown>[] = paragraphs.map((text) => pText(text))
    const description =
      paragraphs[0].length > 320 ? `${paragraphs[0].slice(0, 317)}…` : paragraphs[0]

    await payload.update({
      collection: 'services',
      id: docs[0].id,
      data: {
        description,
        content: lexicalRoot(children),
      },
      context: ctx,
    })
    console.log(`  updated service: ${slug}`)
  }
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('Set DATABASE_URL in .env')
    process.exit(1)
  }

  const payload = await getPayload({ config })
  await seedCmsFromLegacy(payload)
  console.log('CMS seed completed.')
  process.exit(0)
}

const isDirectRun = process.argv[1]?.includes('seed_cms_from_legacy')
if (isDirectRun) {
  main().catch((e) => {
    console.error(e)
    process.exit(1)
  })
}
