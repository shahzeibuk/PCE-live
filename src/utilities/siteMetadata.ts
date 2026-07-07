import type { Metadata } from 'next'

export const SITE_NAME = 'Pakistan Currency Exchange'

export const SITE_DEFAULT_TITLE = 'Live Currency Exchange Rates in Pakistan | Pakistan Currency Exchange'

export const NOT_FOUND_PAGE_TITLE = '404 | Live Currency Exchange Rates in Pakistan'

export const SITE_DESCRIPTION =
  'Check the latest USD, SAR, AED, and EUR to PKR open market exchange rates in Pakistan. Live forex rates, currency exchange, and remittance services nationwide.'

export function getNotFoundMetadata(): Metadata {
  return {
    title: {
      absolute: NOT_FOUND_PAGE_TITLE,
    },
  }
}

export function formatPageTitle(pageTitle?: string | null): string {
  if (pageTitle?.trim()) {
    return `${pageTitle.trim()} | ${SITE_NAME}`
  }
  return SITE_DEFAULT_TITLE
}
