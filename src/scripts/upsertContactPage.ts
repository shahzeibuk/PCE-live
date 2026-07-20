import type { Payload, PayloadRequest } from 'payload'

import { contactForm as contactFormSeed } from '../endpoints/seed/contact-form'
import { CONTACT_COPY } from './legacyCmsCopy'

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
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  }
}

function heading(tag: 'h1' | 'h2' | 'h3', text: string) {
  return {
    type: 'heading',
    tag,
    children: [tx(text)],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  }
}

function lexicalRoot(children: Record<string, unknown>[]) {
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

/** AI-written contact page body (two paragraphs + practical details). */
export const CONTACT_PAGE_PARAGRAPHS = [
  'Whether you need today’s exchange rates, help with a remittance pickup, or guidance on telegraphic transfers and documentation, Pakistan Currency Exchange is ready to assist. Our customer teams support walk-in visitors across our nationwide branch network and respond to enquiries by phone, email, and the form on this page.',
  'Share a few details about what you need—currency pairs, branch city, or transfer reference—and we will point you to the right next step. For the fastest in-person service, use our branch locator to find an outlet near you, or call our UAN / toll-free lines during business hours.',
] as const

function buildContactBodyLexical() {
  return lexicalRoot([
    heading('h2', 'We are here to help'),
    pText(CONTACT_PAGE_PARAGRAPHS[0]),
    pText(CONTACT_PAGE_PARAGRAPHS[1]),
    heading('h3', 'Head office'),
    pText(CONTACT_COPY.addressLine),
    heading('h3', 'Phone'),
    pText(`${CONTACT_COPY.phone} (UAN) · Toll-free ${CONTACT_COPY.tollFree}`),
    heading('h3', 'Email'),
    pText(CONTACT_COPY.email),
    pText('For branch-specific numbers and maps, visit the Branches page.'),
  ])
}

async function upsertContactForm(payload: Payload, req?: PayloadRequest): Promise<number> {
  const { docs } = await payload.find({
    collection: 'forms',
    where: { title: { equals: 'Contact Form' } },
    limit: 1,
    depth: 0,
    req,
  })

  const data = { ...contactFormSeed } as Record<string, unknown>
  delete data.createdAt
  delete data.updatedAt

  if (docs[0]) {
    const updated = await payload.update({
      collection: 'forms',
      id: docs[0].id,
      data: data as typeof contactFormSeed,
      context: ctx,
      req,
    })
    return updated.id as number
  }

  const created = await payload.create({
    collection: 'forms',
    data: data as typeof contactFormSeed,
    context: ctx,
    req,
  })
  return created.id as number
}

/**
 * Upserts published CMS page at slug `contact` → public URL `/contact`.
 */
export async function upsertContactPage(
  payload: Payload,
  req?: PayloadRequest,
): Promise<{ formId: number; pageId: number; created: boolean }> {
  const formId = await upsertContactForm(payload, req)

  const pageData = {
    title: 'Contact Us',
    slug: 'contact',
    generateSlug: false,
    _status: 'published' as const,
    publishedAt: new Date().toISOString(),
    meta: {
      title: CONTACT_COPY.metaTitle,
      description: CONTACT_COPY.metaDescription,
    },
    hero: {
      type: 'lowImpact' as const,
      richText: lexicalRoot([
        heading('h1', 'Contact Us'),
        pText(CONTACT_COPY.intro),
      ]),
      links: [
        {
          link: {
            type: 'custom' as const,
            url: '/branches',
            label: 'Find a branch',
            newTab: false,
          },
        },
        {
          link: {
            type: 'custom' as const,
            url: `tel:${CONTACT_COPY.tollFree.replace(/\D/g, '')}`,
            label: `Call ${CONTACT_COPY.tollFree}`,
            newTab: false,
          },
        },
      ],
    },
    layout: [
      {
        blockType: 'content' as const,
        columns: [
          {
            size: 'full' as const,
            richText: buildContactBodyLexical(),
            enableLink: false,
          },
        ],
      },
      {
        blockType: 'formBlock' as const,
        form: formId,
        enableIntro: true,
        introContent: lexicalRoot([
          heading('h2', 'Send us a message'),
          pText(
            'Fill in the form below and our team will get back to you as soon as possible during business hours.',
          ),
        ]),
      },
    ],
  }

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contact' } },
    limit: 1,
    depth: 0,
    req,
  })

  if (docs[0]) {
    const updated = await payload.update({
      collection: 'pages',
      id: docs[0].id,
      data: pageData,
      context: ctx,
      req,
    })
    return { formId, pageId: updated.id as number, created: false }
  }

  const created = await payload.create({
    collection: 'pages',
    data: pageData,
    context: ctx,
    req,
  })
  return { formId, pageId: created.id as number, created: true }
}

/** Ensure header nav includes Contact → /contact without wiping other items. */
export async function ensureContactNavLink(
  payload: Payload,
  req?: PayloadRequest,
): Promise<void> {
  const header = await payload.findGlobal({
    slug: 'header',
    depth: 0,
    req,
  })

  const navItems = Array.isArray(header?.navItems) ? [...header.navItems] : []
  const hasContact = navItems.some((item) => {
    const link = item?.link
    if (!link) return false
    if (link.type === 'custom' && link.url === '/contact') return true
    return (link.label || '').toLowerCase() === 'contact'
  })

  if (hasContact) return

  navItems.push({
    link: {
      type: 'custom',
      url: '/contact',
      label: 'Contact',
      newTab: false,
    },
  })

  await payload.updateGlobal({
    slug: 'header',
    data: { navItems },
    context: ctx,
    req,
  })
}
