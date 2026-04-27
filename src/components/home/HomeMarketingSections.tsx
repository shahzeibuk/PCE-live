import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  FileText,
  Lock,
  MapPin,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
  ChevronDown,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { HOME_CONTACT, HOME_INDEX_HEADING_CLASS, HOME_TRUST } from '@/components/home/homeContent'
import { HomeTrustAnimatedStats } from '@/components/home/HomeTrustAnimatedStats'
import { HomeContactEmailCTA } from '@/components/home/HomeContactEmailCTA'
import type { HomeServicesSectionProps } from '@/utilities/getHomeServicesSectionProps'
import type { HomeWhyUsSectionProps, WhyChooseIconKind } from '@/utilities/getHomeWhyUsSectionProps'
import type { HomeFaqSectionProps } from '@/utilities/getHomeFaqSectionProps'
import { HomeFaqList } from '@/components/home/HomeFaqList'

function WhyChooseIcon({ kind }: { kind: WhyChooseIconKind }) {
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

function serviceBoxLinkAttrs(href: string, openInNewTab?: boolean) {
  const external = href.startsWith('http://') || href.startsWith('https://')
  if (openInNewTab || external) {
    return { target: '_blank' as const, rel: 'noopener noreferrer' as const }
  }
  return {}
}

/** Service boxes: first row up to three; remaining row(s) centered when two items. */
export function HomeServicesOrderSection({ title, description, boxes }: HomeServicesSectionProps) {
  const row1 = boxes.slice(0, 3)
  const row2 = boxes.slice(3)

  const renderBox = (card: HomeServicesSectionProps['boxes'][number], index: number) => (
    <article
      key={`${card.title}-${index}`}
      className="flex flex-col items-center text-center rounded-xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm ring-1 ring-slate-100/80 h-full"
    >
      <div className="mb-4 shrink-0" aria-hidden>
        <Image
          src={card.imageSrc}
          alt=""
          width={72}
          height={72}
          className="h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] object-contain"
          unoptimized={card.imageSrc.endsWith('.svg')}
        />
      </div>
      <h3 className={`text-base md:text-lg mb-2 leading-snug ${HOME_INDEX_HEADING_CLASS}`}>{card.title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed flex-1 max-w-sm">{card.description}</p>
      <Link
        href={card.href}
        className="mt-5 inline-flex items-center justify-center gap-1 text-sm font-semibold text-[#099546] hover:underline"
        {...serviceBoxLinkAttrs(card.href, card.openInNewTab)}
      >
        {card.ctaLabel}
        <ChevronDown className="h-4 w-4 -rotate-90 shrink-0" aria-hidden />
      </Link>
    </article>
  )

  const row2ClassName =
    row2.length === 1
      ? 'grid gap-5 max-w-sm mx-auto md:gap-6'
      : row2.length === 2
        ? 'grid gap-5 sm:grid-cols-2 md:max-w-3xl md:mx-auto md:gap-6'
        : 'grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6'

  return (
    <section
      className="border-t border-slate-200 bg-slate-50 py-14 md:py-20"
      aria-labelledby="home-services-order-heading"
    >
      <div className="container px-4 max-w-5xl mx-auto">
        <h2
          id="home-services-order-heading"
          className={`text-2xl md:text-3xl text-center ${description ? 'mb-4 md:mb-5' : 'mb-10 md:mb-12'} ${HOME_INDEX_HEADING_CLASS}`}
        >
          {title}
        </h2>
        {description ? (
          <p className="text-slate-600 text-center text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10 md:mb-12">
            {description}
          </p>
        ) : null}
        <div className="space-y-6 md:space-y-8">
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {row1.map((card, i) => renderBox(card, i))}
          </div>
          {row2.length > 0 ? <div className={row2ClassName}>{row2.map((card, i) => renderBox(card, i + 3))}</div> : null}
        </div>
      </div>
    </section>
  )
}

/** Travelex “Money Card” style: headline + tagline, icon list, rounded image */
export function HomeWhyChooseSection({ heading, subheading, imageSrc, items, footer }: HomeWhyUsSectionProps) {
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
              {items.map((item, idx) => (
                <li key={`why-choose-${idx}`} className="flex gap-4 items-start">
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
    reachUsDirect,
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
            {reachUsDirect.map((action, i) => {
              const isWa = 'external' in action && action.external
              const isFirst = i === 0
              const Icon = isFirst ? MapPin : isWa ? MessageCircle : FileText
              const isGreen = isFirst || isWa
              const className = isGreen
                ? 'rounded-full border-2 border-[#099546] text-[#099546] h-11 px-6 font-semibold hover:bg-[#099546]/5'
                : 'rounded-full border-2 border-slate-300 text-slate-800 h-11 px-6 font-semibold hover:bg-slate-50'
              const inner = (
                <>
                  <Icon className="h-4 w-4 shrink-0" />
                  {action.label}
                </>
              )
              if (isWa) {
                return (
                  <Button key={action.href} asChild variant="outline" className={className}>
                    <a
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      {inner}
                    </a>
                  </Button>
                )
              }
              return (
                <Button key={action.href} asChild variant="outline" className={className}>
                  <Link href={action.href} className="inline-flex items-center gap-2">
                    {inner}
                  </Link>
                </Button>
              )
            })}
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

export function HomeFaqSection(props: HomeFaqSectionProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: props.items.map((item) => ({
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomeFaqList {...props} />
    </section>
  )
}
