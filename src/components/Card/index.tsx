'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'publishedAt'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, publishedAt } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  const readMinutes =
    sanitizedDescription && sanitizedDescription.length > 0
      ? Math.max(1, Math.min(15, Math.round(sanitizedDescription.length / 720)))
      : null

  const dateLabel =
    publishedAt && !Number.isNaN(Date.parse(publishedAt))
      ? new Date(publishedAt).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : null

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer flex flex-col min-h-[19rem]',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full aspect-[16/10] bg-muted shrink-0">
        {!metaImage && <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200" aria-hidden />}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
      </div>
      <div className="p-4 flex flex-col flex-1">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {(dateLabel || readMinutes) && (
          <p className="mt-2 flex flex-wrap gap-x-2 gap-y-0.5 text-xs font-medium text-muted-foreground">
            {dateLabel ? <time dateTime={publishedAt || undefined}>{dateLabel}</time> : null}
            {dateLabel && readMinutes ? <span aria-hidden>·</span> : null}
            {readMinutes ? <span>{readMinutes} min read</span> : null}
          </p>
        )}
        {description && (
          <div className="mt-2 flex-1">
            <p className="line-clamp-3 text-sm text-muted-foreground">{sanitizedDescription}</p>
          </div>
        )}
      </div>
    </article>
  )
}
