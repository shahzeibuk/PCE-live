import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { LiveExchangeRatesBlock } from '@/blocks/LiveExchangeRates/Component'
import { CurrencyConverterBlock } from '@/blocks/CurrencyConverter/Component'
import { getCurrencyRatesForFrontend } from '@/utilities/getCurrencyRatesForFrontend'
import { ServicesGridBlock } from '@/blocks/ServicesGrid/Component'
import { WhatsAppCTABlock } from '@/blocks/WhatsAppCTA/Component'
import { HeroCurrencyBackdrop } from '@/components/layout/currencyBrandSurfaces'

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
      <section className="relative overflow-hidden">
        <HeroCurrencyBackdrop
          minHeightClassName="min-h-[380px] md:min-h-[440px]"
          className="pb-16 md:pb-24"
          priority
        >
          <div className="container px-4">
            <div className="max-w-3xl space-y-6 text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                Today&apos;s Live Currency Exchange Rates{' '}
                <span className="text-[#099546]">in Pakistan</span>
              </h1>
              <p className="text-lg text-slate-200 max-w-xl">
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
                  className="rounded h-12 px-6 font-semibold border-2 border-white/80 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                >
                  <Link href="https://wa.me/923046668810" target="_blank" rel="noopener noreferrer">
                    WhatsApp for Best Rate
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </HeroCurrencyBackdrop>
      </section>

      <section className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <LiveExchangeRatesBlock rates={rates as any} disableInnerContainer={false} />
      </section>

      <CurrencyConverterBlock rates={rates as any} disableInnerContainer={false} />

      <section className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <ServicesGridBlock services={services as any} disableInnerContainer={false} />
      </section>

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
                    <h3 className="text-lg font-bold text-[#099546] mb-3 leading-snug">{item.title}</h3>
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
