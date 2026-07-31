import type { CollectionConfig } from 'payload'

import { isAdmin, hideFromNonAdmin } from '../access/roles'

/**
 * Read-only audit trail of admin content changes (who updated what, and when).
 * Rows are written by hooks — not manually editable.
 */
export const ActivityLogs: CollectionConfig = {
  slug: 'activity-logs',
  labels: {
    singular: 'Activity log',
    plural: 'User activity log',
  },
  admin: {
    useAsTitle: 'summary',
    group: 'Admin',
    hidden: hideFromNonAdmin,
    defaultColumns: ['userEmail', 'action', 'resource', 'documentTitle', 'pagePath', 'createdAt'],
    defaultSort: '-createdAt',
    description:
      'Who changed which page or content, and when. Written automatically when admins save — not editable.',
    listSearchableFields: ['userEmail', 'documentTitle', 'pagePath', 'summary', 'documentId'],
  },
  access: {
    admin: isAdmin,
    create: () => false,
    read: isAdmin,
    update: () => false,
    delete: isAdmin,
  },
  timestamps: true,
  fields: [
    {
      name: 'summary',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'userEmail',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Stored even if the user account is later removed.',
      },
    },
    {
      name: 'action',
      type: 'select',
      required: true,
      options: [
        { label: 'Created', value: 'create' },
        { label: 'Updated', value: 'update' },
        { label: 'Deleted', value: 'delete' },
      ],
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'resource',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
        description: 'Collection or global slug (e.g. pages, currency-rates).',
      },
    },
    {
      name: 'documentId',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'documentTitle',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'pagePath',
      type: 'text',
      label: 'Page / path',
      admin: {
        readOnly: true,
        description: 'Frontend path when the resource is a page (e.g. /about, /contact).',
      },
    },
  ],
}
