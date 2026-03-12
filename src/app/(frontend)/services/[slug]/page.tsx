import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, HeadphonesIcon } from 'lucide-react'

// Mock RichText for isolation
const RichText = (props: any) => <div {...props} />

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
        <div className="container">
            <h1 className="text-4xl font-bold">{service.title}</h1>
            <div className="py-8">
                <Button>Debug Button</Button>
            </div>
            <p>Debug Mode - Isolating undefined component error.</p>
        </div>
    </main>
  )
}
