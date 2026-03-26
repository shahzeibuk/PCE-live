import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import React from 'react'
import { BranchLocator } from '@/components/BranchLocator'
import type { Metadata } from 'next'
import { InnerPageHeader } from '@/components/layout/InnerPageHeader'

export const metadata: Metadata = {
  title: 'Our Branches - Locate Us Nationwide',
  description:
    'Find a Pakistan Currency Exchange branch near you. Over 130 branches across Pakistan for currency exchange and remittance.',
}

export default async function BranchesPage() {
  let branches: any[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'branches',
      limit: 500,
      sort: 'city',
    })
    branches = result.docs
  } catch (error) {
    console.error('Error fetching branches:', error)
  }

  return (
    <div className="pb-16 md:pb-24 bg-slate-50">
      <InnerPageHeader
        variant="brand"
        title="Find a Branch Near You"
        description="130+ locations nationwide — seamless currency exchange and remittance, always within reach."
      />

      <section className="container px-4 -mt-4 md:-mt-6 relative z-10 pb-4">
        <div className="bg-white rounded border border-slate-200 p-6 md:p-8 min-h-[420px] shadow-sm">
          <BranchLocator branches={branches} />
        </div>
      </section>
    </div>
  )
}
