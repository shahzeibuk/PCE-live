import type { Metadata } from 'next'
import { getPayload } from 'payload'
import React from 'react'

import { CampaignCard } from '@/components/CampaignCard'
import configPromise from '@/payload.config'

export const dynamic = 'force-dynamic'

const pageTitle = 'Campaign'
const pageDescription =
  'Explore current and past campaigns from Pakistan Currency Exchange — offers, promotions, and updates.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
}

export default async function CampaignPage() {
  const payload = await getPayload({ config: configPromise })

  let campaigns: Awaited<ReturnType<typeof payload.find>>['docs'] = []

  try {
    const result = await payload.find({
      collection: 'campaigns',
      depth: 1,
      limit: 100,
      sort: '-published_date',
      overrideAccess: false,
    })
    campaigns = result.docs ?? []
  } catch (err) {
    console.error('Failed to fetch campaigns:', err)
  }

  return (
    <div className="pb-16 md:pb-24">
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="container px-4 py-10 text-center md:py-12">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{pageTitle}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600">{pageDescription}</p>
        </div>
      </div>

      <div className="container px-4 pt-10 md:pt-12">
        {campaigns.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 py-12 text-center text-slate-600">
            Campaigns will be published here soon.
          </p>
        ) : (
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
