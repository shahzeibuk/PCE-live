import Image from 'next/image'
import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { pickRandomHeroBackgroundPair } from '@/utilities/heroBackgrounds'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { mobile, desktop } = pickRandomHeroBackgroundPair()

  return (
    <div className="relative flex min-h-[min(85vh,40rem)] w-full flex-col items-center justify-center overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {media && typeof media === 'object' ? (
          <Media fill imgClassName="object-cover object-center" priority resource={media} />
        ) : (
          <>
            <Image
              src={mobile}
              alt=""
              fill
              className="object-cover object-[center_40%] md:hidden"
              sizes="100vw"
              priority
            />
            <Image
              src={desktop}
              alt=""
              fill
              className="hidden object-cover object-center md:block"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-slate-950/70" />
          </>
        )}
      </div>

      <div className="container relative z-10 mx-auto flex w-full min-w-0 justify-center px-4 py-14 sm:py-16 md:py-20">
        <div className="w-full max-w-[36.5rem] text-center md:mx-auto">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i} className="min-w-0 sm:inline-flex sm:justify-center">
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
