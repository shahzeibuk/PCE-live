import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'

import { LiveExchangeRatesBlock } from '@/blocks/LiveExchangeRates/Component'
import { CurrencyConverterBlock } from '@/blocks/CurrencyConverter/Component'
import { getCurrencyRatesForFrontend } from '@/utilities/getCurrencyRatesForFrontend'
import { HeroCurrencyBackdropSlider } from '@/components/layout/HeroCurrencyBackdropSlider'
import { HomeBlogTeasers } from '@/components/HomeBlogTeasers'
import { HOME_INDEX_HEADING_CLASS, HOME_RATES_SECTION } from '@/components/home/homeContent'
import {
  HomeContactSection,
  HomeFaqSection,
  HomeServicesOrderSection,
  HomeTrustSection,
  HomeWhyChooseSection,
} from '@/components/home/HomeMarketingSections'
import { homeHeroGlobalToSliderProps } from '@/utilities/getHomeHeroCarouselProps'
import { homeServicesGlobalToSectionProps } from '@/utilities/getHomeServicesSectionProps'
import { homeWhyUsGlobalToSectionProps } from '@/utilities/getHomeWhyUsSectionProps'
import { homeFaqGlobalToSectionProps } from '@/utilities/getHomeFaqSectionProps'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

const homeTitle = 'Live Currency Exchange Rates in Pakistan | USD, SAR, AED, EUR to PKR'
const homeDescription =
  'Check the latest USD, SAR, AED, and EUR to PKR open market exchange rates in Pakistan. Stay updated with live forex rates, currency exchange, and remittance services.'

const siteOrigin = getServerSideURL().replace(/\/$/, '')

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: { canonical: `${siteOrigin}/` },
  openGraph: mergeOpenGraph({
    title: homeTitle,
    description: homeDescription,
  }),
}

function HomeCmsUnavailable() {
  return (
    <div className="container max-w-2xl px-4 py-20 md:py-28">
      <h1 className="text-2xl font-black text-slate-900 md:text-3xl">Connect the database to view the full site</h1>
      <p className="mt-4 text-slate-600 leading-relaxed">
        Payload could not reach your database. Copy <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">.env.example</code> to{' '}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">.env</code>, set <strong>DATABASE_URL</strong> and{' '}
        <strong>PAYLOAD_SECRET</strong>, then run <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">pnpm payload migrate</code>.
      </p>
      <p className="mt-6 text-sm text-slate-500">
        Dev server URL: <strong>http://127.0.0.1:3001</strong> (use this host if localhost shows errors).
      </p>
    </div>
  )
}

