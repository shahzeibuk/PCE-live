import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { revalidateSiteBranding } from './hooks/revalidateSiteBranding'

export const SiteBranding: GlobalConfig = {
  slug: 'siteBranding',
  label: 'Site branding',
  admin: {
    description:
      'Favicon and browser tab icons for the public website and admin panel. Leave empty to use the built-in defaults.',
  },
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Favicon (ICO or PNG)',
      admin: {
        description: 'Square icon for browser tabs (32×32 or 48×48 recommended). Used on the website and admin panel.',
      },
    },
    {
      name: 'faviconSvg',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Favicon (SVG)',
      admin: {
        description: 'Optional SVG version for sharper icons in modern browsers.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateSiteBranding],
  },
}
