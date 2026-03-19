import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Converter } from './Converter'

export type CurrencyConverterProps = {
  title?: string
  rates?: any[]
  disableInnerContainer?: boolean
}

export const CurrencyConverterBlock: React.FC<CurrencyConverterProps> = async ({ 
  title, 
  rates: providedRates,
  disableInnerContainer = false
}) => {
  let rates = providedRates

  if (!rates) {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'currency-rates',
      limit: 100,
    })
    rates = result.docs
  }

  const containerClasses = disableInnerContainer ? "" : "bg-muted/30 py-20 border-y border-border/50"

  return (
    <div className={containerClasses}>
      <div className={disableInnerContainer ? "" : "container"}>
        {!disableInnerContainer && (
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight">{title || 'Currency Converter'}</h2>
            <p className="text-muted-foreground mt-4 text-lg">Calculate live currency exchange rates with our real-time tool.</p>
          </div>
        )}
        <Converter rates={rates} />
      </div>
    </div>
  )
}
