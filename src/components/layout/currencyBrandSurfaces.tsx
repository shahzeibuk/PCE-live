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
    <div
      className={cn(
        'relative flex flex-col overflow-hidden',
        minHeightClassName,
        className,
      )}
    >
      <Image
        src={CURRENCY_HERO_BACKGROUND_IMAGE}
        alt=""
        fill
        className="object-cover object-[center_22%] scale-[1.04] motion-reduce:scale-100"
        sizes="100vw"
        priority={priority}
      />
      {/* Base tint + subtle depth; text stays readable without flattening the photo */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-[1] bg-linear-to-br from-slate-950/88 via-slate-900/65 to-slate-950/50',
          overlayClassName,
        )}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_110%_75%_at_72%_18%,transparent_35%,rgb(15_23_42/0.52)_100%)]"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">{children}</div>
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
