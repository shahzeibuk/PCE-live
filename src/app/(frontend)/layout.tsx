import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Inter } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { TawkToWidget } from '@/components/chat/TawkToWidget'
import { SitePopupBanner } from '@/components/SitePopupBanner'
import { Footer } from '@/Footer/Component'
import Header from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import {
  promoBannerGlobalToClientProps,
  type PromoBannerClientProps,
} from '@/utilities/getPromoBannerProps'
import { draftMode } from 'next/headers'
import { unstable_noStore as noStore } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  noStore()
  const { isEnabled } = await draftMode()

  let promoBannerData: PromoBannerClientProps | null = null
  try {
    const payload = await getPayload({ config: configPromise })
    const promo = await payload.findGlobal({ slug: 'promoBanner', depth: 2 })
    promoBannerData = promoBannerGlobalToClientProps(promo)
  } catch (err) {
    console.error('Promo banner global load failed:', err)
  }

  return (
    <html
      className={cn(inter.variable)}
      lang="en"
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <SitePopupBanner data={promoBannerData} />

          <Header />
          <main className="site-main flex min-h-0 min-w-0 flex-1 flex-col overflow-x-clip bg-white">
            {children}
          </main>
          <Footer />
          <TawkToWidget />
        </Providers>
      </body>
    </html>
  )
}

const siteDescription =
  'Check the latest USD, SAR, AED, and EUR to PKR open market exchange rates in Pakistan. Live forex rates, currency exchange, and remittance services nationwide.'

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Live Currency Exchange Rates in Pakistan | Pakistan Currency Exchange',
    template: '%s | Pakistan Currency Exchange',
  },
  description: siteDescription,
  openGraph: mergeOpenGraph({
    title: 'Live Currency Exchange Rates in Pakistan | Pakistan Currency Exchange',
    description: siteDescription,
  }),
  twitter: {
    card: 'summary_large_image',
    creator: '@pakistancurrency',
  },
}
