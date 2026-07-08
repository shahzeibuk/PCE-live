import type { Header } from '@/payload-types'
import { resolveMediaResourceUrl } from '@/utilities/normalizeStoredMediaPath'
import { TOLL_FREE_NUMBER, TOLL_FREE_TEL_HREF, UAN_NUMBER, UAN_TEL_HREF } from '@/constants/contact'

export const DEFAULT_HEADER_CONTACTS: {
  text: string
  telHref: string
  icon: 'phone' | 'mobile'
}[] = [
  { text: UAN_NUMBER, telHref: UAN_TEL_HREF, icon: 'phone' },
  { text: TOLL_FREE_NUMBER, telHref: TOLL_FREE_TEL_HREF, icon: 'phone' },
  { text: '0304-6668810', telHref: 'tel:03046668810', icon: 'mobile' },
]

export function mediaToLogoSrc(logo: Header['logo']): string | null {
  return resolveMediaResourceUrl(logo)
}

export function headerContactLines(data: Header | null): typeof DEFAULT_HEADER_CONTACTS {
  const rows = data?.contactLines
  if (rows && rows.length > 0) {
    const mapped = rows
      .map((row) => ({
        text: row.text?.trim() || '',
        telHref: row.telHref?.trim() || '',
        icon: row.icon === 'mobile' ? ('mobile' as const) : ('phone' as const),
      }))
      .filter((row) => row.text && row.telHref)
    if (mapped.length > 0) return mapped
  }
  return DEFAULT_HEADER_CONTACTS
}

export function headerCta(data: Header | null): { label: string; url: string } {
  const cta = data?.cta
  const label = (cta?.label ?? 'Get Live Rates').trim() || 'Get Live Rates'
  const url = (cta?.url ?? '/currency-rates').trim() || '/currency-rates'
  return { label, url }
}

export function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href)
}
