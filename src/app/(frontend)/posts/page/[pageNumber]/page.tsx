import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  let posts: any = { docs: [], totalDocs: 0, page: 1, totalPages: 1 }

  try {
    posts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 12,
      page: sanitizedPageNumber,
      overrideAccess: false,
    })
  } catch (err) {
    console.error('Failed to fetch posts:', err)
  }

  return (
    <div className="pb-16 md:pb-24">
      <PageClient />
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="container px-4 py-10 md:py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Posts</h1>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto text-base">
            Page {sanitizedPageNumber} — archives and updates.
          </p>
        </div>
      </div>
      <div className="container mb-8 mt-10 px-4">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Payload Website Template Posts Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  let totalDocs = 0

  try {
    const result = await payload.count({
      collection: 'posts',
      overrideAccess: false,
    })
    totalDocs = result.totalDocs
  } catch (err) {
    console.error('Failed to count posts for static params:', err)
  }

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
