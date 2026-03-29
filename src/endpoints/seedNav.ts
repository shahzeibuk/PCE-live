import { PayloadHandler } from 'payload'

import { denySeedInProduction } from '@/utilities/seedEndpointGuard'

export const seedNavHandler: PayloadHandler = async (req) => {
  const forbidden = denySeedInProduction(req)
  if (forbidden) return forbidden

  const payload = req.payload as any

  console.log('Seeding navigation...')
  try {
    // Find About page ID
    const { docs: pages } = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'about',
        },
      },
    })

    const aboutPage = pages[0]

    const result = await payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          ...(aboutPage ? [
            {
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: aboutPage.id,
                },
                label: 'About Us',
              },
            }
          ] : []),
          {
            link: {
              type: 'custom',
              url: '/services',
              label: 'Services',
            },
          },
          {
            link: {
              type: 'custom',
              url: '/branches',
              label: 'Branches',
            },
          },
          {
            link: {
              type: 'custom',
              url: '/contact',
              label: 'Contact',
            },
          },
        ],
      },
    })
    console.log('Navigation seeding result:', JSON.stringify(result, null, 2))

    return Response.json({ message: 'Navigation seeding completed successfully!', result })
  } catch (err: any) {
    console.error('Navigation seeding error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
