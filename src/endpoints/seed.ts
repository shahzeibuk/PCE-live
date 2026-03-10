import { PayloadHandler } from 'payload'

export const seedHandler: PayloadHandler = async (req) => {
  const payload = req.payload as any

  try {
    // 1. Pages
    await payload.delete({
      collection: 'pages',
      where: { slug: { equals: 'about' } },
    })

    const aboutPage = await payload.create({
      collection: 'pages',
      data: {
        title: 'About Us',
        slug: 'about',
        _status: 'published',
        layout: [
          {
            blockType: 'content',
            columns: [
                {
                    size: 'full',
                    richText: {
                        root: {
                            children: [
                                {
                                    children: [
                                        {
                                            text: 'Pakistan Currency Exchange is a leading financial services company dedicated to providing competitive exchange rates and reliable remittance services. With a focus on customer satisfaction and regulatory compliance, we serve thousands of clients across Pakistan.',
                                            type: 'text',
                                        },
                                    ],
                                    type: 'paragraph',
                                },
                            ],
                            type: 'root',
                        },
                    }
                }
            ]
          },
        ],
      },
    })

    // 2. Branches
    await payload.delete({
        collection: 'branches',
        where: { id: { exists: true } }
    })

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

    for (const data of branches) {
      await payload.create({ collection: 'branches', data })
    }

    // 3. Currency Rates
    await payload.delete({
        collection: 'currency-rates',
        where: { id: { exists: true } }
    })

    const rates = [
      { currency_name: 'US Dollar', currency_code: 'USD', buy_rate: 278.50, sell_rate: 281.00 },
      { currency_name: 'Euro', currency_code: 'EUR', buy_rate: 302.20, sell_rate: 305.50 },
      { currency_name: 'British Pound', currency_code: 'GBP', buy_rate: 352.40, sell_rate: 356.80 },
      { currency_name: 'UAE Dirham', currency_code: 'AED', buy_rate: 75.80, sell_rate: 76.50 },
      { currency_name: 'Saudi Riyal', currency_code: 'SAR', buy_rate: 74.20, sell_rate: 74.90 },
    ]

    for (const data of rates) {
      await payload.create({ collection: 'currency-rates', data })
    }

    // 4. Services (Enhanced)
    await payload.delete({
        collection: 'services',
        where: { id: { exists: true } }
    })

    const services = [
      { 
        title: 'Currency Exchange', 
        slug: 'currency-exchange', 
        short_description: 'Buy and sell foreign currencies at competitive market rates.',
        description: 'We offer the most competitive exchange rates for all major global currencies including USD, EUR, GBP, AED, and SAR.',
        process_steps: [{ step: 'Visit any PCE branch' }, { step: 'Present original ID' }, { step: 'Complete transaction' }],
        benefits: [{ benefit: 'Market competitive rates' }, { benefit: 'Zero processing fees' }, { benefit: 'Instant settlement' }],
        content: { root: { children: [{ children: [{ text: 'Our currency exchange service is designed for speed and reliability. Whether you are a traveler or an investor, we provide transparent pricing and professional service.', type: 'text' }], type: 'paragraph' }], type: 'root' } }
      },
      { 
        title: 'Foreign Remittance', 
        slug: 'remittance', 
        short_description: 'Send money to your loved ones globally with ease and security.',
        description: 'Secure and fast international money transfer services through our global banking network and exchange partners.',
        process_steps: [{ step: 'Provide recipient details' }, { step: 'Choose transfer method' }, { step: 'Receive MTCN/Reference' }],
        benefits: [{ benefit: 'Fast global transfers' }, { benefit: 'Bank-level security' }, { benefit: 'Multiple payout options' }],
        content: { root: { children: [{ children: [{ text: 'Connect with your family across the globe. Our remittance services ensure your hard-earned money reaches its destination safely and quickly.', type: 'text' }], type: 'paragraph' }], type: 'root' } }
      },
      { 
        title: 'Western Union', 
        slug: 'western-union', 
        short_description: 'Authorized agent for Western Union money transfer services.',
        description: 'Receive and send money through Western Union, the world leader in cross-border, cross-currency money movement.',
        process_steps: [{ step: 'Bring your ID and MTCN' }, { step: 'Fill redemption form' }, { step: 'Receive cash' }],
        benefits: [{ benefit: 'Worldwide availability' }, { benefit: 'Trusted global brand' }, { benefit: 'No bank account required' }],
        content: { root: { children: [{ children: [{ text: 'As an authorized Western Union agent, we provide seamless money transfer services at all our locations nationwide.', type: 'text' }], type: 'paragraph' }], type: 'root' } }
      },
    ]

    for (const data of services) {
      await payload.create({ collection: 'services', data })
    }

    // 5. Testimonials
    await payload.delete({
        collection: 'testimonials',
        where: { id: { exists: true } }
    })

    const testimonials = [
      { name: 'Ahmed Khan', position: 'Frequent Traveler', testimonial: 'Exceptional service and the best rates I have found in Karachi. Highly recommended for travelers.' },
      { name: 'Sara Malik', position: 'Business Owner', testimonial: 'Professional staff and very fast remittance processing. My overseas partners always receive funds on time.' },
    ]

    for (const data of testimonials) {
      await payload.create({ collection: 'testimonials', data })
    }

    // 6. Partners
    await payload.delete({
        collection: 'partners',
        where: { id: { exists: true } }
    })

    const partners = [
      { name: 'Western Union' },
      { name: 'RIA Money Transfer' },
      { name: 'MoneyGram' },
    ]

    for (const data of partners) {
      await payload.create({ collection: 'partners', data })
    }

    // 7. News
    await payload.delete({
        collection: 'news',
        where: { id: { exists: true } }
    })

    await payload.create({
      collection: 'news',
      data: {
        title: 'Market Update: PKR Stabilizes Against USD',
        slug: 'market-update-pkr-usd',
        published_date: new Date(),
        content: { root: { children: [{ children: [{ text: 'The Pakistani Rupee showed strength today in the open market...', type: 'text' }], type: 'paragraph' }], type: 'root' } }
      }
    })

    return Response.json({ message: 'Seeding completed successfully!' })
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
