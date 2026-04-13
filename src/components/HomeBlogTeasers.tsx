import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'

import { HOME_INDEX_HEADING_CLASS } from '@/components/home/homeContent'

export type HomeBlogTeaserPost = Pick<Post, 'id' | 'title' | 'slug' | 'meta'>

type Props = {
  posts: HomeBlogTeaserPost[]
}

export function HomeBlogTeasers({ posts }: Props) {
  const list = posts.filter((p) => p?.slug)

  return (
    <section className="border-t border-slate-200 bg-white py-14 md:py-20">
      <div className="container px-4">
        <div className="mb-10 flex flex-col gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <h2 className={`text-2xl md:text-3xl ${HOME_INDEX_HEADING_CLASS}`}>Blog</h2>
            <p className="mx-auto mt-2 max-w-xl text-base text-slate-600 md:mx-0">
              Articles on exchange rates, remittance, and getting the most from our branches.
            </p>
          </div>
          <Link
            href="/posts"
            className="shrink-0 text-sm font-semibold text-[#099546] hover:underline"
          >
            View all articles →
          </Link>
        </div>

        {list.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 py-10 text-center text-slate-600">
            New articles are on the way.{' '}
            <Link href="/posts" className="font-semibold text-[#099546] hover:underline">
              Open the blog
            </Link>{' '}
            to see everything we publish.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {list.map((item) => (
              <article
                key={item.id}
                className="flex flex-col rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <h3 className={`mb-3 text-lg leading-snug ${HOME_INDEX_HEADING_CLASS}`}>{item.title}</h3>
                <p className="mb-4 flex-1 line-clamp-3 text-sm text-slate-600">
                  {typeof item.meta?.description === 'string' && item.meta.description.trim()
                    ? item.meta.description
                    : 'Read the full article on our blog.'}
                </p>
                <Link
                  href={`/posts/${item.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#099546] hover:underline"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
