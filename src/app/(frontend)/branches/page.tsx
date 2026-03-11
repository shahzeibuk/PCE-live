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
        <div className="container relative z-10 px-4 text-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl border border-white/20">
            <MapPinned className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">Find a Branch Near You</h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            With a growing network of over 130+ branches nationwide, seamless currency exchange is always just around the corner.
          </p>
        </div>
      </section>

      {/* Locator Tool */}
      <section className="container px-4 -mt-12 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border p-8 md:p-12 min-h-[500px]">
           <BranchLocator branches={branches} />
        </div>
      </section>
    </div>
  )
}
