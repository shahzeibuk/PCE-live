import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { HeroCurrencyBackdrop } from '@/components/layout/currencyBrandSurfaces'

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const services = await payload.find({
      collection: 'services',
      limit: 100,
      select: {
        slug: true,
      },
    })

    return services.docs.map(({ slug }) => ({
      slug,
    }))
  } catch (error) {
    console.error('Error generating static params for services:', error)
    return []
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let service = null

  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'services',
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    service = docs[0]
  } catch (error) {
    console.error(`Error fetching service by slug ${slug}:`, error)
  }

  if (!service) {
    return notFound()
  }

  return (
    <div className="pb-20 md:pb-28">
      <div className="flush-under-site-header">
        <HeroCurrencyBackdrop
          minHeightClassName="min-h-[360px] md:min-h-[420px] h-[50vh] md:h-[56vh]"
          className="mb-12 md:mb-16"
        >
        <div className="hero-below-nav container flex w-full min-h-[inherit] flex-col justify-center py-8 text-white md:py-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl">
              {service.description}
            </p>
          </div>
        </div>
      </HeroCurrencyBackdrop>
      </div>

      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-slate max-w-none prose-headings:font-bold">
              <RichText data={service.content} enableGutter={false} />
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-6 md:p-8 bg-slate-50 rounded border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Need help?</h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Speak with our team for quotes and branch timings.
              </p>
              <Button
                asChild
                className="w-full h-11 rounded bg-[#099546] hover:bg-[#088040] text-white font-semibold"
              >
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
