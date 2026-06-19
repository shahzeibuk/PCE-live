import type { GlobalConfig } from 'payload'

import { isAdmin, hideFromNonAdmin } from '@/access/roles'
import { link } from '@/fields/link'
import { revalidateHomeHero } from './hooks/revalidateHomeHero'

export const HomeHero: GlobalConfig = {
  slug: 'homeHero',
  label: 'Homepage hero (banners)',
  admin: {
    hidden: hideFromNonAdmin,
    description: 'Carousel under the site header — image, headline, and text per slide. CTAs apply to all slides.',
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'banners',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Banner',
        plural: 'Banners',
      },
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Wide hero image (e.g. 1920×900).',
          },
        },
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Eyebrow',
          defaultValue: 'Pakistan Currency Exchange',
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Headline',
          required: true,
        },
        {
          name: 'leadShort',
          type: 'textarea',
          label: 'Short lead (phones)',
          admin: {
            description: 'Shown on small screens under the headline.',
          },
        },
        {
          name: 'lead',
          type: 'textarea',
          label: 'Lead paragraph',
          admin: {
            description: 'Shown from sm breakpoint upward.',
          },
        },
      ],
    },
    {
      name: 'primaryCta',
      type: 'group',
      label: 'Primary button',
      fields: [
        {
          name: 'buttonLabel',
          type: 'text',
          label: 'Label',
          required: true,
          defaultValue: "Check Today's Rates",
        },
        link({ appearances: false, disableLabel: true }),
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      label: 'Secondary button',
      fields: [
        {
          name: 'buttonLabel',
          type: 'text',
          label: 'Label',
          required: true,
          defaultValue: 'WhatsApp for Best Rate',
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
          defaultValue: 'https://wa.me/923046668810',
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open in new tab',
          defaultValue: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHomeHero],
  },
}
