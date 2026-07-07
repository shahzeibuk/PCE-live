import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { SITE_NAME } from '@/utilities/siteMetadata'

export const dynamic = 'force-dynamic'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  let posts: any = { docs: [], totalDocs: 0 }

  try {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'search',
      depth: 1,
      limit: 12,
      select: {
        title: true,
        slug: true,
        categories: true,
        meta: true,
      },
      pagination: false,
      ...(query
        ? {
            where: {
              or: [
                {
                  title: {
                    like: query,
                  },
                },
                {
                  'meta.description': {
                    like: query,
                  },
                },
                {
                  'meta.title': {
                    like: query,
                  },
                },
                {
                  slug: {
                    like: query,
                  },
                },
              ],
            },
          }
        : {}),
    })
    posts = {
      docs: result.docs || [],
      totalDocs: result.totalDocs || 0
    }
  } catch (error) {
    console.error('Error during search:', error)
  }

  return (
    <div className="pb-16 md:pb-24">
      <PageClient />
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="container px-4 py-10 md:py-12 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-8">
            Search
          </h1>
          <div className="max-w-[50rem] mx-auto">
            <Search />
          </div>
        </div>
      </div>

      {posts.totalDocs > 0 ? (
        <CollectionArchive posts={posts.docs as CardPostData[]} />
      ) : (
        <div className="container px-4 py-10 text-center text-slate-600">
          No results found.
        </div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Search | ${SITE_NAME}`,
  }
}
