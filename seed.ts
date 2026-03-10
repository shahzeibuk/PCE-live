import { getPayload } from 'payload'
import configPromise from './src/payload.config'
import dotenv from 'dotenv'

dotenv.config()

const seed = async () => {
  process.env.PAYLOAD_SECRET = '0def509547dcd56516bb34b1'
  const payload = (await getPayload({ config: configPromise })) as any

  console.log('Seeding database...')

  // Create About Page
  await payload.create({
    collection: 'pages',
    data: {
      title: 'About Us',
      slug: 'about',
      _status: 'published',
      layout: [
        {
          blockType: 'content',
          root: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Pakistan Currency Exchange is a leading financial services company dedicated to providing competitive exchange rates and reliable remittance services. With a focus on customer satisfaction and regulatory compliance, we serve thousands of clients across Pakistan.',
                      type: 'text',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  type: 'paragraph',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
        },
      ],
    },
  })

  // Create Sample Branches
  const branches = [
    {
      branch_name: 'I.I. Chundrigar Road Branch',
      city: 'Karachi',
      address: 'Shop # 4, Ground Floor, Business Plaza, I.I. Chundrigar Road, Karachi.',
      phone: '+92 21 3241XXXX',
      email: 'chundrigar@pakistancurrency.com',
      google_map_link: 'https://maps.google.com',
    },
    {
      branch_name: 'Blue Area Branch',
      city: 'Islamabad',
      address: 'Shop # 12, Block A, Blue Area, Islamabad.',
      phone: '+92 51 287XXXX',
      email: 'bluearea@pakistancurrency.com',
      google_map_link: 'https://maps.google.com',
    },
    {
      branch_name: 'Mall Road Branch',
      city: 'Lahore',
      address: 'Shop # 45, Mall Road, Lahore.',
      phone: '+92 42 3630XXXX',
      email: 'mallroad@pakistancurrency.com',
      google_map_link: 'https://maps.google.com',
    },
  ]

  for (const branch of branches) {
    await payload.create({
      collection: 'branches',
      data: branch,
    })
  }

  // Create Sample Currency Rates
  const rates = [
    { currency_name: 'US Dollar', currency_code: 'USD', buy_rate: 278.50, sell_rate: 281.00 },
    { currency_name: 'Euro', currency_code: 'EUR', buy_rate: 302.20, sell_rate: 305.50 },
    { currency_name: 'British Pound', currency_code: 'GBP', buy_rate: 352.40, sell_rate: 356.80 },
    { currency_name: 'UAE Dirham', currency_code: 'AED', buy_rate: 75.80, sell_rate: 76.50 },
    { currency_name: 'Saudi Riyal', currency_code: 'SAR', buy_rate: 74.20, sell_rate: 74.90 },
  ]

  for (const rate of rates) {
    await payload.create({
      collection: 'currency-rates',
      data: rate,
    })
  }

  // Create Sample Services
  const services = [
    { title: 'Currency Exchange', slug: 'currency-exchange', description: 'Buy and sell foreign currencies at competitive market rates.' },
    { title: 'Foreign Remittance', slug: 'remittance', description: 'Send money to your loved ones globally with ease and security.' },
    { title: 'Western Union', slug: 'western-union', description: 'Authorized agent for Western Union money transfer services.' },
  ]

  for (const service of services) {
    await payload.create({
      collection: 'services',
      data: service,
    })
  }

  console.log('Seeding completed successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
