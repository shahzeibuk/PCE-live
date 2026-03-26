import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getCurrencyRatesForFrontend } from '@/utilities/getCurrencyRatesForFrontend'

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

  if (!rates) {
    const payload = await getPayload({ config: configPromise })
    rates = await getCurrencyRatesForFrontend(payload, { limit: 100 })
  }

  const containerClasses = disableInnerContainer ? '' : 'bg-slate-100 py-16 md:py-20 border-y border-slate-200'

  return (
    <div className={containerClasses}>
      <div className={disableInnerContainer ? '' : 'container px-4'}>
        {!disableInnerContainer && (
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-10">
            {title || 'Currency Converter'}
          </h2>
        )}
        <Converter rates={(rates ?? []) as any} />
      </div>
    </div>
  )
}
