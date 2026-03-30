import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'
import React from 'react'
import { MapPin, Phone, Mail, Navigation, Building2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getBranchMapEmbedUrl } from '@/utilities/branchMapEmbed'
import { getServerSideURL } from '@/utilities/getURL'

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs: branches } = await payload.find({
      collection: 'branches',
      limit: 1000,
    })

    return branches.map((branch) => ({
      id: String(branch.id),
    }))
  } catch (error) {
    console.error('Error generating static params for branches:', error)
    return []
  }
}

export default async function BranchPage({ params }: { params: { id: string } }) {
  let branch = null
  try {
    const payload = await getPayload({ config: configPromise })
    branch = await payload.findByID({
      collection: 'branches',
      id: params.id,
    })
  } catch (e) {
    console.error(`Error fetching branch by ID ${params.id}:`, e)
    return notFound()
  }

  if (!branch) return notFound()

  const mapSrc = getBranchMapEmbedUrl({
    address: branch.address,
    city: branch.city,
    google_map_link: branch.google_map_link,
  })

  const localSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Pakistan Currency Exchange — ${branch.branch_name}`,
    url: `${getServerSideURL().replace(/\/$/, '')}/branches/${branch.id}`,
    telephone: branch.phone ?? undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: branch.address,
      addressLocality: branch.city,
      addressCountry: 'PK',
    },
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-16 md:pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
      <div className="container px-4 max-w-4xl mx-auto pt-6 md:pt-8">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4 text-muted-foreground hover:text-primary">
            <Link href="/branches">← Back to All Branches</Link>
          </Button>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-white text-muted-foreground mb-2">
                {branch.city}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{branch.branch_name}</h1>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 border shadow-sm">
              <h2 className="text-xl font-bold mb-6">Branch Details</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Address</p>
                    <p className="text-muted-foreground leading-relaxed">{branch.address}</p>
                    {branch.google_map_link && (
                      <a href={branch.google_map_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline mt-2 text-sm font-medium">
                        View on Google Maps <Navigation className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {branch.phone && (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Phone</p>
                      <p className="text-muted-foreground">{branch.phone}</p>
                    </div>
                  </div>
                )}

                {branch.email && (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <a href={`mailto:${branch.email}`} className="text-primary hover:underline">{branch.email}</a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {mapSrc ? (
              <div className="bg-white rounded-3xl p-4 md:p-6 border shadow-sm overflow-hidden">
                <h2 className="text-lg font-bold mb-4 px-2">Location map</h2>
                <iframe
                  title={`Map: ${branch.branch_name}`}
                  src={mapSrc}
                  className="w-full h-64 md:h-80 rounded-2xl border-0 bg-slate-100"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                {branch.google_map_link ? (
                  <p className="text-center mt-3 text-sm">
                    <a
                      href={branch.google_map_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-medium hover:underline"
                    >
                      Open in Google Maps
                    </a>
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="space-y-6">
            <div className="bg-primary text-primary-foreground rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Need Assistance?</h3>
              <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                Contact our customer support team for any questions regarding currency exchange rates or branch services.
              </p>
              <Button asChild variant="secondary" className="w-full h-12 rounded-xl font-bold">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
