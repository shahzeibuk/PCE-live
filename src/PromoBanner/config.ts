import type { GlobalConfig } from 'payload'

import { isAdmin, hideFromNonAdmin } from '@/access/roles'
import { revalidatePromoBanner } from './hooks/revalidatePromoBanner'

export const PromoBanner: GlobalConfig = {
  slug: 'promoBanner',
  label: 'Promotion popup',
  admin: {
    hidden: hideFromNonAdmin,
    description: 'Full-screen image popup for offers. Shown until the visitor dismisses it (per version).',
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Show promotion popup',
      defaultValue: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Required when the popup is enabled. Landscape (e.g. 1200×800) works best.',
      },
    },
    {
      name: 'imageAlt',
      type: 'text',
      label: 'Image description (accessibility)',
      defaultValue: 'Promotion',
      required: true,
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Click-through (optional)',
      fields: [
        {
          name: 'url',
          type: 'text',
          label: 'Link URL',
          admin: {
            description: 'Internal path (e.g. /currency-rates) or full URL. Leave empty for no link.',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open in new tab',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'dismissalVersion',
      type: 'number',
      label: 'Dismissal version',
      defaultValue: 1,
      min: 1,
      required: true,
      admin: {
        description:
          'Increase this when you change the promotion so visitors who already closed the popup will see the new one.',
      },
    },
    {
      name: 'maxWidth',
      type: 'select',
      label: 'Maximum width on large screens',
      defaultValue: 'max-w-2xl',
      options: [
        { label: 'Narrow (max-w-md)', value: 'max-w-md' },
        { label: 'Small (max-w-lg)', value: 'max-w-lg' },
        { label: 'Medium (max-w-2xl)', value: 'max-w-2xl' },
        { label: 'Wide (max-w-3xl)', value: 'max-w-3xl' },
        { label: 'Extra wide (max-w-4xl)', value: 'max-w-4xl' },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePromoBanner],
  },
}
