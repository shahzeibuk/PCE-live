import { cn } from '@/utilities/ui'
import React from 'react'

import { HeroCurrencyBackdrop } from '@/components/layout/currencyBrandSurfaces'

type InnerPageHeaderProps = {
  title: React.ReactNode
  description?: string
  centered?: boolean
  /**
   * `muted` = slate band (default). `brand` = forest green. `currency` = banknote hero image + overlay
   * (rates / services listing).
   */
  variant?: 'muted' | 'brand' | 'currency'
  className?: string
}

export function InnerPageHeader({
  title,
  description,
  centered = true,
  variant = 'muted',
  className,
}: InnerPageHeaderProps) {
  const inner = (
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
          variant === 'currency' && 'text-white',
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
            variant === 'currency' && 'text-slate-200',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )

  if (variant === 'currency') {
    return (
      <header className={cn('border-b border-white/10', className)}>
        <HeroCurrencyBackdrop>{inner}</HeroCurrencyBackdrop>
      </header>
    )
  }

  return (
    <header
      className={cn(
        'border-b border-slate-200 dark:border-slate-800',
        variant === 'muted' && 'bg-slate-50 dark:bg-slate-900/40',
        variant === 'brand' && 'bg-[#099546] text-white border-[#088040]',
        className,
      )}
    >
      {inner}
    </header>
  )
}
