/**
 * Partner logos in `public/partners/`. Paths are encoded for safe URLs (`&`, spaces).
 * Each logo links to its service page.
 */
export type PartnerLogo = {
  name: string
  /** Encoded path served from `public/partners/` */
  src: string
  href: string
}

function partnerFile(file: string): string {
  return `/partners/${encodeURIComponent(file)}`
}

export const PARTNER_LOGOS: PartnerLogo[] = [
  {
    name: 'Western Union',
    src: partnerFile('WU logo 2023.png'),
    href: '/services/western-union',
  },
  {
    name: 'MoneyGram',
    src: partnerFile('MoneyGram_Logo.png'),
    href: '/services/moneygram',
  },
  {
    name: 'Ria Money Transfer',
    src: partnerFile('Ria update logo.png'),
    href: '/services/ria-money-transfer',
  },
  {
    name: 'IME',
    src: partnerFile('IME Logo.png'),
    href: '/services/ime',
  },
  {
    name: 'URemit',
    src: partnerFile('URemit Logo.png'),
    href: '/services/uremit',
  },
  {
    name: 'Speed Remit',
    src: partnerFile('Speed Remit Logo.png'),
    href: '/services/speed-remit',
  },
  {
    name: 'HelloPaisa',
    src: partnerFile('HelloPaisa LOGO.jpg'),
    href: '/services/hellopaisa',
  },
  {
    name: 'Aussie Forex & Finance',
    src: partnerFile('Aussie Forex&Finance.png'),
    href: '/services/aussie-forex-finance',
  },
  {
    name: 'ARY Exchange',
    src: partnerFile('ARY EXCHANGE LOGO.jpg_page-0001.jpg'),
    href: '/services/ary-exchange',
  },
  {
    name: 'PRI (Pakistan Remittance Initiative)',
    src: partnerFile('PRI Logo.jpg'),
    href: '/services/pakistan-remittance-initiative',
  },
]

/** Lookup partner logo used on “Our Valued Partners” for a service slug. */
export function partnerLogoForServiceSlug(slug: string | null | undefined): PartnerLogo | null {
  if (!slug) return null
  const href = `/services/${slug}`
  return PARTNER_LOGOS.find((p) => p.href === href) ?? null
}

/** Duplicate list for carousels that need extra slides for smooth looping. */
export function partnerLogosForCarouselLoop(): PartnerLogo[] {
  return [...PARTNER_LOGOS, ...PARTNER_LOGOS]
}
