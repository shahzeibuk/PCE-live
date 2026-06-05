import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getCurrencyRatesForFrontend } from '@/utilities/getCurrencyRatesForFrontend'

import { HOME_INDEX_HEADING_CLASS } from '@/components/home/homeContent'
import type { BookingBranch } from '@/components/currency/CurrencyBooking'
import { Converter } from './Converter'

export type CurrencyConverterProps = {
  title?: string
  rates?: any[]
  disableInnerContainer?: boolean
}

export const CurrencyConverterBlock: React.FC<CurrencyConverterProps> = async ({
  title,
  rates: providedRates,
  disableInnerContainer = false,
}) => {
  let rates = providedRates
  let branches: BookingBranch[] = []

  const payload = await getPayload({ config: configPromise })

  if (!rates) {
    rates = await getCurrencyRatesForFrontend(payload, { limit: 100 })
  }

  try {
    const { docs } = await payload.find({
      collection: 'branches',
      limit: 50,
      sort: 'branch_name',
      depth: 0,
      select: { branch_name: true, city: true },
    })
    branches = docs.map((b) => ({
      id: b.id,
      branch_name: b.branch_name,
      city: b.city,
    }))
  } catch {
    branches = []
  }

  const containerClasses = disableInnerContainer ? '' : 'bg-slate-100 py-16 md:py-20 border-y border-slate-200'

  return (
    <div className={containerClasses}>
      <div className={disableInnerContainer ? '' : 'container px-4'}>
        {!disableInnerContainer && (
          <h2 className={`text-2xl md:text-3xl text-center mb-10 ${HOME_INDEX_HEADING_CLASS}`}>
            {title || 'Currency Booking'}
          </h2>
        )}
        <Converter rates={(rates ?? []) as any} branches={branches} />
      </div>
    </div>
  )
}
