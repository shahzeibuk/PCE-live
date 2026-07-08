import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { isAdmin } from '../access/roles'

export const Campaigns: CollectionConfig = {
  slug: 'campaigns',
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
    defaultColumns: ['title', 'published_date', 'updatedAt'],
    description: 'Upload campaign banners with title and description. They appear on /campaign.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Campaign title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Short summary shown below the campaign image on the website.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Campaign image',
      admin: {
        description: 'Banner or promotional image for this campaign.',
      },
    },
    {
      name: 'link_url',
      type: 'text',
      label: 'Link URL',
      admin: {
        description: 'Optional. External or internal link when visitors click the campaign (e.g. /contact or https://…).',
      },
    },
    {
      name: 'published_date',
      type: 'date',
      label: 'Published date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
        description: 'Used to sort campaigns (newest first).',
      },
      defaultValue: () => new Date(),
    },
  ],
}
