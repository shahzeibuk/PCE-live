import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateBranch, revalidateBranchDelete } from '../hooks/revalidateBranch'

export const Branches: CollectionConfig = {
  slug: 'branches',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'branch_name',
    group: 'Website',
    defaultColumns: ['branch_name', 'city', 'phone', 'updatedAt'],
    description:
      'Branch locations only (name, address, contact, map link). Exchange rates are managed under Currency Rates, not here.',
  },
  hooks: {
    afterChange: [revalidateBranch],
    afterDelete: [revalidateBranchDelete],
  },
  fields: [
    {
      name: 'branch_name',
      type: 'text',
      required: true,
      label: 'Branch name',
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'cell_phone',
      type: 'text',
      label: 'Branch cell / mobile',
      admin: {
        description: 'Optional direct mobile or cell number for this branch.',
      },
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'google_map_link',
      type: 'text',
      label: 'Google Maps link (optional)',
      admin: {
        description: 'Full URL to open this branch in Google Maps.',
      },
    },
  ],
}
