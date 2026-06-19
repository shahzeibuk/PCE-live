import type { CollectionConfig } from 'payload'

import { adminOrSelf, isAdmin } from '../../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: isAdmin,
    create: isAdmin,
    delete: isAdmin,
    read: adminOrSelf,
    update: adminOrSelf,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
    group: 'Settings',
    description: 'Create admin accounts or rates-only editors who can update currency exchange rates.',
  },
  auth: true,
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (doc && !doc.role) {
          doc.role = 'admin'
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'admin',
      saveToJWT: true,
      options: [
        { label: 'Admin (full access)', value: 'admin' },
        { label: 'Rates editor (currency rates only)', value: 'rates-editor' },
      ],
      admin: {
        description:
          'Admins manage all site content. Rates editors only see and edit Currency Rates in the admin panel.',
      },
      access: {
        update: isAdmin,
      },
    },
  ],
  timestamps: true,
}
