import type { GlobalConfig } from 'payload'

import { isAdmin, hideFromNonAdmin } from '@/access/roles'
import { revalidateHomeServices } from './hooks/revalidateHomeServices'

export const HomeServices: GlobalConfig = {
  slug: 'homeServices',
  label: 'Homepage services (boxes)',
  admin: {
    hidden: hideFromNonAdmin,
    description:
      'Title, intro, and service boxes on the homepage (three across, then two). Upload an icon image for each box.',
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Our services',
      label: 'Section title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section description',
      admin: {
        description: 'Short paragraph under the title (centered).',
      },
    },
    {
      name: 'boxes',
      type: 'array',
      minRows: 0,
      maxRows: 8,
      labels: {
        singular: 'Service box',
        plural: 'Service boxes',
      },
      admin: {
        initCollapsed: false,
        description: 'Add up to five for the 3+2 layout; if empty, the site uses default copy and icons.',
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Icon image',
          admin: {
            description: 'Square PNG/SVG/WebP (e.g. 128×128).',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Heading',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
        {
          name: 'ctaLabel',
          type: 'text',
          required: true,
          label: 'Button label',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Link URL',
          admin: {
            description: 'Internal path (e.g. /branches) or full URL.',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open link in new tab',
          defaultValue: false,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHomeServices],
  },
}
