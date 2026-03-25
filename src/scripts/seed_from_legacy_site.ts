/**
 * One-shot import from pakistancurrency.com legacy data:
 * - branches_data.json (run `node scripts/scrape_branches.js` first)
 * - services + testimonials aligned with the public marketing site
 *
 * Usage: pnpm exec tsx src/scripts/seed_from_legacy_site.ts
 */
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'

import config from '../payload.config'
import { seedBranches } from './seed_branches'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const repoRoot = path.resolve(dirname, '../..')

function lexicalParagraph(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text,
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

/** Copy adapted from https://www.pakistancurrency.com/ “Our Product” section. */
const LEGACY_SERVICES: Array<{
  title: string
  slug: string
  short_description: string
  description: string
  process_steps: { step: string }[]
  benefits: { benefit: string }[]
  body: string
}> = [
  {
    title: 'Western Union',
    slug: 'western-union',
    short_description:
      'Receive and send money online with one of the most reliable transfer networks.',
    description:
      'An easy way to receive and send money to your loved ones online with a globally trusted transfer company.',
    process_steps: [
      { step: 'Visit a PCE branch with valid ID' },
      { step: 'Provide sender/receiver details or MTCN' },
      { step: 'Collect or send funds securely' },
    ],
    benefits: [
      { benefit: 'Worldwide payout locations' },
      { benefit: 'Fast cash pickup' },
      { benefit: 'Licensed agent support' },
    ],
    body: 'Western Union offers a simple way to receive and send money to family and friends through Pakistan Currency Exchange branches nationwide.',
  },
  {
    title: 'MoneyGram',
    slug: 'moneygram',
    short_description: 'Send money globally with a provider known for reliability and speed.',
    description:
      'Save time by sending money worldwide with a well-known transfer company built for dependable, near real-time transfers.',
    process_steps: [
      { step: 'Choose amount and destination' },
      { step: 'Complete KYC at the branch' },
      { step: 'Share reference with the beneficiary' },
    ],
    benefits: [
      { benefit: 'Broad international reach' },
      { benefit: 'Straightforward branch process' },
      { benefit: 'Helpful staff at every step' },
    ],
    body: 'MoneyGram helps you move funds internationally quickly while our staff ensures a smooth experience at the counter.',
  },
  {
    title: 'RIA Money Transfer',
    slug: 'ria-money-transfer',
    short_description: 'Send or receive funds when it matters—supported round the clock by our network.',
    description:
      'Transfer money conveniently whenever you need it, with fast fund-receiving options from around the world.',
    process_steps: [
      { step: 'Bring ID and transaction details' },
      { step: 'Confirm payout method' },
      { step: 'Complete transfer or pickup' },
    ],
    benefits: [
      { benefit: 'Competitive corridors' },
      { benefit: 'Efficient counter service' },
      { benefit: 'Part of global receive network' },
    ],
    body: 'RIA focuses on quick fund-receiving solutions globally; Pakistan Currency Exchange brings that access to our branches.',
  },
  {
    title: 'Currency Exchange',
    slug: 'currency-exchange',
    short_description: 'Buy and sell major currencies at competitive open-market rates.',
    description:
      'Our nationwide branch network is built to deliver dependable currency exchange with transparent pricing.',
    process_steps: [
      { step: 'Visit any PCE branch' },
      { step: 'Present original CNIC / ID' },
      { step: 'Lock rate and complete settlement' },
    ],
    benefits: [
      { benefit: 'Major currency pairs' },
      { benefit: 'Competitive retail spreads' },
      { benefit: 'Professional, compliant desk' },
    ],
    body: 'We buy and sell foreign currency for travelers, families, and businesses—with rates aligned to market movement and SBP-compliant processes.',
  },
  {
    title: 'Telegraphic Transfer',
    slug: 'telegraphic-transfer',
    short_description: 'Secure electronic transfers to overseas bank accounts.',
    description:
      'A trusted way to send tuition, rent, invoices, or family support straight to a bank account abroad.',
    process_steps: [
      { step: 'Share beneficiary bank details' },
      { step: 'Fund the transfer at branch' },
      { step: 'Track SWIFT / credit confirmation' },
    ],
    benefits: [
      { benefit: 'Suitable for larger amounts' },
      { benefit: 'Correspondent banking partners' },
      { benefit: 'Clear fee disclosure' },
    ],
    body: 'Telegraphic transfers move funds electronically to overseas accounts—ideal when you need bank-to-bank settlement with full documentation.',
  },
  {
    title: 'Demand Draft',
    slug: 'demand-draft',
    short_description: 'Bank drafts for university fees, immigration, and official payments abroad.',
    description:
      'Avoid repeated bank queues—issue a demand draft in major currencies for institutions that require guaranteed instruments.',
    process_steps: [
      { step: 'Provide beneficiary and amount' },
      { step: 'Settle PKR / FX requirement' },
      { step: 'Receive draft for courier or submission' },
    ],
    benefits: [
      { benefit: 'Accepted by many institutions' },
      { benefit: 'Issue across key currencies' },
      { benefit: 'Guidance from branch staff' },
    ],
    body: 'Demand drafts remain a preferred payment method for many foreign universities and authorities; we issue drafts with clear timelines and support.',
  },
  {
    title: 'Pakistan Remittance Initiative',
    slug: 'pakistan-remittance-initiative',
    short_description: 'Formal inbound remittance channels promoted under national initiatives.',
    description:
      'Receive overseas remittances through regulated channels that support documentation, transparency, and beneficiary protection.',
    process_steps: [
      { step: 'Confirm corridor and partner' },
      { step: 'Provide valid ID for payout' },
      { step: 'Collect proceeds per policy' },
    ],
    benefits: [
      { benefit: 'Regulated receive path' },
      { benefit: 'Works with licensed operators' },
      { benefit: 'Nationwide branch access' },
    ],
    body: 'We support compliant remittance flows benefiting Pakistani families and align desk procedures with applicable rules and partner requirements.',
  },
]

const LEGACY_TESTIMONIALS = [
  {
    name: 'Mr. Ali Baig',
    position: 'Customer',
    testimonial:
      'I am extremely impressed with the services they have — I find it really quick and easy whether you have a bank account or not.',
  },
  {
    name: 'Mr. Urooj',
    position: 'Customer',
    testimonial:
      "Now it's easy to transfer money to my family because it's online and I don't need to step out to get it done. It saves time also.",
  },
  {
    name: 'Mr. Zaid',
    position: 'Customer',
    testimonial:
      'Whenever I plan vacations abroad I make sure to get the currency exchanged through PCE because they offer better prices than many market options.',
  },
  {
    name: 'Mr. Mohsin',
    position: 'Customer',
    testimonial:
      'What more could you ask for when you can receive money faster and easier than ever — it makes my regular transfers efficient.',
  },
]

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('Set DATABASE_URL in .env')
    process.exit(1)
  }

  const jsonPath = path.join(repoRoot, 'branches_data.json')
  if (!fs.existsSync(jsonPath)) {
    console.error('Missing branches_data.json — run: node scripts/scrape_branches.js')
    process.exit(1)
  }

  const payload = await getPayload({ config })

  console.log('→ Branches (replace all from JSON)')
  await seedBranches(payload, { replace: true })

  console.log('→ Services (replace with legacy-site-aligned set)')
  await payload.delete({
    collection: 'services',
    where: { id: { exists: true } },
  })
  for (const s of LEGACY_SERVICES) {
    await payload.create({
      collection: 'services',
      data: {
        title: s.title,
        slug: s.slug,
        short_description: s.short_description,
        description: s.description,
        process_steps: s.process_steps,
        benefits: s.benefits,
        content: lexicalParagraph(s.body),
        cta_text: 'Contact us',
        cta_link: '/contact',
      },
    })
    console.log(`  created service: ${s.slug}`)
  }

  console.log('→ Testimonials (replace)')
  await payload.delete({
    collection: 'testimonials',
    where: { id: { exists: true } },
  })
  for (const t of LEGACY_TESTIMONIALS) {
    await payload.create({
      collection: 'testimonials',
      data: t,
    })
    console.log(`  created testimonial: ${t.name}`)
  }

  console.log('Done.')
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
