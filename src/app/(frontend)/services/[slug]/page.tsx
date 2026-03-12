import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, HeadphonesIcon } from 'lucide-react'

export async function generateStaticParams() {
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
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'services',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const service = docs[0] as any

  if (!service) {
    return notFound()
  }

  return (
    <main className="pt-24 pb-32">
      <section className="relative h-[60vh] min-h-[400px] flex items-center mb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Media resource={service.hero_image} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>

        <div className="container relative z-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <RichText data={service.content} enableGutter={false} />
            </div>
          </div>
          <div className="space-y-8">
            <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border">
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter">Secure Service</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Reliable financial solutions.
                </p>
                <Button className="w-full h-14 rounded-2xl font-bold text-lg">
                    Contact Agent
                </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
