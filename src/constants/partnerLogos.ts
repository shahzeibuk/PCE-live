/**
 * Partner logos shipped in `public/partners/` (Next serves them at `/partners/...`).
 * Add or replace files there, then update this file so About, footer carousel, and other
 * sections stay in sync.
 */
export type PartnerLogo = {
  name: string
  /** Path under `public/` */
  src: `/partners/${string}`
}

export const PARTNER_LOGOS: PartnerLogo[] = [
  { name: 'Western Union', src: '/partners/westren-unoin.jpg' },
  { name: 'RIA', src: '/partners/ria.jpg' },
  { name: 'MoneyGram', src: '/partners/money.jpg' },
  { name: 'Aussie Forex', src: '/partners/Aussie02.jpg' },
]

/** Duplicate list for carousels that need extra slides for smooth looping. */
export function partnerLogosForCarouselLoop(): PartnerLogo[] {
  return [...PARTNER_LOGOS, ...PARTNER_LOGOS]
}
