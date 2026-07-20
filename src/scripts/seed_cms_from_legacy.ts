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
import { ABOUT_COPY, FOOTER_GROUPS, HEADER_NAV } from './legacyCmsCopy'
import { ensureContactNavLink, upsertContactPage } from './upsertContactPage'
import { upsertServicePartnerIcons } from './upsertServicePartnerIcons'
import { upsertServicePages } from './upsertServicePages'

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

export async function seedCmsFromLegacy(payload: Payload): Promise<void> {
  console.log('→ CMS: Contact page (/contact) + form')
  const contact = await upsertContactPage(payload)
  console.log(`  contact page ${contact.created ? 'created' : 'updated'} (id ${contact.pageId})`)
  await ensureContactNavLink(payload)

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

  console.log('→ CMS: Service detail pages')
  const { created, updated } = await upsertServicePages(payload)
  console.log(`  services: ${created} created, ${updated} updated`)

  console.log('→ CMS: Service partner icons from public/partners')
  const icons = await upsertServicePartnerIcons(payload)
  console.log(`  icons: ${icons.iconsAssigned} assigned, ${icons.skipped} skipped`)
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
