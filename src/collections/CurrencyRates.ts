import type { CollectionConfig } from 'payload'

export const CurrencyRates: CollectionConfig = {
  slug: 'currency-rates',
  admin: {
    useAsTitle: 'currency_name',
    defaultColumns: ['currency_name', 'currency_code', 'buy_rate', 'sell_rate', 'last_updated'],
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
