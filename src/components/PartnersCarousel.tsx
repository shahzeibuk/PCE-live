'use client'

import React from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

import { partnerLogosForCarouselLoop } from '@/constants/partnerLogos'

export function PartnersCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  )

  const partners = partnerLogosForCarouselLoop()

  return (
    <div className="w-full py-12 bg-white overflow-hidden border-y border-border/50">
      <div className="container px-4 md:px-6 mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-4">
          Our Valued Partners
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We collaborate with leading global financial institutions to provide you with seamless and secure transactions.
        </p>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {partners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-[0_0_50%] min-w-0 pl-4 sm:flex-[0_0_33%] md:flex-[0_0_25%] lg:flex-[0_0_20%]"
              >
                <div className="flex items-center justify-center h-24 p-4 grayscale hover:grayscale-0 transition-colors duration-200">
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={160}
                    height={80}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Gradient fades for edge smoothing */}
        <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </div>
  )
}
