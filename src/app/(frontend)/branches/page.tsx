import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import React from 'react'
import { BranchLocator } from '@/components/BranchLocator'
import { MapPinned } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Branches - Locate Us Nationwide',
  description: 'Find a Pakistan Currency Exchange branch near you. We have over 130 branches across Pakistan offering quick, secure, and reliable currency exchange and remittance services.',
}

export default async function BranchesPage() {
  const payload = await getPayload({ config: configPromise })
  
  const { docs: branches } = (await payload.find({
    collection: 'branches',
    limit: 500, // Fetch all branches
    sort: 'city',
  })) as any

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900/20 pb-24">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
        <div className="container relative z-10 px-4">
          <MapPinned className="w-12 h-12 text-white/80 mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Find a Branch Near You</h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl leading-relaxed">
            With a growing network of over 130+ branches nationwide, seamless currency exchange is always just around the corner.
          </p>
        </div>
      </section>

      {/* Locator Tool */}
      <section className="container px-4 -mt-8 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md border p-6 md:p-8 min-h-[500px]">
           <BranchLocator branches={branches} />
        </div>
      </section>
    </div>
  )
}
