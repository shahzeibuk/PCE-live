import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Converter } from './Converter'

export type CurrencyConverterProps = {
  title?: string
}

export const CurrencyConverterBlock: React.FC<CurrencyConverterProps> = async ({ title }) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: rates } = await payload.find({
    collection: 'currency-rates',
    limit: 100,
  })

  return (
    <div className="bg-muted/30 py-20 border-y border-border/50">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight">{title || 'Currency Converter'}</h2>
          <p className="text-muted-foreground mt-4 text-lg">Calculate live currency exchange rates with our real-time tool.</p>
        </div>
        <Converter rates={rates} />
      </div>
    </div>
  )
}
