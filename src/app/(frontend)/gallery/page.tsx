import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { Media } from '@/components/Media'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function GalleryPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs: galleryItems } = (await payload.find({
    collection: 'gallery',
    limit: 100,
  })) as any

  return (
    <div className="pb-24 pt-16 text-slate-900 dark:text-slate-100">
      <section className="bg-primary/5 py-20 mb-12 border-b relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#099546]/5 rounded-full -ml-40 -mt-40 blur-3xl opacity-50" />
        <div className="container px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-[#099546]">
            Our Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Capturing the milestones, events, and everyday excellence at Pakistan Currency Exchange.
          </p>
        </div>
      </section>

      <div className="container px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item: any) => (
            <div 
              key={item.id} 
              className="group relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 aspect-4/3 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <Media 
                resource={item.image} 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/50 to-transparent p-6 text-white translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                {item.title && <h3 className="font-bold text-xl mb-2 tracking-tight">{item.title}</h3>}
                {item.description && <p className="text-sm line-clamp-2 text-slate-200 leading-relaxed font-medium">{item.description}</p>}
              </div>
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none" />
            </div>
          ))}
        </div>

        {galleryItems.length === 0 && (
          <div className="text-center py-24 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">The gallery is empty</h2>
            <p className="text-slate-500">Check back later as we add glimpses of our journey.</p>
          </div>
        )}
      </div>
    </div>
  )
}
