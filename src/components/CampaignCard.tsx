import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { HOME_INDEX_HEADING_CLASS } from '@/components/home/homeContent'
import { resolveMediaResourceUrl } from '@/utilities/normalizeStoredMediaPath'

export type CampaignCardData = {
  id: number | string
  title: string
  description?: string | null
  link_url?: string | null
  image?: { url?: string | null; alt?: string | null; width?: number | null; height?: number | null } | number | null
}

type Props = {
  campaign: CampaignCardData
}

export function CampaignCard({ campaign }: Props) {
  const media = typeof campaign.image === 'object' ? campaign.image : null
  const imageUrl = resolveMediaResourceUrl(media)
  const alt = media?.alt?.trim() || campaign.title

  const imageBlock = imageUrl ? (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl bg-slate-100">
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  ) : (
    <div className="flex aspect-[16/9] w-full items-center justify-center rounded-t-xl bg-slate-100 text-sm text-slate-500">
      Image unavailable
    </div>
  )

  const body = (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100/80 transition-shadow hover:shadow-md">
      {imageBlock}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h2 className={`text-lg leading-snug text-slate-900 md:text-xl ${HOME_INDEX_HEADING_CLASS}`}>
          {campaign.title}
        </h2>
        {campaign.description?.trim() ? (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 md:text-[15px]">
            {campaign.description.trim()}
          </p>
        ) : null}
      </div>
    </article>
  )

  const href = campaign.link_url?.trim()
  if (href) {
    const isExternal = /^https?:\/\//i.test(href)
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
          {body}
        </a>
      )
    }
    return (
      <Link href={href} className="block h-full">
        {body}
      </Link>
    )
  }

  return body
}
