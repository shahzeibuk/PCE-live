import { CurrencyTable } from '@/components/CurrencyTable'
import { CurrencyConverter } from '@/components/CurrencyConverter'
import { ServiceCard } from '@/components/ServiceCard'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const { docs: rates } = (await payload.find({
    collection: 'currency-rates',
    sort: 'currency_name',
  })) as any

  const { docs: services } = (await payload.find({
    collection: 'services',
    limit: 6,
  })) as any

  // Basic types for the converter
  const converterRates = rates.map((r: any) => ({
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

      <section className="mt-24">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Our Services</h2>
            <p className="text-muted-foreground">Professional financial solutions for your needs</p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: any) => (
            <ServiceCard 
              key={service.id}
              title={service.title}
              description={service.description}
              slug={service.slug}
              hero_image={service.hero_image}
            />
          ))}
          {services.length === 0 && (
            <p className="col-span-full text-center py-12 text-muted-foreground border rounded-lg bg-muted/50">
              Check back soon for our list of services.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
