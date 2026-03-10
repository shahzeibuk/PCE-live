import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
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
      name: 'hero_image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'short_description',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'process_steps',
      type: 'array',
      fields: [
        {
          name: 'step',
          type: 'text',
        },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      fields: [
        {
          name: 'benefit',
          type: 'text',
        },
      ],
    },
    {
      name: 'cta_text',
      type: 'text',
    },
    {
      name: 'cta_link',
      type: 'text',
    },
  ],
}
