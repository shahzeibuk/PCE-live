import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Header as HeaderType } from '@/payload-types'
import { FloatingHeader } from '@/components/ui/floating-header'
import { mergeServiceNavLinks, type ServiceNavLink } from '@/Header/serviceNav'

export default async function Header() {
  const headerData: HeaderType = await getCachedGlobal('header', 1)()

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

  const serviceNavLinks = mergeServiceNavLinks(fromCms)

  return <FloatingHeader data={headerData} serviceNavLinks={serviceNavLinks} />
}
