import type { CollectionConfig } from 'payload'

import { revalidatePath } from 'next/cache'

import { anyone } from '../access/anyone'
import { canManageRates, canUserManageRates } from '../access/roles'
import { runCurrencyRatesSync } from '../utilities/syncCurrencyRates'
import { APIError } from 'payload'

export const CurrencyRates: CollectionConfig = {
  slug: 'currency-rates',
  access: {
    admin: canManageRates,
    create: canManageRates,
    delete: canManageRates,
    read: anyone,
    update: canManageRates,
  },
  endpoints: [
    {
      path: '/sync',
      method: 'post',
      handler: async (req) => {
        if (!canUserManageRates(req.user)) {
          throw new APIError('Unauthorized', 401)
        }

        const result = await runCurrencyRatesSync(req.payload, req)
        if (!result.ok) {
          return Response.json({ error: result.error }, { status: 500 })
        }
        revalidatePath('/')
        revalidatePath('/currency-rates')
        return Response.json({ success: true, updated: result.updated, source: result.source })
      }
    }
  ],
  admin: {
    useAsTitle: 'currency_name',
    group: 'Website',
    defaultColumns: ['currency_name', 'currency_code', 'buy_rate', 'sell_rate', 'last_updated'],
    description:
      'Global FX listings only — not stored on branch records. Powers the homepage table, /currency-rates, and the converter. Sync fills from the live API; cron can refresh on a schedule.',
  },
  fields: [
    {
      name: 'currency_name',
      type: 'text',
      required: true,
    },
    {
      name: 'currency_code',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'buy_rate',
      type: 'number',
      required: true,
    },
    {
      name: 'sell_rate',
      type: 'number',
      required: true,
    },
    {
      name: 'last_updated',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
      defaultValue: () => new Date(),
    },
  ],
}
