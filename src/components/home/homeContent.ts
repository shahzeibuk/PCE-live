/** Homepage marketing copy — docs/Chnages.md */

/** Section headings on the homepage (below hero): weight 900, brand ink */
export const HOME_INDEX_HEADING_CLASS = 'font-black text-[#2a313c]'

export const HOME_HERO = {
  eyebrow: 'Pakistan Currency Exchange',
  h1: 'Live Currency Exchange Rates in Pakistan',
  h1Accent: '',
  /** Shown below `sm` so the hero stays scannable on small phones */
  leadShort: 'Live USD–PKR and major forex rates, plus exchange and remittance across Pakistan.',
  lead: 'Check live USD, SAR, AED, EUR and GBP to PKR open-market rates, currency exchange, and trusted remittance services across our branch network.',
}

/** One homepage hero slide (image + copy move together in the header carousel). */
export type HomeHeroCarouselSlide = {
  imageSrc: string
  eyebrow: string
  h1: string
  leadShort: string
  lead: string
}

/** Homepage hero under the header: light panel + synced slides (`image-bg-001` first, then banknote art). */
export const HOME_HERO_CAROUSEL = {
  primaryCta: { label: "Check Today's Rates", href: '/currency-rates' as const },
  secondaryCta: {
    label: 'WhatsApp for Best Rate',
    href: 'https://wa.me/923046668810' as const,
    external: true as const,
  },
  slides: [
    {
      imageSrc: '/hero/image-bg-001.png',
      eyebrow: HOME_HERO.eyebrow,
      h1: HOME_HERO.h1,
      leadShort: HOME_HERO.leadShort,
      lead: HOME_HERO.lead,
    },
    {
      imageSrc: '/hero/W6qgc.jpg',
      eyebrow: HOME_HERO.eyebrow,
      h1: 'Trusted currency exchange & remittance',
      leadShort:
        'Buy and sell major currencies with competitive open-market rates at branches across Pakistan.',
      lead: 'From USD and SAR to EUR and GBP, we help you plan travel, transfers, and everyday FX with professional in-branch support.',
    },
    {
      imageSrc: '/hero/wLlhs.jpg',
      eyebrow: HOME_HERO.eyebrow,
      h1: '150+ branches nationwide',
      leadShort: 'Walk in for rates, documentation help, and remittance collection wherever you are in Pakistan.',
      lead: 'Our network is built for convenience—same-day service on many requests, with guidance from trained staff at every step.',
    },
    {
      imageSrc: '/hero/HFel9.jpg',
      eyebrow: HOME_HERO.eyebrow,
      h1: 'Live rates. Transparent service.',
      leadShort: 'See popular PKR pairs online before you visit—USD, SAR, AED, EUR, GBP and more.',
      lead: 'Figures are for reference; confirm at your nearest branch before you transact. We focus on clarity and fair dealing.',
    },
    {
      imageSrc: '/hero/i82qk.jpg',
      eyebrow: HOME_HERO.eyebrow,
      h1: 'Travel, study, Hajj & Umrah',
      leadShort: 'Currency for pilgrimage, education abroad, and personal travel—talk to us about the right product.',
      lead: 'Whether you need riyals, dollars, or support for international study payments, we will walk you through the options.',
    },
    {
      imageSrc: '/hero/LHopV.jpg',
      eyebrow: HOME_HERO.eyebrow,
      h1: 'Message us for today’s best rate',
      leadShort: 'Quick answers on WhatsApp—ask about pairs, branches, or what to bring for your visit.',
      lead: 'Our team replies during business hours so you can compare and plan before you head to a Pakistan Currency Exchange outlet.',
    },
  ] satisfies readonly HomeHeroCarouselSlide[],
} as const

export const HOME_RATES_SECTION = {
  title: 'Today’s Open Market Currency Rates in Pakistan',
  description:
    'Stay informed with the latest buy and sell rates for major currencies (USD, SAR, AED, EUR, GBP to PKR and more). Figures are for reference—confirm at your branch before transacting.',
  ctaLabel: 'View Full Rate List',
  /** Tab labels (Travelex-style “Popular foreign currency rates”) */
  popularTabLabel: 'Popular Forex Rates',
  otherTabLabel: 'Other quoted rates',
}

export const HOME_POPULAR_RATES_TITLE = 'Popular Forex Rates'

