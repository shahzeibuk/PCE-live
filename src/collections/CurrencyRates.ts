import type { CollectionConfig } from 'payload'

export const CurrencyRates: CollectionConfig = {
  slug: 'currency-rates',
  endpoints: [
    {
      path: '/sync',
      method: 'post',
      handler: async (req) => {
        try {
          const res = await fetch('https://open.er-api.com/v6/latest/PKR', {
            cache: 'no-store'
          })
          
          if (!res.ok) {
              return Response.json({ error: 'Failed' }, { status: 500 })
          }

          const data = await res.json()
          const rates = data.rates

          const existingCurrencies = await req.payload.find({
            collection: 'currency-rates',
            limit: 100,
          })

          const updated = []

          for (const doc of existingCurrencies.docs) {
            if (doc.currency_code === 'PKR') continue

            const rateAgainstPkr = rates[doc.currency_code as string]
            if (rateAgainstPkr) {
              const basePrice = 1 / rateAgainstPkr
              const margin = 0.005 // 0.5% spread
              const buy_rate = basePrice - (basePrice * margin)
              const sell_rate = basePrice + (basePrice * margin)

              await req.payload.update({
                collection: 'currency-rates',
                id: doc.id,
                data: {
                  buy_rate: Number(buy_rate.toFixed(4)),
                  sell_rate: Number(sell_rate.toFixed(4)),
                  last_updated: new Date().toISOString()
                }
              })
              updated.push(doc.currency_code)
            }
          }
          return Response.json({ success: true, updated })
        } catch (error) {
          return Response.json({ error: 'Sync failed' }, { status: 500 })
        }
      }
    }
  ],
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
