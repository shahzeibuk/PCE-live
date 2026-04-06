import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { LiveExchangeRatesBlock } from '@/blocks/LiveExchangeRates/Component'
import { CurrencyConverterBlock } from '@/blocks/CurrencyConverter/Component'
import { getCurrencyRatesForFrontend } from '@/utilities/getCurrencyRatesForFrontend'
import { WhatsAppCTABlock } from '@/blocks/WhatsAppCTA/Component'
import { HeroCurrencyBackdrop } from '@/components/layout/currencyBrandSurfaces'
import { HomeBlogTeasers } from '@/components/HomeBlogTeasers'
import { HOME_HERO, HOME_RATES_SECTION } from '@/components/home/homeContent'
import {
  HomeAboutSection,
  HomeBranchPromoSection,
  HomeClosingCtaSection,
  HomeContactSection,
  HomeFaqSection,
  HomeMainServicesThree,
  HomeRemittanceSection,
  HomeServicesFourSection,
  HomeTrustSection,
  HomeWhyChooseSection,
} from '@/components/home/HomeMarketingSections'
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

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  let rates: any[] = []
  let news: any[] = []
  let blogPosts: any[] = []

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
        <section className="relative overflow-hidden">
          <HeroCurrencyBackdrop
            minHeightClassName="min-h-[min(85vh,520px)] sm:min-h-[min(80vh,480px)]"
            className="pb-10 md:pb-14"
            priority
          >
            <div className="hero-below-nav container flex flex-1 flex-col justify-center pb-10 md:pb-14">
              <div className="max-w-2xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#099546]">
                  {HOME_HERO.eyebrow}
                </p>
                <h1 className="text-pretty text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  {HOME_HERO.h1}
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-200 md:text-lg lg:text-xl">
                  {HOME_HERO.lead}
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Button
                    asChild
                    className="h-11 rounded bg-[#099546] px-6 font-semibold text-white hover:bg-[#088040]"
                  >
                    <Link href="/currency-rates">View full rate list</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded border-2 border-white bg-transparent px-6 font-semibold text-white shadow-none hover:bg-white/10 hover:text-white"
                  >
                    <Link href="https://wa.me/923046668810" target="_blank" rel="noopener noreferrer">
                      WhatsApp for best rate
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </HeroCurrencyBackdrop>
        </section>

        <HomeAboutSection />

        <section className="bg-white border-t border-slate-200">
          <LiveExchangeRatesBlock
            rates={rates as any}
            disableInnerContainer={false}
            containerClassName="container px-4 pt-6 pb-12 sm:pt-8 sm:pb-14 md:pb-16"
            title={HOME_RATES_SECTION.title}
            intro={HOME_RATES_SECTION.paragraph}
            supportingText={HOME_RATES_SECTION.supporting}
            ctaLabel={HOME_RATES_SECTION.ctaLabel}
            popularTitle="Popular Forex Rates"
          />
        </section>

        <CurrencyConverterBlock rates={rates as any} disableInnerContainer={false} />

        <HomeMainServicesThree />

        <HomeServicesFourSection />

        <HomeClosingCtaSection />

        <HomeWhyChooseSection />

        <HomeRemittanceSection />

        <HomeBranchPromoSection />

        <HomeTrustSection />

        <HomeContactSection />

        <HomeFaqSection />

        {news.length > 0 && (
          <section className="bg-slate-100 py-16 md:py-20 border-t border-slate-200">
            <div className="container px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-10">
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
                      <h3 className="text-lg font-bold text-[#099546] mb-3 leading-snug">{item.title}</h3>
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

        <section className="bg-white border-t border-slate-200">
          <WhatsAppCTABlock
            disableInnerContainer={false}
            phoneNumber="923046668810"
            body="Need the Best Exchange Rates? Chat with us on WhatsApp for fast instant updates!"
            buttonText="WhatsApp Now"
          />
        </section>
      </div>
    </>
  )
}