/** Homepage service boxes: three across, then two centered (md+). Fallback when CMS global is empty. */
export const HOME_SERVICES_ORDER_SECTION = {
  heading: 'Our services',
  description:
    'Currency exchange, live rates, remittance, and support—online and at branches across Pakistan.',
  boxes: [
    {
      imageSrc: '/service-icons/branch.svg',
      title: 'Visit a branch',
      description: 'Buy and sell currency, collect remittance, and get in-person help at 150+ locations across Pakistan.',
      href: '/branches',
      ctaLabel: 'Locate branches',
    },
    {
      imageSrc: '/service-icons/rates.svg',
      title: 'Live exchange rates',
      description: 'Check today’s open-market buy and sell figures for USD, SAR, AED, EUR, GBP and more against PKR.',
      href: '/currency-rates',
      ctaLabel: 'View rates',
    },
    {
      imageSrc: '/service-icons/services.svg',
      title: 'What we offer',
      description: 'Explore currency exchange, remittance, telegraphic transfers, and other solutions we provide.',
      href: '/services',
      ctaLabel: 'Browse services',
    },
    {
      imageSrc: '/service-icons/remittance.svg',
      title: 'Home remittance',
      description: 'Receive funds from abroad safely through our branch network with clear guidance at every step.',
      href: '/contact',
      ctaLabel: 'Learn more',
    },
    {
      imageSrc: '/service-icons/support.svg',
      title: 'Help & contact',
      description: 'Questions about rates, paperwork, or transfers? Reach our team by phone, email, or WhatsApp.',
      href: '/contact',
      ctaLabel: 'Contact us',
    },
  ],
} as const

/** Travelex-style “Money Card” band: headline + tagline + icon list + image */
export const HOME_WHY_US = {
  heading: 'Why Choose Pakistan Currency Exchange?',
  subheading: 'A smarter way to buy, sell, and receive currency across Pakistan.',
  imageSrc: '/hero/company.jpeg',
  items: [
    { icon: 'shield' as const, text: 'Trusted and professional service' },
    { icon: 'trending' as const, text: 'Competitive open market currency rates' },
    { icon: 'lock' as const, text: 'Secure and reliable remittance solutions' },
    { icon: 'zap' as const, text: 'Quick and convenient transactions' },
    { icon: 'users' as const, text: 'Customer-focused support' },
    { icon: 'map' as const, text: 'Branch network across Pakistan' },
  ],
  footer:
    'We are dedicated to making your currency exchange and remittance experience smooth, secure, and hassle-free.',
}

/** Travelex-style “Trusted travel money” band: headline, tagline, large stat tiles */
export const HOME_TRUST = {
  heading: 'Reliable Currency Exchange Services You Can Trust',
  subheading:
    'Customers across Pakistan and around the world choose Pakistan Currency Exchange for transparent rates, secure remittance, and dependable service.',
  /** `target` is the number animated from 0; `suffix` is appended after (e.g. +, M+) */
  stats: [
    { target: 25, suffix: '+', label: "Years' expertise" },
    { target: 150, suffix: '+', label: 'Branches across Pakistan' },
    { target: 10, suffix: 'M+', label: 'Trusted customers worldwide' },
  ] as const,
  footnote:
    'Figures reflect our commitment to scale and experience; visit a branch or contact us for services available in your area.',
}

/** Travelex-style “Upgrade your travel money” band — email + CTA + find out more */
export const HOME_CONTACT = {
  heading: 'Get in Touch',
  paragraph:
    'Have a question about today’s exchange rates, remittance services, or branch locations? Drop your email and we’ll help you get the answers you need—fast.',
  contactEmail: 'info@pakistancurrency.com',
  inputPlaceholder: 'Email address',
  primaryCta: 'Send enquiry',
  findOutMoreLabel: 'Find out more',
  findOutMoreHref: '/contact',
  footnote:
    'We use your details only to respond to your enquiry. Visit our contact page for branch details and other ways to reach us.',
  /** Shown under “Or reach us directly” on the homepage contact section */
  reachUsDirect: [
    { label: 'Find near branch', href: '/branches' },
    { label: 'WhatsApp us', href: 'https://wa.me/923046668810', external: true as const },
    { label: 'Submit a complaint', href: '/complaints-feedback' },
  ] as const,
}

export const FOOTER_COMPANY_BLURB =
  'Pakistan Currency Exchange offers reliable foreign currency exchange, live forex rates, and home remittance services in Pakistan. Stay updated with today’s open market exchange rates and trusted financial solutions.'

