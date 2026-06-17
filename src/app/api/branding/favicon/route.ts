import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import { getSiteBrandingFaviconPaths, toAbsoluteSiteUrl } from '@/utilities/siteBrandingFavicons'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const variant = searchParams.get('variant') === 'svg' ? 'svg' : 'ico'

  let paths = getSiteBrandingFaviconPaths(null)

  try {
    const payload = await getPayload({ config: configPromise })
    const branding = await payload.findGlobal({
      slug: 'siteBranding',
      depth: 1,
    })
    paths = getSiteBrandingFaviconPaths(branding)
  } catch {
    paths = getSiteBrandingFaviconPaths(null)
  }

  const target = variant === 'svg' ? paths.svg : paths.ico

  return NextResponse.redirect(toAbsoluteSiteUrl(target), 307)
}
