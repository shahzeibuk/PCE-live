import Image from 'next/image'
import { cn } from '@/utilities/ui'

import { CURRENCY_HERO_BACKGROUND_IMAGE } from '@/constants/currencyBrand'

type HeroCurrencyBackdropProps = {
  children: React.ReactNode
  className?: string
  /** Extra classes on the dark overlay (e.g. stronger tint). */
  overlayClassName?: string
  minHeightClassName?: string
  priority?: boolean
}

/**
 * Full-width hero-style background (banknotes image + readable overlay).
 */
export function HeroCurrencyBackdrop({
  children,
  className,
  overlayClassName,
  minHeightClassName,
  priority = false,
}: HeroCurrencyBackdropProps) {
  return (
    <div className={cn('relative overflow-hidden', minHeightClassName, className)}>
      <Image
        src={CURRENCY_HERO_BACKGROUND_IMAGE}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority={priority}
      />
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-[1] bg-linear-to-r from-slate-950/90 via-slate-950/78 to-slate-950/55',
          overlayClassName,
        )}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}

type CurrencyNoteSurfaceProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Disclaimers & CMS/fallback rate notes — subtle note texture, content stays readable.
 */
export function CurrencyNoteSurface({ children, className }: CurrencyNoteSurfaceProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border border-slate-200/90',
        className,
      )}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={CURRENCY_HERO_BACKGROUND_IMAGE}
          alt=""
          fill
          className="object-cover object-[center_30%] opacity-[0.11]"
          sizes="(max-width: 1024px) 100vw, 896px"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-slate-50/96" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
