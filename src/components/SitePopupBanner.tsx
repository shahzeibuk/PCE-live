'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'

import { cn } from '@/utilities/ui'
import type { PromoBannerClientProps } from '@/utilities/getPromoBannerProps'

function isAbsoluteUrl(s: string) {
  return /^https?:\/\//i.test(s)
}

export type SitePopupBannerProps = {
  data: PromoBannerClientProps | null
}

export function SitePopupBanner({ data }: SitePopupBannerProps) {
  const [open, setOpen] = React.useState(false)
  const [hydrated, setHydrated] = React.useState(false)

  const storageKey =
    data != null ? `pce_promo_dismissed_v${data.dismissalVersion}` : 'pce_promo_dismissed_v0'

  React.useEffect(() => {
    setHydrated(true)
  }, [])

  React.useEffect(() => {
    if (!hydrated || data == null) return
    try {
      if (typeof window === 'undefined') return
      if (localStorage.getItem(storageKey)) return
    } catch {
      // private mode
    }
    setOpen(true)
  }, [data, hydrated, storageKey])

  const dismiss = React.useCallback(() => {
    setOpen(false)
    try {
      if (typeof window !== 'undefined') localStorage.setItem(storageKey, '1')
    } catch {
      // ignore
    }
  }, [storageKey])

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, dismiss])

  React.useEffect(() => {
    if (typeof document === 'undefined') return
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (data == null || !hydrated || !open) {
    return null
  }

  const { imageSrc, imageAlt, ctaUrl, openInNewTab, maxWidthClass } = data
  const external = ctaUrl ? isAbsoluteUrl(ctaUrl) : false
  const unoptimized = isAbsoluteUrl(imageSrc)

  const image = (
    <Image
      src={imageSrc}
      alt={imageAlt}
      width={1200}
      height={800}
      className="h-auto w-full max-h-[min(70dvh,520px)] object-contain"
      sizes="(max-width: 768px) 100vw, 42rem"
      unoptimized={unoptimized}
      priority
    />
  )

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={imageAlt}
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/60"
        onClick={dismiss}
        aria-label="Close promotion"
      />
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-2xl',
          maxWidthClass,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/50 text-white shadow-sm backdrop-blur-sm transition hover:bg-slate-900/70"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {ctaUrl ? (
          external ? (
            <a
              href={ctaUrl}
              target={openInNewTab ? '_blank' : undefined}
              rel={openInNewTab ? 'noopener noreferrer' : undefined}
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              onClick={dismiss}
            >
              {image}
            </a>
          ) : (
            <Link
              href={ctaUrl}
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              onClick={dismiss}
            >
              {image}
            </Link>
          )
        ) : (
          <div className="block">{image}</div>
        )}
      </div>
    </div>
  )
}
