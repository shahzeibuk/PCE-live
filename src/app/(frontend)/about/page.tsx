import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import RichText from '@/components/RichText'

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise })
  
  // Find the 'about' page in the 'pages' collection
  const { docs: pages } = (await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'about',
      },
    },
  })) as any

  const page = pages[0]

  if (!page) {
    return (
      <div className="container mx-auto py-24 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-muted-foreground">About page content is being prepared in the CMS.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
      <div className="prose prose-lg dark:prose-invert">
        {page.layout?.map((block: any, i: number) => {
          if (block.blockType === 'content') {
            return block.columns?.map((col: any, j: number) => (
              <RichText key={`${i}-${j}`} data={col.richText} />
            ))
          }
          return null
        })}
      </div>
    </div>
  )
}
