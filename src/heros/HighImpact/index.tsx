'use client'
import Image from 'next/image'
import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CURRENCY_HERO_BACKGROUND_IMAGE } from '@/constants/currencyBrand'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="relative flex items-center justify-center text-white">
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none relative">
        {media && typeof media === 'object' ? (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        ) : (
          <>
            <Image
              src={CURRENCY_HERO_BACKGROUND_IMAGE}
              alt=""
              fill
              className="-z-10 object-cover object-center"
              sizes="100vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-slate-950/50 -z-[9]" aria-hidden />
          </>
        )}
      </div>
    </div>
  )
}
