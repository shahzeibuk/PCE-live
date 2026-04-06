import Link from 'next/link'
import React from 'react'
import { Banknote, Globe2, Home, Phone, MessageCircle, MapPin, ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  HOME_ABOUT,
  HOME_BRANCH,
  HOME_CLOSING_CTA,
  HOME_CONTACT,
  HOME_FAQ,
  HOME_MAIN_SERVICES,
  HOME_REMITTANCE,
  HOME_SERVICES_FOUR,
  HOME_TRUST,
  HOME_WHY_US,
} from '@/components/home/homeContent'

function MainServiceIcon({ kind }: { kind: 'exchange' | 'remittance' | 'tt' }) {
  const cls = 'h-10 w-10 text-[#099546]'
  if (kind === 'exchange') return <Banknote className={cls} aria-hidden />
  if (kind === 'remittance') return <Home className={cls} aria-hidden />
  return <Globe2 className={cls} aria-hidden />
}

export function HomeAboutSection() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-14 md:py-20" aria-labelledby="home-about-heading">
      <div className="container px-4 max-w-4xl mx-auto text-center md:text-left">
        <h2 id="home-about-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-8">
          {HOME_ABOUT.heading}
        </h2>
        <div className="space-y-5 text-slate-700 leading-relaxed">
          {HOME_ABOUT.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild className="rounded bg-[#099546] hover:bg-[#088040] text-white h-11 px-8 font-semibold">
            <Link href={HOME_ABOUT.ctaHref}>{HOME_ABOUT.ctaLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export function HomeMainServicesThree() {
  return (
    <section
      className="border-t border-slate-200 bg-white py-14 md:py-20"
      aria-labelledby="home-main-services-heading"
    >
      <div className="container px-4">
        <h2 id="home-main-services-heading" className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-10">
          Our main services
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {HOME_MAIN_SERVICES.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center hover:border-[#099546]/40 hover:shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#099546] h-full flex flex-col"
            >
              <div className="flex justify-center mb-4" aria-hidden>
                <MainServiceIcon kind={s.icon} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed flex-1">{s.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomeServicesFourSection() {
  const { heading, intro, items } = HOME_SERVICES_FOUR
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-14 md:py-20" aria-labelledby="home-services-four-heading">
      <div className="container px-4 max-w-5xl mx-auto">
        <h2 id="home-services-four-heading" className="text-2xl md:text-3xl font-bold text-center text-[#099546] mb-4">
          {heading}
        </h2>
        <p className="text-center text-slate-600 max-w-3xl mx-auto mb-12">{intro}</p>
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm h-full flex flex-col"
            >
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4 flex-1">{item.text}</p>
              <Link href={item.href} className="text-sm font-semibold text-[#099546] hover:underline inline-flex items-center gap-1">
                Learn more <ChevronDown className="h-4 w-4 -rotate-90" aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomeClosingCtaSection() {
  return (
    <section className="border-t border-slate-200 bg-[#099546] text-white py-14 md:py-16">
      <div className="container px-4 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{HOME_CLOSING_CTA.heading}</h2>
        <p className="text-white/90 leading-relaxed mb-8">{HOME_CLOSING_CTA.text}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="rounded bg-white text-[#099546] hover:bg-slate-100 font-semibold h-11 px-8">
            <Link href="/branches">Find a branch</Link>
          </Button>
          <Button asChild variant="outline" className="rounded border-2 border-white bg-transparent text-white hover:bg-white/10 h-11 px-8 font-semibold">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export function HomeWhyChooseSection() {
  return (
    <section className="border-t border-slate-200 bg-white py-14 md:py-20" aria-labelledby="home-why-heading">
      <div className="container px-4 max-w-3xl mx-auto">
        <h2 id="home-why-heading" className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">
          {HOME_WHY_US.heading}
        </h2>
        <ul className="space-y-3 mb-8">
          {HOME_WHY_US.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-slate-700">
              <span className="text-[#099546] font-bold shrink-0" aria-hidden>
                ✓
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <p className="text-center text-slate-600 leading-relaxed">{HOME_WHY_US.footer}</p>
      </div>
    </section>
  )
}

export function HomeRemittanceSection() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-14 md:py-20" aria-labelledby="home-remit-heading">
      <div className="container px-4 max-w-3xl mx-auto text-center">
        <h2 id="home-remit-heading" className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          {HOME_REMITTANCE.heading}
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">{HOME_REMITTANCE.paragraph}</p>
        <p className="text-slate-600 text-sm mb-8">{HOME_REMITTANCE.supporting}</p>
        <Button asChild className="rounded bg-[#099546] hover:bg-[#088040] text-white h-11 px-8 font-semibold">
          <Link href={HOME_REMITTANCE.ctaHref}>{HOME_REMITTANCE.ctaLabel}</Link>
        </Button>
      </div>
    </section>
  )
}

export function HomeBranchPromoSection() {
  return (
    <section className="border-t border-slate-200 bg-white py-14 md:py-20" aria-labelledby="home-branch-heading">
      <div className="container px-4 max-w-3xl mx-auto text-center">
        <h2 id="home-branch-heading" className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          {HOME_BRANCH.heading}
        </h2>
        <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-4">
          With <strong className="text-slate-900 font-bold">150+ branches</strong> across Pakistan, visit your nearest
          Pakistan Currency Exchange outlet for currency exchange, remittance collection, and customer support.
        </p>
        <p className="text-slate-600 text-sm mb-8">{HOME_BRANCH.supporting}</p>
        <Button asChild variant="outline" className="rounded border-2 border-[#099546] text-[#099546] hover:bg-[#099546]/5 h-11 px-8 font-semibold">
          <Link href={HOME_BRANCH.ctaHref} className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" aria-hidden />
            {HOME_BRANCH.ctaLabel}
          </Link>
        </Button>
      </div>
    </section>
  )
}

export function HomeTrustSection() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-14 md:py-20" aria-labelledby="home-trust-heading">
      <div className="container px-4 max-w-3xl mx-auto text-center md:text-left">
        <h2 id="home-trust-heading" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center md:text-left">
          {HOME_TRUST.heading}
        </h2>
        {HOME_TRUST.paragraphs.map((p, i) => (
          <p key={i} className="text-slate-700 leading-relaxed mb-4 last:mb-0">
            {p}
          </p>
        ))}
      </div>
    </section>
  )
}

export function HomeContactSection() {
  return (
    <section className="border-t border-slate-200 bg-white py-14 md:py-20" aria-labelledby="home-contact-heading">
      <div className="container px-4 max-w-3xl mx-auto text-center">
        <h2 id="home-contact-heading" className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          {HOME_CONTACT.heading}
        </h2>
        <p className="text-slate-700 leading-relaxed mb-10">{HOME_CONTACT.paragraph}</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
          <Button asChild className="rounded bg-[#099546] hover:bg-[#088040] text-white h-11 px-6 font-semibold">
            <a href="tel:080013537" className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Call now
            </a>
          </Button>
          <Button asChild variant="outline" className="rounded border-2 border-[#099546] text-[#099546] h-11 px-6 font-semibold">
            <a href="https://wa.me/923046668810" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              WhatsApp us
            </a>
          </Button>
          <Button asChild variant="outline" className="rounded border-2 border-slate-300 text-slate-800 h-11 px-6 font-semibold">
            <Link href="/branches" className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Visit a branch
            </Link>
          </Button>
        </div>
        <p className="mt-10 text-sm text-slate-600">
          Prefer email?{' '}
          <a href="mailto:info@pakistancurrency.com" className="font-semibold text-[#099546] hover:underline">
            info@pakistancurrency.com
          </a>{' '}
          ·{' '}
          <Link href="/contact" className="font-semibold text-[#099546] hover:underline">
            Contact form
          </Link>
        </p>
      </div>
    </section>
  )
}

export function HomeFaqSection() {
  const { heading, subheading, items } = HOME_FAQ
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  return (
    <section className="border-t border-slate-200 bg-slate-50 py-14 md:py-20" aria-labelledby="home-faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container px-4 max-w-3xl mx-auto">
        <h2 id="home-faq-heading" className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-2">
          {heading}
        </h2>
        <p className="text-center text-slate-600 mb-10">{subheading}</p>
        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm open:shadow-md"
            >
              <summary className="cursor-pointer list-none font-semibold text-slate-900 flex justify-between gap-4 items-center">
                <span>{item.q}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 group-open:rotate-180 transition-transform" aria-hidden />
              </summary>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">{item.a}</p>
            </details>
          ))}
        </div>
        <p className="text-center mt-10 text-sm text-slate-600">
          Still unsure?{' '}
          <Link href="/contact" className="font-semibold text-[#099546] hover:underline">
            Contact our team
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
