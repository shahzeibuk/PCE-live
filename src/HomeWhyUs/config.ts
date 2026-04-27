import type { GlobalConfig } from 'payload'

import { revalidateHomeWhyUs } from './hooks/revalidateHomeWhyUs'

export const HomeWhyUs: GlobalConfig = {
  slug: 'homeWhyUs',
  label: 'Homepage — Why choose us',
  admin: {
    description:
      '“Why Choose Pakistan Currency Exchange?” — headline, supporting copy, bullet list with icons, side image, and footer line.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Why Choose Pakistan Currency Exchange?',
      label: 'Heading',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
      defaultValue: 'A smarter way to buy, sell, and receive currency across Pakistan.',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Side image',
      admin: {
        description: 'Shown on the right on desktop. Optional until you publish — fallback image is used if empty.',
      },
    },
    {
      name: 'items',
      type: 'array',
      minRows: 0,
      maxRows: 12,
      labels: { singular: 'Bullet', plural: 'Bullets' },
      admin: {
        description: 'If empty, the site uses default bullets from code.',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'shield',
          label: 'Icon',
          options: [
            { label: 'Shield — trust', value: 'shield' },
            { label: 'Trending — rates / growth', value: 'trending' },
            { label: 'Lock — security', value: 'lock' },
            { label: 'Zap — speed', value: 'zap' },
            { label: 'Users — support', value: 'users' },
            { label: 'Map pin — branches', value: 'map' },
          ],
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Text',
        },
      ],
    },
    {
      name: 'footer',
      type: 'textarea',
      label: 'Footer line',
      defaultValue:
        'We are dedicated to making your currency exchange and remittance experience smooth, secure, and hassle-free.',
    },
  ],
  hooks: {
    afterChange: [revalidateHomeWhyUs],
  },
}
