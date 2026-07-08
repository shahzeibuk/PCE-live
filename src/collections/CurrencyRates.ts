import type { CollectionBeforeValidateHook, CollectionConfig } from 'payload'

import { revalidatePath } from 'next/cache'

import { anyone } from '../access/anyone'
import { canManageRates, canUserManageRates } from '../access/roles'
import { revalidateCurrencyRates, revalidateCurrencyRatesDelete } from '../hooks/revalidateCurrencyRates'
import {
  CURRENCY_RATE_CATEGORY_OPTIONS,
  INTERBANK_CURRENCY_CODE,
  INTERBANK_RATE_CATEGORY,
  INTERBANK_RATE_LABEL,
  isInterbankRateCategory,
  type CurrencyRateCategory,
} from '../utilities/currencyRatesShared'
import { runCurrencyRatesSync } from '../utilities/syncCurrencyRates'
import { APIError } from 'payload'

const normalizeRateCategory = (value: unknown): CurrencyRateCategory =>
  isInterbankRateCategory(value) ? INTERBANK_RATE_CATEGORY : 'open_market'

const normalizeCurrencyCode = (value: unknown): string =>
  typeof value === 'string' ? value.trim().toUpperCase() : ''

const ensureInterbankDefaults: CollectionBeforeValidateHook = ({ data }) => {
  const rateCategory = normalizeRateCategory(data?.rate_category)
  data.rate_category = rateCategory

  if (isInterbankRateCategory(rateCategory)) {
    data.currency_code = INTERBANK_CURRENCY_CODE
    data.currency_name = INTERBANK_RATE_LABEL
  } else {
    if (typeof data?.currency_name !== 'string' || !data.currency_name.trim()) {
      throw new APIError('Currency name is required.', 400)
    }
    if (typeof data?.currency_code !== 'string' || !data.currency_code.trim()) {
      throw new APIError('Currency code is required.', 400)
    }
  }

  if (typeof data?.currency_code === 'string') {
    data.currency_code = data.currency_code.trim().toUpperCase()
  }

  return data
}

const validateUniqueRateCategory: CollectionBeforeValidateHook = async ({ data, req, operation, id }) => {
  const rateCategory = normalizeRateCategory(data?.rate_category)
  const currencyCode = normalizeCurrencyCode(data?.currency_code)

  if (!currencyCode) {
    throw new APIError('Currency code is required.', 400)
  }

  const existing = await req.payload.find({
    collection: 'currency-rates',
    where: {
      and: [
        { currency_code: { equals: currencyCode } },
        { rate_category: { equals: rateCategory } },
        ...(operation === 'update' && id != null ? [{ id: { not_equals: id } }] : []),
      ],
    },
    limit: 1,
    depth: 0,
  })

  if (existing.docs.length > 0) {
    const label = isInterbankRateCategory(rateCategory)
      ? INTERBANK_RATE_LABEL
      : `${currencyCode} open market rate`
    throw new APIError(`A ${label} entry already exists. Edit the existing row instead.`, 400)
  }

  if (isInterbankRateCategory(rateCategory) && currencyCode !== INTERBANK_CURRENCY_CODE) {
    throw new APIError('InterBank rates are only supported for USD.', 400)
  }

  return data
}

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
      },
    },
  ],
  admin: {
    useAsTitle: 'currency_name',
    group: 'Website',
    defaultColumns: ['rate_category', 'currency_name', 'currency_code', 'buy_rate', 'sell_rate', 'last_updated'],
    description:
      'Manage open-market FX rows and a separate USD to PKR Interbank row. Open-market sync updates API rates only; Interbank buy/sell are edited manually in admin.',
  },
  hooks: {
    beforeValidate: [ensureInterbankDefaults, validateUniqueRateCategory],
    afterChange: [revalidateCurrencyRates],
    afterDelete: [revalidateCurrencyRatesDelete],
  },
  fields: [
    {
      name: 'rate_category',
      type: 'select',
      required: true,
      defaultValue: 'open_market',
      options: CURRENCY_RATE_CATEGORY_OPTIONS,
      admin: {
        description:
          'Choose Open Market for the main rates table, or USD to PKR Interbank for the homepage Interbank panel.',
      },
    },
    {
      name: 'currency_name',
      type: 'text',
      required: false,
      admin: {
        description:
          'Display name for open-market rows (e.g. US Dollar). For USD to PKR Interbank, this is set automatically on save.',
      },
    },
    {
      name: 'currency_code',
      type: 'text',
      required: false,
      admin: {
        description:
          'ISO code for open-market rows (e.g. USD, EUR). For USD to PKR Interbank, USD is set automatically on save.',
      },
    },
    {
      name: 'buy_rate',
      type: 'number',
      required: true,
      label: 'Buy rate',
    },
    {
      name: 'sell_rate',
      type: 'number',
      required: true,
      label: 'Sell rate',
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
