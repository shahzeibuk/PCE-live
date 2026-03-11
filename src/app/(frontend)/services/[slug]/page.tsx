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
  const { docs: services } = await payload.find({
    collection: 'services',
    limit: 100,
  })

  return services.map((service) => ({
    slug: service.slug,
  }))
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const payload = await getPayload({ config: configPromise })

  const { docs: services } = await payload.find({
    collection: 'services',
    where: {
      slug: {
        equals: params.slug,
      },
    },
  })

  const service = services[0] as any

  if (!service) {
    return notFound()
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900/20 min-h-screen pb-24">
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white dark:bg-slate-950 border-b">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 dark:opacity-10" />
        <div className="container relative z-10 px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              Our Services
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white leading-tight">
              {service.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              {service.description || 'Professional currency and remittance solutions tailored to your needs.'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container px-4 mt-12 grid lg:grid-cols-12 gap-12">
        {/* Left Column: Content */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Main Image if available */}
          {service.hero_image && (
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-sm border bg-white">
              <Media resource={service.hero_image} fill className="object-cover" />
            </div>
          )}

          {/* Description / Rich Text Content */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border shadow-sm">
            <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Overview</h2>
            {/* The prose prose-lg class handles the lexical rich text clean formatting */}
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80">
              <RichText data={service.content} enableGutter={false} />
            </div>
          </section>

          {/* Process Steps */}
          {service.process_steps && service.process_steps.length > 0 && (
            <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border shadow-sm">
              <h2 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white">How It Works</h2>
              <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-6 space-y-12">
                {service.process_steps.map((item: any, index: number) => (
                  <div key={index} className="relative pl-10">
                    <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold ring-4 ring-white dark:ring-slate-900 shadow-md">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 pt-1">{item.step}</h3>
                    {item.description && <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{item.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Features/Trust Sidebar Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Why Choose Us</h3>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Secure & Regulated</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">SBP approved with strict compliance protocols.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Fast Processing</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">Quick and hassle-free transactions at all branches.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <HeadphonesIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Dedicated Support</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">Our experts are here to help you every step of the way.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          {service.benefits && service.benefits.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Key Benefits</h3>
              <ul className="space-y-4">
                {service.benefits.map((item: any, index: number) => (
                  <li key={index} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{item.benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sticky CTA */}
          <div className="sticky top-28 bg-primary text-primary-foreground rounded-3xl p-8 shadow-xl text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
            <p className="mb-8 text-primary-foreground/90 leading-relaxed">Visit any of our branches or contact us for more information on {service.title}.</p>
            <div className="space-y-3">
              <Button asChild size="lg" variant="secondary" className="w-full rounded-xl h-14 font-bold text-lg shadow-sm">
                <Link href={service.cta_link || '/contact'}>
                  {service.cta_text || 'Contact Us Now'}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full rounded-xl h-14 font-bold text-lg bg-transparent border-white/30 text-white hover:bg-white hover:text-primary transition-colors">
                <Link href="/branches">
                  Find a Branch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
