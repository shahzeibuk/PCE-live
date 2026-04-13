import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  Building2,
  Headphones,
  LineChart,
  Lock,
  MapPin,
  Phone,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
  ChevronDown,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  HOME_ABOUT,
  HOME_BRANCH,
  HOME_CLOSING_CTA,
  HOME_CONTACT,
  HOME_FAQ,
  HOME_INDEX_HEADING_CLASS,
  HOME_SERVICES_ORDER_SECTION,
  HOME_TRUST,
  HOME_WHY_US,
} from '@/components/home/homeContent'
import { HomeTrustAnimatedStats } from '@/components/home/HomeTrustAnimatedStats'
import { HomeContactEmailCTA } from '@/components/home/HomeContactEmailCTA'

function ServiceOrderIcon({ kind }: { kind: 'branch' | 'rates' | 'support' }) {
  const cls = 'h-8 w-8 text-[#099546]'
  if (kind === 'branch') return <Building2 className={cls} aria-hidden />
  if (kind === 'rates') return <LineChart className={cls} aria-hidden />
  return <Headphones className={cls} aria-hidden />
}

function WhyChooseIcon({ kind }: { kind: 'shield' | 'trending' | 'lock' | 'zap' | 'users' | 'map' }) {
  const cls = 'h-5 w-5 text-[#099546] sm:h-[1.35rem] sm:w-[1.35rem]'
  switch (kind) {
    case 'shield':
      return <ShieldCheck className={cls} aria-hidden strokeWidth={2.25} />
    case 'trending':
      return <TrendingUp className={cls} aria-hidden strokeWidth={2.25} />
    case 'lock':
      return <Lock className={cls} aria-hidden strokeWidth={2.25} />
    case 'zap':
      return <Zap className={cls} aria-hidden strokeWidth={2.25} />
    case 'users':
      return <Users className={cls} aria-hidden strokeWidth={2.25} />
    case 'map':
      return <MapPin className={cls} aria-hidden strokeWidth={2.25} />
    default:
      return <ShieldCheck className={cls} aria-hidden />
  }
}

