import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { ServiceCard } from '@/components/ServiceCard'

export default async function ServicesPage() {
  let services: any[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'services',
      sort: 'title',
      limit: 100,
    })
    services = result.docs
  } catch (error) {
    console.error('Error fetching services:', error)
  }

  return (
    <div className="pb-24">
      <section className="bg-primary/5 py-16 mb-12 border-b">
        <div className="container px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive financial solutions tailored for individuals and businesses across Pakistan.
          </p>
        </div>
      </section>

      <div className="container px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: any) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              slug={service.slug}
              hero_image={service.hero_image}
            />
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-24 border-2 border-dashed rounded-3xl bg-muted/20">
            <h2 className="text-2xl font-semibold mb-2">No services found</h2>
            <p className="text-muted-foreground">Please check back later or contact us for more information.</p>
          </div>
        )}
      </div>
    </div>
  )
}
