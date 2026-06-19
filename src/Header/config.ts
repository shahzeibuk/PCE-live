import type { GlobalConfig } from 'payload'

import { isAdmin, hideFromNonAdmin } from '@/access/roles'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Site header',
  admin: {
    hidden: hideFromNonAdmin,
    description:
      'Top navigation links (desktop and mobile). Services dropdown still lists items from the Services collection; titles there can be overridden per link when a slug matches.',
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Replaces the default site logo. Use a wide PNG or SVG. Leave empty to keep the built-in asset.',
      },
    },
    {
      name: 'logoAlt',
      type: 'text',
      label: 'Logo alt text (accessibility)',
      defaultValue: 'Pakistan Currency Exchange — official logo',
    },
    {
      name: 'contactLines',
      type: 'array',
      label: 'Header contact numbers',
      minRows: 0,
      maxRows: 4,
      admin: {
        description: 'Toll-free and mobile shown in the top bar. If you leave this empty, the current defaults (0800-13537 and 0304-6668810) are used.',
        initCollapsed: false,
      },
      labels: { singular: 'Line', plural: 'Lines' },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Display',
          admin: { description: 'e.g. 0800-13537' },
        },
        {
          name: 'telHref',
          type: 'text',
          required: true,
          label: 'Phone link',
          admin: { description: 'Use tel: with no spaces, e.g. tel:080013537' },
        },
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'phone',
          options: [
            { label: 'Phone (landline icon)', value: 'phone' },
            { label: 'Mobile icon', value: 'mobile' },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Primary CTA (top right)',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button label',
          defaultValue: 'Get Live Rates',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Link URL',
          defaultValue: '/currency-rates',
          required: true,
          admin: { description: 'Internal path (e.g. /currency-rates) or full https:// URL.' },
        },
      ],
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 12,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