export function HomeAboutSection() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-14 md:py-20" aria-labelledby="home-about-heading">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:gap-14 items-start">
          <div className="relative w-full aspect-[4/3] max-h-[min(100vw,22rem)] sm:max-h-[28rem] md:max-h-none md:aspect-[5/4] md:min-h-[280px] rounded-2xl overflow-hidden shadow-lg ring-1 ring-slate-200/80 md:order-1">
            <Image
              src={HOME_ABOUT.imageSrc}
              alt=""
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="text-center md:text-left md:order-2">
            <h2
              id="home-about-heading"
              className={`text-2xl md:text-3xl lg:text-4xl leading-tight mb-6 ${HOME_INDEX_HEADING_CLASS}`}
            >
              {HOME_ABOUT.heading}
            </h2>
            <div className="space-y-5 text-slate-700 leading-relaxed">
              {HOME_ABOUT.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex justify-center md:justify-start">
              <Button asChild className="rounded bg-[#099546] hover:bg-[#088040] text-white h-11 px-8 font-semibold">
                <Link href={HOME_ABOUT.ctaHref}>{HOME_ABOUT.ctaLabel}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Travelex-style three-column “order in minutes” band with icon tiles */
export function HomeServicesOrderSection() {
  const { heading, intro, imageSrc, cards } = HOME_SERVICES_ORDER_SECTION
  return (
    <section
      className="border-t border-slate-200 bg-slate-50 py-14 md:py-20 lg:py-24"
      aria-labelledby="home-services-order-heading"
    >
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:gap-14 items-center mb-12 md:mb-16 lg:mb-20">
          <div className="text-center md:text-left md:order-1">
            <h2
              id="home-services-order-heading"
              className={`text-2xl md:text-3xl lg:text-4xl leading-tight mb-4 md:mb-5 max-w-xl mx-auto md:mx-0 ${HOME_INDEX_HEADING_CLASS}`}
            >
              {heading}
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
              {intro}
            </p>
          </div>
          <div className="relative w-full aspect-[4/3] max-h-[min(100vw,20rem)] sm:max-h-[26rem] md:max-h-none md:aspect-[5/4] md:min-h-[260px] rounded-2xl overflow-hidden shadow-lg ring-1 ring-slate-200/80 md:order-2">
            <Image
              src={imageSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3 md:gap-6 lg:gap-8 items-stretch">
          {cards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm ring-1 ring-slate-100/80 h-full"
            >
              <div
                className="mb-5 flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-2xl bg-[#099546]/10 md:h-[4.5rem] md:w-[4.5rem]"
                aria-hidden
              >
                <ServiceOrderIcon kind={card.icon} />
              </div>
              <h3 className={`text-lg md:text-xl mb-3 leading-snug ${HOME_INDEX_HEADING_CLASS}`}>{card.title}</h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">{card.description}</p>
              <div className="my-6 border-t border-slate-200" role="presentation" />
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Benefits</p>
              <ul className="mb-8 flex-1 space-y-2.5">
                {card.benefits.map((b) => (
                  <li key={b} className="flex gap-2.5 text-sm text-slate-600 leading-snug">
                    <span className="font-bold text-[#099546] shrink-0" aria-hidden>
                      ✓
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={card.href}
                className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#099546] hover:underline"
              >
                {card.ctaLabel}
                <ChevronDown className="h-4 w-4 -rotate-90 shrink-0" aria-hidden />
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
        <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">{HOME_CLOSING_CTA.heading}</h2>
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

/** Travelex “Money Card” style: headline + tagline, icon list, rounded image */
export function HomeWhyChooseSection() {
  const { heading, subheading, imageSrc, items, footer } = HOME_WHY_US
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-14 md:py-20 lg:py-24" aria-labelledby="home-why-heading">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:gap-14 items-center">
          <div className="text-center md:text-left md:order-1">
            <h2
              id="home-why-heading"
              className={`text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight ${HOME_INDEX_HEADING_CLASS}`}
            >
              {heading}
            </h2>
            <p className="mt-3 text-lg md:text-xl text-slate-600 leading-snug max-w-lg mx-auto md:mx-0">
              {subheading}
            </p>
            <ul className="mt-8 md:mt-10 space-y-4 text-left max-w-xl mx-auto md:mx-0">
              {items.map((item) => (
                <li key={item.text} className="flex gap-4 items-start">
                  <span
                    className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#099546]/10 ring-1 ring-[#099546]/15"
                    aria-hidden
                  >
                    <WhyChooseIcon kind={item.icon} />
                  </span>
                  <span className="text-[15px] md:text-base text-slate-700 leading-relaxed pt-1.5">{item.text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 md:mt-10 text-sm md:text-base text-slate-600 leading-relaxed max-w-xl mx-auto md:mx-0">
              {footer}
            </p>
          </div>
          <div className="relative w-full aspect-[4/3] max-h-[min(100vw,22rem)] sm:max-h-[28rem] md:max-h-none md:aspect-[5/4] md:min-h-[300px] rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200/80 md:order-2">
            <Image
              src={imageSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomeBranchPromoSection() {
  return (
    <section className="border-t border-slate-200 bg-white py-14 md:py-20" aria-labelledby="home-branch-heading">
      <div className="container px-4 max-w-3xl mx-auto text-center">
        <h2 id="home-branch-heading" className={`text-2xl md:text-3xl mb-4 ${HOME_INDEX_HEADING_CLASS}`}>
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

/** Travelex “Trusted travel money” style: centered headline, tagline, bold stat grid */
export function HomeTrustSection() {
  const { heading, subheading, footnote } = HOME_TRUST
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-14 md:py-20 lg:py-24" aria-labelledby="home-trust-heading">
      <div className="container px-4 max-w-5xl mx-auto text-center">
        <h2
          id="home-trust-heading"
          className={`text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-5 tracking-tight ${HOME_INDEX_HEADING_CLASS}`}
        >
          {heading}
        </h2>
        <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12 md:mb-14 lg:mb-16">
          {subheading}
        </p>
        <HomeTrustAnimatedStats />
        <p className="mt-12 md:mt-14 text-xs md:text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
          {footnote}
        </p>
      </div>
    </section>
  )
}

/** Travelex “Upgrade your travel money” style: headline, pitch, email + CTA, find out more, footnote */
export function HomeContactSection() {
  const {
    heading,
    paragraph,
    contactEmail,
    inputPlaceholder,
    primaryCta,
    findOutMoreLabel,
    findOutMoreHref,
    footnote,
  } = HOME_CONTACT

  return (
    <section
      className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-[#099546]/[0.07] py-14 md:py-20 lg:py-24"
      aria-labelledby="home-contact-heading"
    >
      <div className="container px-4 max-w-2xl mx-auto text-center">
        <h2
          id="home-contact-heading"
          className={`text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-5 tracking-tight ${HOME_INDEX_HEADING_CLASS}`}
        >
          {heading}
        </h2>
        <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto">{paragraph}</p>

        <HomeContactEmailCTA placeholder={inputPlaceholder} ctaLabel={primaryCta} mailTo={contactEmail} />

        <div className="mt-6 md:mt-7">
          <Link
            href={findOutMoreHref}
            className="inline-flex items-center justify-center text-sm font-semibold text-[#099546] hover:text-[#088040] hover:underline underline-offset-4"
          >
            {findOutMoreLabel}
          </Link>
        </div>

        <p className="mt-8 md:mt-10 text-xs md:text-sm text-slate-500 leading-relaxed max-w-lg mx-auto">{footnote}</p>

        <div className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-slate-200/80">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Or reach us directly</p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button asChild variant="outline" className="rounded-full border-2 border-[#099546] text-[#099546] h-11 px-6 font-semibold hover:bg-[#099546]/5">
              <a href="tel:080013537" className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                Call now
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-2 border-[#099546] text-[#099546] h-11 px-6 font-semibold hover:bg-[#099546]/5">
              <a href="https://wa.me/923046668810" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                <MessageCircle className="h-4 w-4 shrink-0" />
                WhatsApp us
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-2 border-slate-300 text-slate-800 h-11 px-6 font-semibold hover:bg-slate-50">
              <Link href="/branches" className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                Visit a branch
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-slate-600">
            <a href={`mailto:${contactEmail}`} className="font-semibold text-[#099546] hover:underline">
              {contactEmail}
            </a>
          </p>
        </div>
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
        <h2 id="home-faq-heading" className={`text-2xl md:text-3xl text-center mb-2 ${HOME_INDEX_HEADING_CLASS}`}>
          {heading}
        </h2>
        <p className="text-center text-slate-600 mb-8 md:mb-10">{subheading}</p>
        <div className="space-y-3 w-full md:w-[70%] md:mx-auto">
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border border-slate-200 bg-white px-4 py-3.5 md:px-5 md:py-4 shadow-sm open:shadow-md"
            >
              <summary className="relative cursor-pointer list-none flex items-center gap-3 py-0.5 md:min-h-[2.75rem] md:justify-center">
                <span className="min-w-0 flex-1 md:flex-none md:max-w-[calc(100%-2rem)] text-left md:text-center text-pretty text-[15px] md:text-base font-semibold text-slate-700 leading-snug md:mx-auto md:pl-2 md:pr-8">
                  {item.q}
                </span>
                <ChevronDown
                  className="absolute right-0 top-1/2 h-5 w-5 shrink-0 -translate-y-1/2 text-slate-500 transition-transform group-open:rotate-180 md:right-1"
                  aria-hidden
                />
              </summary>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-left">
                {item.a}
              </p>
            </details>
          ))}
        </div>
        <p className="text-center mt-10 md:mt-12 text-sm text-slate-600">
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
