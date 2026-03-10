import React from 'react'
import { CurrencyTable } from '@/components/CurrencyTable'
import { CurrencyConverter } from '@/components/CurrencyConverter'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const { docs: rates } = await payload.find({
    collection: 'currency-rates',
    sort: 'currency_name',
  })

  // Basic types for the converter
  const converterRates = rates.map(r => ({
    id: r.id,
    currency_name: r.currency_name,
    currency_code: r.currency_code,
    buy_rate: r.buy_rate,
    sell_rate: r.sell_rate,
  }))

  return (
    <div className="container mx-auto py-12 px-4">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Pakistan Currency Exchange
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Providing safe, reliable, and competitive currency exchange services across Pakistan.
        </p>
      </section>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <CurrencyTable />
        </div>
        <div>
          <CurrencyConverter rates={converterRates} />
        </div>
      </div>
    </div>
  )
}
