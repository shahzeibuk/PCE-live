import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { ServiceCard } from '@/components/ServiceCard'
import { InnerPageHeader } from '@/components/layout/InnerPageHeader'

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
    <div className="pb-16 md:pb-24">
      <InnerPageHeader
        variant="currency"
        title="Our Services"
        description="Exchange, remittance, and business solutions for individuals and companies across Pakistan."
      />

      <div className="container px-4 py-10 md:py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service: any) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.short_description || service.description}
              slug={service.slug}
              hero_image={service.hero_image}
              icon={service.icon}
            />
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-20 border border-dashed border-slate-300 rounded bg-slate-50">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">No services found</h2>
            <p className="text-slate-600 text-sm">Check back later or contact us.</p>
          </div>
        )}
      </div>
    </div>
  )
}
