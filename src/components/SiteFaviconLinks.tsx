import React from 'react'

import type { SiteBranding } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getSiteBrandingFaviconPaths } from '@/utilities/siteBrandingFavicons'

export async function SiteFaviconLinks() {
  const defaults = getSiteBrandingFaviconPaths(null)

  let paths = defaults

  try {
    const branding = (await getCachedGlobal('siteBranding', 1)()) as SiteBranding
    paths = getSiteBrandingFaviconPaths(branding)
  } catch {
    paths = defaults
  }

  return (
    <>
      <link href={paths.ico} rel="icon" sizes="32x32" />
      <link href={paths.svg} rel="icon" type="image/svg+xml" />
    </>
  )
}
