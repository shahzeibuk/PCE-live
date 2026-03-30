export type ServiceNavLink = {
  title: string
  href: string
}

/**
 * Services dropdown order and labels per marketing spec (docs/Chnages.md).
 * Merged with CMS: CMS entries override title for the same href when present.
 */
export const SERVICE_DROPDOWN_BASE: ServiceNavLink[] = [
  { title: 'Currency Exchange', href: '/services/currency-exchange' },
  { title: 'Western Union', href: '/services/western-union' },
  { title: 'MoneyGram', href: '/services/moneygram' },
  { title: 'Ria Money Transfer', href: '/services/ria-money-transfer' },
  { title: 'IME', href: '/services/ime' },
  { title: 'URemit', href: '/services/uremit' },
  { title: 'Speed Remit', href: '/services/speed-remit' },
  { title: 'HelloPaisa', href: '/services/hellopaisa' },
  { title: 'Aussie Forex & Finance', href: '/services/aussie-forex-finance' },
  { title: 'ARY Exchange', href: '/services/ary-exchange' },
  { title: 'Telegraphic Transfer', href: '/services/telegraphic-transfer' },
  { title: 'PRI (Pakistan Remittance Initiative)', href: '/services/pakistan-remittance-initiative' },
]

export function mergeServiceNavLinks(cmsLinks: ServiceNavLink[]): ServiceNavLink[] {
  const byHref = new Map<string, string>()
  for (const row of cmsLinks) {
    byHref.set(row.href, row.title)
  }
  return SERVICE_DROPDOWN_BASE.map((row) => ({
    href: row.href,
    title: byHref.get(row.href) ?? row.title,
  }))
}
