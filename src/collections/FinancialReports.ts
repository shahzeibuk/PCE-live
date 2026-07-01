import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { isAdmin } from '../access/roles'

export const FinancialReports: CollectionConfig = {
  slug: 'financial-reports',
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
    description:
      'Upload PDF reports with a title and description. They appear on /financial-reports and in the footer quick links.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Report title',
      admin: {
        description: 'Shown on the report box (e.g. Annual Report 2024).',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
      admin: {
        description: 'Short summary shown inside each report box on the website.',
      },
    },
    {
      name: 'report_file',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'PDF file',
      filterOptions: {
        mimeType: { contains: 'pdf' },
      },
      admin: {
        description: 'Upload the report as a PDF. Only PDF files are accepted.',
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
        description: 'Used to sort reports (newest first).',
      },
      defaultValue: () => new Date(),
    },
  ],
}
