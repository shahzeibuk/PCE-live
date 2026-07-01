import type { Metadata } from 'next'
import { getPayload } from 'payload'
import React from 'react'

import { FinancialReportCard } from '@/components/FinancialReportCard'
import configPromise from '@/payload.config'

export const dynamic = 'force-dynamic'

const pageTitle = 'Financial Reports'
const pageDescription =
  'View and download Pakistan Currency Exchange financial reports, statements, and transparency documents.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
}

export default async function FinancialReportsPage() {
  const payload = await getPayload({ config: configPromise })

  let reports: Awaited<ReturnType<typeof payload.find>>['docs'] = []

  try {
    const result = await payload.find({
      collection: 'financial-reports',
      depth: 1,
      limit: 100,
      sort: '-published_date',
      overrideAccess: false,
    })
    reports = result.docs ?? []
  } catch (err) {
    console.error('Failed to fetch financial reports:', err)
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
        {reports.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 py-12 text-center text-slate-600">
            Financial reports will be published here soon.
          </p>
        ) : (
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
            {reports.map((report) => (
              <FinancialReportCard key={report.id} report={report} variant="grid" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
