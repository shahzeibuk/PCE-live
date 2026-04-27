import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Header as HeaderType } from '@/payload-types'
import { FloatingHeader } from '@/components/ui/floating-header'
import { mergeServiceNavLinks, type ServiceNavLink } from '@/Header/serviceNav'

export default async function Header() {
  let headerData: HeaderType | null = null
  let serviceNavLinks: ServiceNavLink[] = []

  try {
    headerData = (await getCachedGlobal('header', 2)()) as HeaderType
    const payload = await getPayload({ config: configPromise })
    const { docs: serviceDocs } = await payload.find({
      collection: 'services',
      limit: 100,
      sort: 'title',
      depth: 0,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
      },
    })

    const fromCms: ServiceNavLink[] = serviceDocs
      .filter((d) => typeof d.slug === 'string' && d.slug.length > 0)
      .map((d) => ({
        title: d.title,
        href: `/services/${d.slug}`,
      }))

    serviceNavLinks = mergeServiceNavLinks(fromCms)
  } catch (err) {
    console.error('Header CMS load failed (check DATABASE_URL & migrations):', err)
  }

  return <FloatingHeader data={headerData} serviceNavLinks={serviceNavLinks} />
}
