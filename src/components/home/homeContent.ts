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

/** Full company intro lives on `/about`; homepage keeps a short CTA only. */
export const HOME_ABOUT = {
  heading: 'Your Trusted Currency Exchange & Remittance Partner in Pakistan',
  /** Shown in the about band next to copy (under `public/hero/`) */
  imageSrc: '/hero/about-ingo.png',
  paragraphs: [
    'Pakistan Currency Exchange is committed to providing secure, transparent, and reliable foreign currency exchange and remittance services across Pakistan. Whether you want to buy or sell foreign currency, receive funds from overseas, or check the latest open market forex rates, we are here to serve you with professionalism and trust. Whether you need to buy or sell foreign currency, check today’s open market exchange rates, or receive funds sent from abroad, Pakistan Currency Exchange is here to serve you with professionalism and care. We believe in customer trust, competitive market rates, and efficient service. By offering updated forex information and reliable remittance solutions, we help our customers manage their financial needs with confidence.',
  ],
  ctaLabel: 'Read our full story',
  ctaHref: '/about',
}

export const HOME_RATES_SECTION = {
  title: 'Today’s Open Market Currency Rates in Pakistan',
  paragraph:
    'Stay informed with the latest currency exchange rates in Pakistan. Check updated buy and sell rates for major international currencies including USD to PKR, SAR to PKR, AED to PKR, EUR to PKR, and GBP to PKR.',
  supporting:
    'Our live forex rates help you make better financial decisions for travel, Hajj, Umrah, study abroad, remittance, and personal exchange needs.',
  ctaLabel: 'View Full Rate List',
  /** Tab labels (Travelex-style “Popular foreign currency rates”) */
  popularTabLabel: 'Popular Forex Rates',
  otherTabLabel: 'Other quoted rates',
}

export const HOME_POPULAR_RATES_TITLE = 'Popular Forex Rates'

/** Travelex-style “Order your travel money online in minutes” section — three icon columns */
export const HOME_SERVICES_ORDER_SECTION = {
  heading: 'Choose how you want to use our services',
  intro:
    'From branch visits to live rates online, Pakistan Currency Exchange makes currency exchange and remittance straightforward—wherever you start.',
  /** Header band: right column image (`public/hero/`) */
  imageSrc: '/hero/our-services.png',
  cards: [
    {
      icon: 'branch' as const,
      title: 'Visit a branch',
      description:
        'Walk in to buy or sell major currencies, collect home remittance, and get in-person guidance from our team across Pakistan.',
      benefits: [
        'Competitive open-market buying and selling rates',
        '150+ branches for exchange and remittance support',
        'Same-day service for many requests',
      ],
      href: '/branches',
      ctaLabel: 'Locate branches',
    },
    {
      icon: 'rates' as const,
      title: 'Check rates online',
      description:
        'See today’s USD, SAR, AED, EUR, GBP and other PKR pairs before you visit—so you can plan travel, Hajj, Umrah, or transfers with confidence.',
      benefits: [
        'Updated open-market buy and sell figures',
        'Popular pairs highlighted for quick scanning',
        'Figures for reference—confirm at the branch before transacting',
      ],
      href: '/currency-rates',
      ctaLabel: 'View live rates',
    },
    {
      icon: 'support' as const,
      title: 'Help & specialist services',
      description:
        'Ask about transfers, documentation, or the best way to send or receive funds. We also support telegraphic transfers for education and business.',
      benefits: [
        'WhatsApp and phone support for quick answers',
        'Guidance on remittance and FX paperwork',
        'International TT for eligible overseas payments',
      ],
      href: '/contact',
      ctaLabel: 'Contact us',
    },
  ],
} as const

export const HOME_CLOSING_CTA = {
  heading: 'Need Help with Currency Exchange or Remittance?',
  text: 'Visit your nearest branch or contact Pakistan Currency Exchange today for reliable financial services.',
}

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

export const HOME_BRANCH = {
  heading: 'Find Your Nearest Branch',
  supporting: 'Our team is ready to help you with fast, secure, and professional service.',
  ctaLabel: 'Locate Branches',
  ctaHref: '/branches',
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
