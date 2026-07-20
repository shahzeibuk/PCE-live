/**
 * Marketing copy distilled from https://www.pakistancurrency.com/
 * (company profile, product pages, contact). Stored via Payload seed — not scraped at runtime.
 */

import { SERVICE_PAGES_SEED } from './servicesPagesSeed'

export const ABOUT_COPY = {
  metaTitle: 'About Us | Pakistan Currency Exchange',
  metaDescription:
    'Pakistan Currency Exchange (Pvt) Ltd. — SBP-licensed exchange company, nationwide branches, remittance and currency services since 2003.',
  heroTitle: 'About Pakistan Currency Exchange',
  heroLead:
    'We are an exchange company and part of Bostan Group, offering regulated currency exchange and remittance services aligned with State Bank of Pakistan expectations.',
  sections: [
    {
      heading: 'Your Trusted Currency Exchange & Remittance Partner in Pakistan',
      paragraphs: [
        'Pakistan Currency Exchange is committed to providing secure, transparent, and reliable foreign currency exchange and remittance services across Pakistan. Whether you want to buy or sell foreign currency, receive funds from overseas, or check the latest open market forex rates, we are here to serve you with professionalism and trust.',
        'Whether you need to buy or sell foreign currency, check today’s open market exchange rates, or receive funds sent from abroad, Pakistan Currency Exchange is here to serve you with professionalism and care.',
        'We believe in customer trust, competitive market rates, and efficient service. By offering updated forex information and reliable remittance solutions, we help our customers manage their financial needs with confidence.',
      ],
    },
    {
      heading: 'Company profile',
      paragraphs: [
        'Pakistan Currency Exchange (Pvt) dates back to 1992, but the idea of a full-service platform took shape on 20 June 2003 under the Companies Ordinance 1984, following Exchange Company reforms. Everything we offer under PCE is operated in line with State Bank of Pakistan rules.',
        'Whether it is safety, compliance, or reliability for remittance and money changing, PCE focuses on a straightforward experience at the counter. We know sending and receiving money is emotional—not just a transaction—so we prioritise convenience, clear requirements, and professional service.',
        'Our network has expanded to 150+ branch locations across Pakistan, improving access for customers and supporting our brand as a trusted exchange company.',
      ],
    },
    {
      heading: 'Regulatory history',
      paragraphs: [
        'Pakistan Currency Exchange (Pvt) Ltd. was incorporated on 20 June 2003 in Karachi. Decades ago, large numbers of Pakistani workers moved to the Middle East, Europe, and North America; remittances grew and the money-changing sector was formalised. The State Bank authorised money changers in 1991; Bostan International was incorporated on 30 December 1992 and continued money-changing operations.',
        'Under SBP Circular FE No. 9 of 30 July 2002 (Foreign Exchange Regulation Act reforms), exchange companies were required to replace the previous authorised-money-changer framework, with a final transition date of 30 July 2004. Pakistan Currency Exchange Company (Pvt) Ltd. was established to operate in that new environment.',
        'SECP issued Certificate of Incorporation K-09411 (2002–2003). The State Bank issued Exchange Company Licence No. 13 (letter EPD/9180/24(31) EC-/2003 dated 14 November 2004), renewable on a periodic basis as prescribed.',
      ],
    },
    {
      heading: 'Leadership',
      paragraphs: [
        'Imran Ali Bostan – Director',
        'Malik Tahir Abbas – Director',
        'Maj (R) Khizar Hayat Khan – Director, Chief Executive Officer',
      ],
    },
    {
      heading: 'Mission & vision',
      paragraphs: [
        'We aim to provide clear procedures and authentic services—with accuracy, security, reliability, and convenience for every customer.',
        'We follow industry norms for exchange and transfers, and work to deliver service promptly while applying sound financial practice. PCE remits money in a manner that is reliable, secure, and convenient, with transparency and dedication, alongside recognised international remittance partners.',
      ],
    },
  ],
}

export const CONTACT_COPY = {
  metaTitle: 'Contact Us | Pakistan Currency Exchange',
  metaDescription:
    'Contact Pakistan Currency Exchange — head office on Main Shahrah-e-Faisal, Karachi. Phone 111-242-242, email info@pakistancurrency.com, toll-free 0800-13537.',
  heroTitle: 'Contact us',
  intro:
    'For any information, reach out through the form below, call us, or visit a branch. We also recommend our branch locator for the nearest outlet.',
  addressLine:
    'Office 7, 8, 9 Al-Rasheed Chamber, Block 6, 12/A P.E.C.H.S., Main Shahrah-e-Faisal, Karachi.',
  phone: '111 242 242',
  tollFree: '0800-13537',
  email: 'info@pakistancurrency.com',
}

/** Service slug → two body paragraphs (sourced from servicesPagesSeed). */
export const SERVICE_DETAIL_PARAGRAPHS: Record<string, string[]> = Object.fromEntries(
  SERVICE_PAGES_SEED.map((s) => [s.slug, [...s.paragraphs]]),
)

export const HEADER_NAV: { url: string; label: string }[] = [
  { url: '/', label: 'Home' },
  { url: '/about', label: 'About Us' },
  { url: '/services', label: 'Services' },
  { url: '/branches', label: 'Branches' },
  { url: '/currency-rates', label: 'Live Rates' },
  { url: '/posts', label: 'Blog' },
  { url: '/contact', label: 'Contact' },
]

/** Footer column groups — mirrors legacy “About / Product & Services” structure. */
export const FOOTER_GROUPS: {
  label: string
  navItems: { url: string; label: string }[]
}[] = [
  {
    label: 'About us',
    navItems: [
      { url: '/about', label: 'Company profile' },
      { url: '/branches', label: 'Locate us' },
      { url: '/contact', label: 'Contact us' },
    ],
  },
  {
    label: 'Products & services',
    navItems: [
      { url: '/services', label: 'All services' },
      { url: '/services/western-union', label: 'Western Union' },
      { url: '/services/currency-exchange', label: 'Currency exchange' },
      { url: '/currency-rates', label: 'Live rates' },
      { url: '/posts', label: 'Blog' },
    ],
  },
  {
    label: 'Customer desk',
    navItems: [
      { url: '/contact', label: 'Complaints & feedback' },
      { url: 'tel:080013537', label: 'Toll-free 0800-13537' },
    ],
  },
]
