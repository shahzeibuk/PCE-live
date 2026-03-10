import { PayloadHandler } from 'payload'

export const seedNavHandler: PayloadHandler = async (req) => {
  const payload = req.payload as any

  try {
    await payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'reference',
              reference: {
                relationTo: 'pages',
                value: 'about', // Note: This might need the ID, but slug often works in newer Payload versions if configured
              },
              label: 'About Us',
            },
          },
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

    return Response.json({ message: 'Navigation seeding completed successfully!' })
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
