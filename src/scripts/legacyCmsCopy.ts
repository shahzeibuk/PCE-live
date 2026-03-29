/**
 * Marketing copy distilled from https://www.pakistancurrency.com/
 * (company profile, product pages, contact). Stored via Payload seed — not scraped at runtime.
 */

export const ABOUT_COPY = {
  metaTitle: 'About Us | Pakistan Currency Exchange',
  metaDescription:
    'Pakistan Currency Exchange (Pvt) Ltd. — SBP-licensed exchange company, nationwide branches, remittance and currency services since 2003.',
  heroTitle: 'About Pakistan Currency Exchange',
  heroLead:
    'We are an exchange company and part of Bostan Group, offering regulated currency exchange and remittance services aligned with State Bank of Pakistan expectations.',
  sections: [
    {
      heading: 'Company profile',
      paragraphs: [
        'Pakistan Currency Exchange (Pvt) dates back to 1992, but the idea of a full-service platform took shape on 20 June 2003 under the Companies Ordinance 1984, following Exchange Company reforms. Everything we offer under PCE is operated in line with State Bank of Pakistan rules.',
        'Whether it is safety, compliance, or reliability for remittance and money changing, PCE focuses on a straightforward experience at the counter. We know sending and receiving money is emotional—not just a transaction—so we prioritise convenience, clear requirements, and professional service.',
        'Our network has expanded to well over a hundred branch locations across Pakistan, improving access for customers and supporting our brand as a trusted exchange company.',
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

/** Service slug → body paragraphs (legacy product pages, lorem and duplicates removed). */
export const SERVICE_DETAIL_PARAGRAPHS: Record<string, string[]> = {
  'western-union': [
    'Pakistan Currency Exchange offers Western Union send and receive services at branches nationwide—one of the most recognised ways to move money globally.',
    "Western Union's goal is to make cross-border money movement easier for people and businesses, with a network spanning a large number of countries. PCE helps you send or receive at a convenient location, with staff to guide you through ID and compliance steps.",
    'Western Union has served millions of customers for many years. As a major agent network in Pakistan, PCE focuses on safe handling of your transaction and clear communication so funds reach the right beneficiary.',
  ],
  moneygram: [
    'MoneyGram is a global provider of fund transfer and payment services, built around speed and security for people who support family and friends abroad.',
    'Customers worldwide rely on MoneyGram for quick transfers. The company invests heavily in security and compliance so services are used for legitimate purposes—and Pakistan Currency Exchange brings that channel to our counters with trained staff.',
    'MoneyGram emphasises a straightforward experience: fewer complications, fast service, and reliability at retail partner locations—including PCE branches across Pakistan.',
  ],
  'ria-money-transfer': [
    'Ria helps you receive money from abroad with broad global coverage, built around the idea that transfers matter as much as the relationships behind them.',
    'Ria offers digital and cash payout options in many corridors. Visit a Pakistan Currency Exchange branch for send or receive, subject to ID and regulatory requirements.',
    'Founded in 1987 and part of Euronet Worldwide, Ria operates a large international network of payout locations so beneficiaries can collect funds with PIN and valid ID where cash pickup is available.',
  ],
  'currency-exchange': [
    'Whether you travel for business or leisure, Pakistan Currency Exchange buys and sells major currencies with transparent, competitive open-market pricing.',
    'We deal in Saudi Riyal, UAE Dirham, US Dollar, Pound, Euro, and many other currencies. Our nationwide outlet network is built to serve you quickly and professionally.',
    'We aim for a hassle-free transaction: authenticate notes, confirm rates, complete KYC as required, and settle with clear documentation—so your experience is smooth and dependable.',
  ],
  'telegraphic-transfer': [
    'Telegraphic transfer (TT) is a secure way to send funds to an overseas bank account—for education fees, family support, invoices, or other approved purposes.',
    'PCE uses electronic banking channels with correspondent partners. Limits and documentation follow State Bank of Pakistan rules; our staff explain requirements before you book a transfer.',
    'TT suits customers who need bank-to-bank settlement with traceable instructions. Ask any branch for cut-off timings, charges, and beneficiary details format.',
  ],
  'demand-draft': [
    'Demand drafts help pay university and institutional fees abroad when the beneficiary requires a guaranteed bank instrument.',
    'Pakistan Currency Exchange works with correspondent banks so you can issue drafts in supported currencies, with guidance on beneficiary name, amount, and delivery or courier.',
    'We aim to reduce confusion: bring valid ID and institution instructions, and our team will walk you through issuance timelines and charges.',
  ],
  'pakistan-remittance-initiative': [
    'Pakistan Currency Exchange supports formal remittance flows that align with national initiatives encouraging documented inflows and consumer protection.',
    'Use authorised channels and licensed partners so your transfer is recorded appropriately and beneficiaries receive funds safely.',
    'Visit any branch for product options (cash pickup, account credit where available) and compliance steps for your corridor.',
  ],
}

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
