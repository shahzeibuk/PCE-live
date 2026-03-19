import type { Block } from 'payload'

export const LiveExchangeRates: Block = {
  slug: 'liveExchangeRates',
  interfaceName: 'LiveExchangeRatesBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Live Exchange Rates',
    },
  ],
}
