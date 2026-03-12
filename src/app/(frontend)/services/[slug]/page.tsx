import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'

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
  return <div>Service Page Debug</div>
}
