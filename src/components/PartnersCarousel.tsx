'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
                <Link
                  href={partner.href}
                  className="flex items-center justify-center h-28 md:h-32 p-4 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#099546] focus-visible:ring-offset-2 transition-transform duration-200 hover:scale-105 motion-reduce:hover:scale-100"
                >
                  <Image
                    src={partner.src}
                    alt={`${partner.name} — view service`}
                    width={260}
                    height={130}
                    className="max-h-24 md:max-h-28 w-auto object-contain"
                  />
                </Link>
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