export default async function HomePage() {
  let payload: Awaited<ReturnType<typeof getPayload>>
  try {
    payload = await getPayload({ config: configPromise })
  } catch (err) {
    console.error('HomePage getPayload failed:', err)
    return <HomeCmsUnavailable />
  }

  let rates: any[] = []
  let news: any[] = []
  let blogPosts: any[] = []
  let heroSliderProps = homeHeroGlobalToSliderProps(null)
  let homeServicesSection = homeServicesGlobalToSectionProps(null)
  let homeWhyUsSection = homeWhyUsGlobalToSectionProps(null)
  let homeFaqSection = homeFaqGlobalToSectionProps(null)

  try {
    const homeHero = await payload.findGlobal({ slug: 'homeHero', depth: 2 })
    heroSliderProps = homeHeroGlobalToSliderProps(homeHero)
  } catch (err) {
    console.error('Home hero global fetch failed:', err)
  }

  try {
    const homeServices = await payload.findGlobal({ slug: 'homeServices', depth: 2 })
    homeServicesSection = homeServicesGlobalToSectionProps(homeServices)
  } catch (err) {
    console.error('Home services global fetch failed:', err)
  }

  try {
    const homeWhyUs = await payload.findGlobal({ slug: 'homeWhyUs', depth: 2 })
    homeWhyUsSection = homeWhyUsGlobalToSectionProps(homeWhyUs)
  } catch (err) {
    console.error('Home Why Us global fetch failed:', err)
  }

  try {
    const homeFaq = await payload.findGlobal({ slug: 'homeFaq', depth: 1 })
    homeFaqSection = homeFaqGlobalToSectionProps(homeFaq)
  } catch (err) {
    console.error('Home FAQ global fetch failed:', err)
  }

  try {
    rates = await getCurrencyRatesForFrontend(payload, { limit: 24 })

    const newsResult = await payload.find({ collection: 'news', limit: 3, sort: '-published_date' })
    news = (newsResult.docs ?? []) as any[]

    const blogResult = await payload.find({
      collection: 'posts',
      depth: 0,
      limit: 3,
      sort: '-publishedAt',
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
        meta: true,
      },
    })
    blogPosts = (blogResult.docs ?? []) as any[]
  } catch (err) {
    console.error('Home Page Data Fetch Error:', err)
  }

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pakistan Currency Exchange',
    url: siteOrigin,
    description: homeDescription,
    telephone: '+92-304-6668810',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Office 7, 8, 9 Al-Rasheed Chamber, Block 6, 12/A P.E.C.H.S., Main Shahrah-e-Faisal',
      addressLocality: 'Karachi',
      addressCountry: 'PK',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <div className="flex flex-col gap-0 overflow-x-hidden flush-under-site-header">
        <section className="relative overflow-x-hidden">
          <HeroCurrencyBackdropSlider
            slides={heroSliderProps.slides}
            primaryCta={heroSliderProps.primaryCta}
            secondaryCta={heroSliderProps.secondaryCta}
            minHeightClassName="min-h-[min(92vh,640px)] sm:min-h-[min(88vh,600px)] md:min-h-[min(84vh,720px)]"
            priority
          />
        </section>

        <section className="bg-white border-t border-slate-200">
          <LiveExchangeRatesBlock
            rates={rates as any}
            disableInnerContainer={false}
            containerClassName="container px-4 py-14 md:py-20"
            title={HOME_RATES_SECTION.title}
            intro={HOME_RATES_SECTION.description}
            ctaLabel={HOME_RATES_SECTION.ctaLabel}
            popularTitle={HOME_RATES_SECTION.popularTabLabel}
            popularTabLabel={HOME_RATES_SECTION.popularTabLabel}
            otherTabLabel={HOME_RATES_SECTION.otherTabLabel}
          />
        </section>

        <CurrencyConverterBlock rates={rates as any} disableInnerContainer={false} />

        <HomeServicesOrderSection {...homeServicesSection} />

        <HomeWhyChooseSection {...homeWhyUsSection} />

        <HomeContactSection />

        <HomeFaqSection {...homeFaqSection} />

        {news.length > 0 && (
          <section className="bg-slate-100 py-16 md:py-20 border-t border-slate-200">
            <div className="container px-4">
              <h2 className={`text-2xl md:text-3xl text-center mb-10 ${HOME_INDEX_HEADING_CLASS}`}>
                Daily Currency Updates
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {news
                  .filter((item) => item?.slug)
                  .map((item: any) => (
                    <article
                      key={item.id}
                      className="bg-white border border-slate-200 rounded p-6 shadow-sm flex flex-col"
                    >
                      <h3 className={`text-lg mb-3 leading-snug ${HOME_INDEX_HEADING_CLASS}`}>{item.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-3 flex-1 mb-4">
                        {item.description || 'Read the latest on open-market rates and company news.'}
                      </p>
                      <Link
                        href={`/news/${item.slug}`}
                        className="text-sm font-semibold text-[#099546] hover:underline inline-flex items-center gap-1"
                      >
                        Read More &gt;
                      </Link>
                    </article>
                  ))}
              </div>
            </div>
          </section>
        )}

        <HomeBlogTeasers posts={blogPosts} />

        <HomeTrustSection />
      </div>
    </>
  )
}
