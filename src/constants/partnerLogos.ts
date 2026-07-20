/**
 * Partner logos in `public/partners/`. Paths are encoded for safe URLs (`&`, spaces).
 * Each logo links to its service page. `file` is the on-disk name used by migrations.
 */
export type PartnerLogo = {
  name: string
  /** Filename under `public/partners/` (may include spaces / &). */
  file: string
  /** Encoded path served from `public/partners/` */
  src: string
  href: string
  /** Matching services collection slug */
  serviceSlug: string
}

function partnerFile(file: string): string {
  return `/partners/${encodeURIComponent(file)}`
}

function partner(name: string, file: string, serviceSlug: string): PartnerLogo {
  return {
    name,
    file,
    src: partnerFile(file),
    href: `/services/${serviceSlug}`,
    serviceSlug,
  }
}

export const PARTNER_LOGOS: PartnerLogo[] = [
  partner('Western Union', 'WU logo 2023.png', 'western-union'),
  partner('MoneyGram', 'MoneyGram_Logo.png', 'moneygram'),
  partner('Ria Money Transfer', 'Ria update logo.png', 'ria-money-transfer'),
  partner('IME', 'IME Logo.png', 'ime'),
  partner('URemit', 'URemit Logo.png', 'uremit'),
  partner('Speed Remit', 'Speed Remit Logo.png', 'speed-remit'),
  partner('HelloPaisa', 'HelloPaisa LOGO.jpg', 'hellopaisa'),
  partner('Aussie Forex & Finance', 'Aussie Forex&Finance.png', 'aussie-forex-finance'),
  partner('ARY Exchange', 'ARY EXCHANGE LOGO.jpg_page-0001.jpg', 'ary-exchange'),
  partner('PRI (Pakistan Remittance Initiative)', 'PRI Logo.jpg', 'pakistan-remittance-initiative'),
]

/** Lookup partner logo used on “Our Valued Partners” for a service slug. */
export function partnerLogoForServiceSlug(slug: string | null | undefined): PartnerLogo | null {
  if (!slug) return null
  return PARTNER_LOGOS.find((p) => p.serviceSlug === slug) ?? null
}

/** Duplicate list for carousels that need extra slides for smooth looping. */
export function partnerLogosForCarouselLoop(): PartnerLogo[] {
  return [...PARTNER_LOGOS, ...PARTNER_LOGOS]
}
