import React from 'react'
import { CurrencyTable } from '@/components/CurrencyTable'
import { CurrencyConverter } from '@/components/CurrencyConverter'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export default async function RatesPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs: rates } = (await payload.find({
    collection: 'currency-rates',
    sort: 'currency_name',
    limit: 100,
  })) as any

  const converterRates = rates.map((r: any) => ({
    id: r.id,
    currency_name: r.currency_name,
    currency_code: r.currency_code,
    buy_rate: r.buy_rate,
    sell_rate: r.sell_rate,
  }))

  return (
    <div className="pb-24">
      <section className="bg-primary/5 py-16 mb-12 border-b">
        <div className="container px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Live Exchange Rates</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get the most competitive rates in the market. Updated regularly based on market movements.
          </p>
        </div>
      </section>

      <div className="container px-4 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
             <CurrencyTable />
          </div>
          <div className="mt-8 p-6 bg-muted/30 rounded-xl border border-dashed">
            <p className="text-sm text-balance">
              <strong>Disclaimer:</strong> Rates are subject to change without notice due to market volatility. 
              The rates provided here are for information purposes only. Please confirm the rates with our branches 
              before making any transaction.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <CurrencyConverter rates={converterRates} />
          
          <div className="bg-card border rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Need Bulk Exchange?</h3>
            <p className="text-muted-foreground mb-6">
              For large transactions, we offer special rates. Contact our treasury department or visit our main branch.
            </p>
            <ul className="space-y-3 text-sm mb-6">
              <li className="flex justify-between">
                <span>Working Hours:</span>
                <span className="font-medium text-foreground">9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Mon - Sat:</span>
                <span className="font-medium text-foreground">Open</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-medium text-destructive">Closed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
