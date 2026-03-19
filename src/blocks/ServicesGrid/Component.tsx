import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Media } from '@/components/Media'
import type { Service } from '@/payload-types'

export type ServicesGridProps = {
  title?: string
}

export const ServicesGridBlock: React.FC<ServicesGridProps> = async ({ title }) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: services } = await payload.find({
    collection: 'services',
    limit: 4,
  })

  return (
    <div className="container py-24">
      <div className="relative flex items-center justify-center mb-16">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border/80"></div>
        </div>
        <div className="relative bg-background px-8">
          <h2 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter">
            {title || 'Our Services'}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {services.map((service: Service) => (
          <div 
            key={service.id} 
            className="group relative bg-card p-10 rounded-3xl border border-border/60 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(9,149,70,0.15)] hover:-translate-y-3 hover:border-primary/20 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mb-8 border border-primary/10 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner">
                {service.icon ? (
                  <Media 
                    resource={service.icon} 
                    className="w-12 h-12 grayscale group-hover:grayscale-0 group-hover:invert group-hover:scale-110 transition-all duration-500" 
                  />
                ) : (
                  <div className="w-12 h-12 bg-primary/20 rounded-full" />
                )}
              </div>
              <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-primary transition-colors tracking-tight">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed line-clamp-3 font-medium">
                {service.short_description || service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-20">
        <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-5 rounded-2xl font-black text-xl shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all active:scale-95 uppercase tracking-tighter shadow-primary/20 group">
          Find Nearest Branch
          <svg 
            className="w-6 h-6 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
