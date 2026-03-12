import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header as HeaderType } from '@/payload-types'
import { FloatingHeader } from '@/components/ui/floating-header'

export default async function Header() {
  const headerData: HeaderType = await getCachedGlobal('header', 1)()

  return <FloatingHeader data={headerData} />
}
