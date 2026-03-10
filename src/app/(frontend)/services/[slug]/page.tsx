import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default async function ServicePage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const { docs: services } = await payload.find({
    collection: 'services',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const service = services[0] as any

  if (!service) {
    return notFound()
  }

  return (
    <div className="pb-24">
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
        {service.hero_image && (
          <Media resource={service.hero_image} fill className="object-cover -z-10 brightness-50" />
        )}
        {!service.hero_image && <div className="absolute inset-0 bg-primary/90 -z-10" />}
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">{service.description}</p>
        </div>
      </section>

      <div className="container px-4 mt-16 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-6">Service Overview</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <RichText data={service.content} />
            </div>
          </section>

          {service.process_steps && service.process_steps.length > 0 && (
            <section className="bg-muted/30 p-8 rounded-2xl border">
              <h2 className="text-2xl font-bold mb-8">Our Process</h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {service.process_steps.map((item: any, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-lg font-medium">{item.step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-8">
          {service.benefits && service.benefits.length > 0 && (
            <div className="bg-card border rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Key Benefits</h3>
              <ul className="space-y-4">
                {service.benefits.map((item: any, index: number) => (
                  <li key={index} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item.benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
            <p className="mb-8 opacity-90">Visit any of our branches or contact us for more information.</p>
            <Button asChild size="lg" variant="secondary" className="w-full">
              <Link href={service.cta_link || '/contact'}>
                {service.cta_text || 'Contact Us Now'}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
