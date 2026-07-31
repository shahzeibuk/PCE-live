import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { getUserRole, isAdmin } from '../access/roles'
import { revalidateBranch, revalidateBranchDelete } from '../hooks/revalidateBranch'
import {
  createActivityLogAfterChange,
  createActivityLogAfterDelete,
} from '../hooks/logUserActivity'
import { importBranchesFromCsv } from '../utilities/importBranchesFromCsv'
import { addDataAndFileToRequest, APIError } from 'payload'

export const Branches: CollectionConfig = {
  slug: 'branches',
  access: {
    admin: isAdmin,
    create: isAdmin,
    delete: isAdmin,
    read: anyone,
    update: isAdmin,
  },
  admin: {
    useAsTitle: 'branch_name',
    group: 'Website',
    defaultColumns: ['branch_name', 'city', 'phone', 'updatedAt'],
    description:
      'Branch locations only (name, address, contact, map link). Upload many at once from CSV on this list page.',
    components: {
      beforeList: ['@/components/admin/BranchCsvImport'],
    },
  },
  endpoints: [
    {
      path: '/import-csv',
      method: 'post',
      handler: async (req) => {
        if (!req.user || getUserRole(req.user) !== 'admin') {
          throw new APIError('Unauthorized', 401)
        }

        await addDataAndFileToRequest(req)

        const file = req.file
        if (!file?.data) {
          throw new APIError('CSV file is required.', 400)
        }

        const replace =
          req.data?.replace === true ||
          req.data?.replace === 'true' ||
          req.data?.replace === 1 ||
          req.data?.replace === '1'

        const csvText = Buffer.isBuffer(file.data)
          ? file.data.toString('utf-8')
          : String(file.data)

        const result = await importBranchesFromCsv(req.payload, csvText, { replace })

        return Response.json(result)
      },
    },
  ],
  hooks: {
    afterChange: [revalidateBranch, createActivityLogAfterChange('branches')],
    afterDelete: [revalidateBranchDelete, createActivityLogAfterDelete('branches')],
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
