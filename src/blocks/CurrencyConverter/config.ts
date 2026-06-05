import type { Block } from 'payload'

export const CurrencyConverter: Block = {
  slug: 'currencyConverter',
  interfaceName: 'CurrencyConverterBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Currency Booking',
    },
  ],
}
