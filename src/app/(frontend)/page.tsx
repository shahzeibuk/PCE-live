import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

import { LiveExchangeRatesBlock } from '@/blocks/LiveExchangeRates/Component'
import { CurrencyConverterBlock } from '@/blocks/CurrencyConverter/Component'
import { getCurrencyRatesForFrontend } from '@/utilities/getCurrencyRatesForFrontend'
import { ServicesGridBlock } from '@/blocks/ServicesGrid/Component'
import { WhatsAppCTABlock } from '@/blocks/WhatsAppCTA/Component'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  let rates: any[] = []
  let services: any[] = []
  let news: any[] = []

  try {
    rates = await getCurrencyRatesForFrontend(payload, { limit: 8 })

    const servicesResult = await payload.find({ collection: 'services', limit: 4, sort: 'title' })
    services = (servicesResult.docs ?? []) as any[]

    const newsResult = await payload.find({ collection: 'news', limit: 3, sort: '-published_date' })
    news = (newsResult.docs ?? []) as any[]
  } catch (err) {
    console.error('Home Page Data Fetch Error:', err)
  }

  return (
    <div className="flex flex-col gap-0 overflow-x-hidden">
      {/* 1. Hero — today’s rates headline, CTAs */}
      <section className="relative pb-16 md:pb-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
        <div className="container px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="space-y-6 text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                Today&apos;s Live Currency Exchange Rates{' '}
                <span className="text-[#099546]">in Pakistan</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl">
                Check the latest USD, SAR, AED and EUR rates in the open market.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  asChild
                  className="rounded bg-[#099546] hover:bg-[#088040] text-white h-12 px-6 font-semibold"
                >
                  <Link href="/currency-rates">Check Today&apos;s Rates</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded h-12 px-6 font-semibold border-2 border-[#099546] text-[#099546] bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800"
                >
                  <Link href="https://wa.me/923046668810" target="_blank" rel="noopener noreferrer">
                    WhatsApp for Best Rate
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[240px] sm:h-[320px] lg:h-[380px] rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
              {/* <Image
                src="https://images.unsplash.com/photo-1590283603385-17ffb3a8f31e?w=900&q=80&auto=format&fit=crop"
                alt=""
                fill
                className="object-cover object-right opacity-90"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              /> */}
              <div className="absolute inset-0 bg-linear-to-r from-slate-50 via-slate-50/70 to-transparent dark:from-slate-950 dark:via-slate-950/60" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Live Exchange Rates */}
      <section className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <LiveExchangeRatesBlock rates={rates as any} disableInnerContainer={false} />
      </section>

      {/* 3. Currency Converter */}
      <CurrencyConverterBlock rates={rates as any} disableInnerContainer={false} />

      {/* 4. Our Services */}
      <section className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <ServicesGridBlock services={services as any} disableInnerContainer={false} />
      </section>

      {/* 5. Daily Currency Updates */}
      {news.length > 0 && (
        <section className="bg-slate-100 dark:bg-slate-900/40 py-16 md:py-20 border-t border-slate-200 dark:border-slate-800">
          <div className="container px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 dark:text-white mb-10">
              Daily Currency Updates
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {news
                .filter((item) => item?.slug)
                .map((item: any) => (
                  <article
                    key={item.id}
                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded p-6 shadow-sm flex flex-col"
                  >
                    <h3 className="text-lg font-bold text-[#099546] mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 flex-1 mb-4">
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

      {/* 6. WhatsApp */}
      <section className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <WhatsAppCTABlock
          disableInnerContainer={false}
          phoneNumber="923046668810"
          body="Need the Best Exchange Rates? Chat with us on WhatsApp for fast instant updates!"
          buttonText="WhatsApp Now"
        />
      </section>
    </div>
  )
}
