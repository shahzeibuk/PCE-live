import type { GlobalConfig } from 'payload'

import { revalidateHomeFaq } from './hooks/revalidateHomeFaq'

export const HomeFaq: GlobalConfig = {
  slug: 'homeFaq',
  label: 'Homepage — FAQs',
  admin: {
    description:
      'Frequently Asked Questions on the homepage. Only the first N items show until visitors click Show more.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Frequently Asked Questions (FAQs)',
      label: 'Section title',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subtitle',
      defaultValue: 'Pakistan Currency Exchange',
    },
    {
      name: 'initialVisibleCount',
      type: 'number',
      label: 'Questions visible before “Show more”',
      min: 1,
      max: 50,
      defaultValue: 5,
      required: true,
      admin: {
        description: 'Number of Q&A accordions shown initially (rest behind Show more).',
      },
    },
    {
      name: 'items',
      type: 'array',
      minRows: 0,
      maxRows: 80,
      labels: { singular: 'FAQ', plural: 'FAQs' },
      admin: {
        description: 'If empty, default FAQs from the site template are used.',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Question',
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          label: 'Answer',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHomeFaq],
  },
}
