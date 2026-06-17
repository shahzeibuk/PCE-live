import type { Payload } from 'payload'
import React from 'react'

import { getSiteBrandingFaviconPaths } from '@/utilities/siteBrandingFavicons'

import { Logo } from './Logo'

export const PayloadLogo = () => {
  return (
    <div className="flex items-center gap-2 py-2">
      <Logo className="h-12 w-auto" />
      <span className="font-bold tracking-tight text-[#099546] text-xl">PCE Admin</span>
    </div>
  )
}

type PayloadIconProps = {
  payload?: Payload
}

export const PayloadIcon = async ({ payload }: PayloadIconProps) => {
  let src = '/favicon.svg'

  if (payload) {
    try {
      const branding = await payload.findGlobal({
        slug: 'siteBranding',
        depth: 1,
      })
      src = getSiteBrandingFaviconPaths(branding).svg
    } catch {
      src = '/favicon.svg'
    }
  }

  return (
    <img
      src={src}
      alt="Pakistan Currency Exchange"
      width={28}
      height={28}
      className="block h-7 w-7 rounded-md object-contain"
    />
  )
}
