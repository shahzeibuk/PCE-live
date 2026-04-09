import { cn } from '@/utilities/ui'
import React from 'react'

import { HeroCurrencyBackdrop } from '@/components/layout/currencyBrandSurfaces'

type InnerPageHeaderProps = {
  title: React.ReactNode
  description?: React.ReactNode
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
        'container py-8 md:py-10',
        variant === 'currency' && 'hero-below-nav',
        centered && 'text-center',
      )}
    >
      <h1
        className={cn(
          'text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight mb-3',
          variant === 'muted' && 'text-slate-900',
          variant === 'brand' && 'text-white',
          variant === 'currency' && 'text-white',
        )}
      >
        {title}
      </h1>
      {description ? (
        <p
          className={cn(
            'text-base sm:text-lg md:text-xl max-w-3xl min-w-0 leading-relaxed px-1 sm:px-0',
            centered && 'mx-auto',
            variant === 'muted' && 'text-slate-600',
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
        'border-b border-slate-200',
        variant === 'muted' && 'bg-slate-50',
        variant === 'brand' && 'bg-[#099546] text-white border-[#088040]',
        className,
      )}
    >
      {inner}
    </header>
  )
}
