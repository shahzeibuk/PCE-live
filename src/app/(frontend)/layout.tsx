import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Inter } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import Header from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(inter.variable)} lang="en" suppressHydrationWarning>
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

          <Header />
          <main className="site-main flex min-h-0 min-w-0 flex-1 flex-col bg-white dark:bg-slate-950">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Most Reliable Currency Exchange Rates Available',
    template: '%s | Pakistan Currency Exchange',
  },
  description: 'Pakistan currency exchange put forward feasibility, ease and convenience, our agenda revolves around the satisfaction of our customers that is integrated with good and best currency exchange rates in town along with updated list of rates everyday!',
  openGraph: mergeOpenGraph({
    title: 'Most Reliable Currency Exchange Rates Available',
    description: 'Pakistan currency exchange put forward feasibility, ease and convenience, our agenda revolves around the satisfaction of our customers that is integrated with good and best currency exchange rates in town along with updated list of rates everyday!',
  }),
  twitter: {
    card: 'summary_large_image',
    creator: '@pakistancurrency',
  },
}
