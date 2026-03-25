import { cn } from '@/utilities/ui'
import React from 'react'

type InnerPageHeaderProps = {
  title: React.ReactNode
  description?: string
  centered?: boolean
  /** Muted = slate band (default). Brand = forest green band like footer CTA areas. */
  variant?: 'muted' | 'brand'
  className?: string
}

export function InnerPageHeader({
  title,
  description,
  centered = true,
  variant = 'muted',
  className,
}: InnerPageHeaderProps) {
  return (
    <header
      className={cn(
        'border-b border-slate-200 dark:border-slate-800',
        variant === 'muted' && 'bg-slate-50 dark:bg-slate-900/40',
        variant === 'brand' && 'bg-[#099546] text-white border-[#088040]',
        className,
      )}
    >
      <div
        className={cn(
          'container px-4 py-10 md:py-12',
          centered && 'text-center',
        )}
      >
        <h1
          className={cn(
            'text-3xl md:text-4xl font-bold tracking-tight mb-3',
            variant === 'muted' && 'text-slate-900 dark:text-white',
            variant === 'brand' && 'text-white',
          )}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              'text-lg max-w-2xl leading-relaxed',
              centered && 'mx-auto',
              variant === 'muted' && 'text-slate-600 dark:text-slate-400',
              variant === 'brand' && 'text-white/90',
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </header>
  )
}
