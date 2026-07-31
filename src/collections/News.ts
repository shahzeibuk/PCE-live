import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { isAdmin } from '../access/roles'
import {
  createActivityLogAfterChange,
  createActivityLogAfterDelete,
} from '../hooks/logUserActivity'

export const News: CollectionConfig = {
  slug: 'news',
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
    defaultColumns: ['title', 'slug', 'published_date', 'updatedAt'],
    description: 'Items can surface on the homepage “Daily Currency Updates” grid and on /news/[slug] pages.',
  },
  hooks: {
    afterChange: [createActivityLogAfterChange('news')],
    afterDelete: [createActivityLogAfterDelete('news')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'published_date',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
      defaultValue: () => new Date(),
    },
  ],
}