export const HOME_FAQ = {
  heading: 'Frequently Asked Questions (FAQs)',
  subheading: 'Pakistan Currency Exchange',
  items: [
    {
      q: 'How can I check today’s currency exchange rates in Pakistan?',
      a: 'You can check today’s latest currency exchange rates in Pakistan by visiting the Pakistan Currency Exchange website or by contacting your nearest branch. We provide updated rates for major currencies including USD, SAR, AED, EUR, GBP, and more.',
    },
    {
      q: 'Where can I exchange foreign currency in Pakistan?',
      a: 'You can exchange foreign currency through Pakistan Currency Exchange branches across Pakistan. We offer secure and convenient buying and selling of major foreign currencies with competitive market rates and professional customer service.',
    },
    {
      q: 'Does Pakistan Currency Exchange offer remittance services?',
      a: 'Yes, Pakistan Currency Exchange offers reliable and convenient home remittance services through its nationwide branch network. Customers can receive international remittances safely and efficiently from our selected branches.',
    },
    {
      q: 'Can I Convert  abroad through Pakistan Currency Exchange?',
      a: 'Yes, you can Convert  abroad through Pakistan Currency Exchange using our trusted international transfer and telegraphic transfer services, subject to applicable regulations and required documentation.',
    },
    {
      q: 'How can I find the nearest Pakistan Currency Exchange branch?',
      a: 'You can find your nearest Pakistan Currency Exchange branch by visiting our Branch Locator section on the website or by contacting our customer support team for assistance and branch details.',
    },
    {
      q: 'How can I pay my foreign university fee from Pakistan?',
      a: 'You can pay your foreign university fee from Pakistan through Pakistan Currency Exchange using our secure Foreign Telegraphic Transfer (TT) service. Students and parents can visit any of our branches nationwide with the required documents to process their international education payment conveniently.',
    },
    {
      q: 'From where can I pay my study abroad or student visa related expenses?',
      a: 'You can pay your study abroad related expenses, including eligible student payments and education-related transfers, through Pakistan Currency Exchange by visiting your nearest branch and using our international transfer services.',
    },
    {
      q: 'How can I send personal expenses abroad from Pakistan?',
      a: 'You can send your personal expenses abroad from Pakistan through Pakistan Currency Exchange’s fast and trusted transfer services. Simply visit your nearest branch with the required documents, and our team will guide you through the process.',
    },
    {
      q: 'Where can I buy Saudi Riyal for Hajj or Umrah in Pakistan?',
      a: 'You can buy Saudi Riyal for Hajj or Umrah in Pakistan from Pakistan Currency Exchange, your trusted foreign exchange partner. We offer competitive exchange rates, reliable service, and professional customer support through our branch network.',
    },
    {
      q: 'Which currency exchange offers good Saudi Riyal rates in Pakistan?',
      a: 'Pakistan Currency Exchange offers competitive Saudi Riyal exchange rates in Pakistan for customers traveling for Hajj, Umrah, business, or personal travel. Visit your nearest branch for the latest rates and availability.',
    },
    {
      q: 'Can I buy US Dollars, Saudi Riyal, UAE Dirhams, Euros, and Pounds from Pakistan Currency Exchange?',
      a: 'Yes, you can buy and exchange major foreign currencies such as US Dollar (USD), Saudi Riyal (SAR), UAE Dirham (AED), Euro (EUR), and British Pound (GBP) from Pakistan Currency Exchange, subject to applicable requirements.',
    },
    {
      q: 'Is Pakistan Currency Exchange a trusted foreign exchange company in Pakistan?',
      a: 'Yes, Pakistan Currency Exchange is a trusted name for currency exchange, remittance, and international payment services in Pakistan. We are committed to providing customers with secure transactions, competitive rates, and quality service.',
    },
    {
      q: 'Can overseas Pakistanis send remittance to their families through Pakistan Currency Exchange?',
      a: 'Yes, overseas Pakistanis can send home remittance to their families in Pakistan through supported remittance channels, and beneficiaries can receive their payments through Pakistan Currency Exchange branches where applicable.',
    },
    {
      q: 'What documents are required for foreign currency exchange or international transfer?',
      a: 'The required documents may vary depending on the service, but generally customers may need a valid CNIC, passport, visa, travel documents, admission letter, invoice, or supporting payment documents where applicable. Please visit your nearest branch for complete guidance.',
    },
    {
      q: 'Why choose Pakistan Currency Exchange for foreign exchange services?',
      a: 'Customers choose Pakistan Currency Exchange for its competitive rates, trusted service, nationwide branch network, secure transactions, and customer-focused support for foreign currency exchange, remittance, and international payments.',
    },
  ],
}
