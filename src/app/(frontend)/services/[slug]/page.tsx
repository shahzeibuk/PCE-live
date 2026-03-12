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
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center mb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Media resource={service.hero_image} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
        </div>

        <div className="container relative z-10 text-white">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-1 w-12 bg-[#099546]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#099546]">Remittance & Exchange</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl">
              {service.description || "Fast, secure and reliable financial solutions tailored for your needs."}
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <RichText data={service.content} enableGutter={false} />
            </div>

            {/* Features/Trust Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 border rounded-3xl bg-white dark:bg-slate-950 flex gap-4 transition-all hover:shadow-xl group">
                    <div className="size-12 rounded-2xl bg-[#099546]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <ArrowRight className="w-6 h-6 text-[#099546]" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Rapid Processing</h3>
                        <p className="text-muted-foreground">Get your funds transferred within minutes through our global network.</p>
                    </div>
                </div>
                <div className="p-8 border rounded-3xl bg-white dark:bg-slate-950 flex gap-4 transition-all hover:shadow-xl group">
                    <div className="size-12 rounded-2xl bg-[#099546]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-6 h-6 text-[#099546]" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Trusted Partners</h3>
                        <p className="text-muted-foreground">Collaborating with global leaders like Western Union & MoneyGram.</p>
                    </div>
                </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200/50 dark:border-slate-800/50">
                <div className="size-16 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-6">
                    <ShieldCheck className="w-8 h-8 text-[#099546]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter text-slate-900 dark:text-white">Secure & Verified</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Licensed and regulated exchange house ensuring every transaction is monitored and protected.
                </p>
                <ul className="space-y-4">
                    {[
                        { icon: ShieldCheck, text: "End-to-end Encryption" },
                        { icon: Clock, text: "24/7 Monitoring" },
                        { icon: HeadphonesIcon, text: "Dedicated Support" }
                    ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                            <item.icon className="w-4 h-4 text-[#099546]" />
                            {item.text}
                        </li>
                    ))}
                </ul>
                <Button className="w-full mt-8 h-14 rounded-2xl font-bold text-lg">
                    Contact Agent
                </Button>
            </div>
            
            <div className="p-8 bg-[#099546] rounded-3xl text-white shadow-2xl shadow-[#099546]/20">
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter">Need Assistance?</h3>
                <p className="text-white/80 mb-6 font-medium">
                    Call our toll-free support for immediate help with your remittance.
                </p>
                <div className="text-3xl font-black mb-8 tracking-tight">0800-13537</div>
                <Button variant="secondary" className="w-full h-14 rounded-2xl text-black font-bold hover:scale-105 transition-transform">
                    Talk to Support
                </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
