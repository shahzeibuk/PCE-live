import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '../access/anyone'
import { isAdmin } from '../access/roles'
import { revalidateService, revalidateServiceDelete } from '../hooks/revalidateService'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    admin: isAdmin,
    create: isAdmin,
    delete: isAdmin,
    read: anyone,
    update: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Website',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description:
      'Service offerings for the homepage grid, /services listing, and detail pages. Slug is generated from the title — you can edit it in the sidebar.',
  },
  hooks: {
    afterChange: [revalidateService],
    afterDelete: [revalidateServiceDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      fieldToUse: 'title',
      admin: {
        position: 'sidebar',
      },
    }),
    {
      name: 'hero_image',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero image',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional icon for cards on the homepage and services page.',
      },
    },
    {
      name: 'short_description',
      type: 'text',
      admin: {
        description: 'Short text used on listing cards.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Longer summary shown on the service detail hero.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Page content',
    },
    {
      name: 'process_steps',
      type: 'array',
      labels: { singular: 'Step', plural: 'Process steps' },
      fields: [
        {
          name: 'step',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      labels: { singular: 'Benefit', plural: 'Benefits' },
      fields: [
        {
          name: 'benefit',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'cta_text',
      type: 'text',
      label: 'CTA button label',
    },
    {
      name: 'cta_link',
      type: 'text',
      label: 'CTA link URL',
      admin: {
        description: 'Internal path (e.g. /contact) or full URL.',
      },
    },
  ],
}
