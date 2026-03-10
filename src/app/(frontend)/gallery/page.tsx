import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { Media } from '@/components/Media'

export default async function GalleryPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs: images } = (await payload.find({
    collection: 'gallery',
    limit: 100,
  })) as any

  return (
    <div className="pb-24">
      <section className="bg-primary/5 py-16 mb-12 border-b">
        <div className="container px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Our Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A glimpse into our offices, events, and the professional environment we provide for our clients.
          </p>
        </div>
      </section>

      <div className="container px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((item: any) => (
            <div key={item.id} className="group relative aspect-square overflow-hidden rounded-2xl bg-muted">
              <Media resource={item.image} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <p className="text-white/80 text-sm line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="text-center py-24 border-2 border-dashed rounded-3xl bg-muted/20">
            <h2 className="text-2xl font-semibold mb-2">No images found</h2>
            <p className="text-muted-foreground">Please check back later for updates to our gallery.</p>
          </div>
        )}
      </div>
    </div>
  )
}
