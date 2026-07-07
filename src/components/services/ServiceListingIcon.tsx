import type { ReactNode } from 'react'
import Image from 'next/image'
import {
  ArrowRightLeft,
  Banknote,
  Clock,
  Coins,
  FileText,
  Landmark,
  Send,
  Sparkles,
} from 'lucide-react'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

type ServiceLike = {
  title?: string | null
  slug?: string | null
  icon?: unknown
  hero_image?: unknown
}

type IconSize = 'default' | 'large'

type Props = {
  service: ServiceLike
  className?: string
  size?: IconSize
}

const sizeClasses: Record<
  IconSize,
  { wrap: string; media: string; lucide: string; image: { width: number; height: number; className: string } }
> = {
  default: {
    wrap: 'w-16 h-16',
    media: 'relative h-10 w-10',
    lucide: 'w-10 h-10',
    image: { width: 40, height: 40, className: 'object-contain' },
  },
  large: {
    wrap: 'w-24 h-24 md:w-28 md:h-28',
    media: 'relative h-16 w-16 md:h-20 md:w-20',
    lucide: 'w-16 h-16 md:w-20 md:h-20',
    image: { width: 80, height: 80, className: 'object-contain h-16 w-16 md:h-20 md:w-20' },
  },
}

/**
 * CMS upload first; otherwise keyword → MoneyGram asset / Lucide by service theme.
 */
export function ServiceListingIcon({ service, className, size = 'default' }: Props) {
  const title = (service.title ?? '').toLowerCase()
  const slug = (service.slug ?? '').toLowerCase()
  const key = `${slug} ${title}`
  const s = sizeClasses[size]
  const lucideClass = cn(s.lucide, 'text-[#099546]')

  const wrap = (children: ReactNode) => (
    <div
      className={cn(
        'shrink-0 rounded border bg-white border-slate-200 flex items-center justify-center',
        s.wrap,
        className,
      )}
    >
      {children}
    </div>
  )

  if (service.icon && typeof service.icon === 'object') {
    return wrap(
      <Media
        resource={service.icon as never}
        className={s.media}
        imgClassName="h-full w-full object-contain"
      />,
    )
  }

  if (service.hero_image && typeof service.hero_image === 'object') {
    return wrap(
      <Media
        resource={service.hero_image as never}
        className={cn(s.media, 'overflow-hidden rounded-sm')}
        imgClassName="h-full w-full object-cover"
      />,
    )
  }

  if (key.includes('moneygram')) {
    return wrap(
      <Image
        src="/service-icons/moneygram.svg"
        alt=""
        width={s.image.width}
        height={s.image.height}
        className={s.image.className}
      />,
    )
  }

  if (key.includes('western') && key.includes('union')) {
    return wrap(<Send className={lucideClass} aria-hidden />)
  }

  if (key.includes('demand') && key.includes('draft')) {
    return wrap(<FileText className={lucideClass} aria-hidden />)
  }

  if (key.includes('draft') || key.includes('dd ')) {
    return wrap(<FileText className={lucideClass} aria-hidden />)
  }

  if (
    key.includes('currency') ||
    key.includes('exchange') ||
    key.includes('forex') ||
    key.includes('fx ')
  ) {
    return wrap(<ArrowRightLeft className={lucideClass} aria-hidden />)
  }

  if (key.includes('remittance') || key.includes('transfer') || key.includes('Convert ')) {
    return wrap(<Send className={lucideClass} aria-hidden />)
  }

  if (key.includes('treasury') || key.includes('bank') || key.includes('account')) {
    return wrap(<Landmark className={lucideClass} aria-hidden />)
  }

  if (
    key.includes('time machine') ||
    key.includes('pakistan time') ||
    key.includes('initiative') ||
    key.includes('tmi')
  ) {
    return wrap(<Clock className={lucideClass} aria-hidden />)
  }

  if (key.includes('cash') || key.includes('notes') || key.includes('bulk')) {
    return wrap(<Banknote className={lucideClass} aria-hidden />)
  }

  if (key.includes('corporate') || key.includes('business') || key.includes('payroll')) {
    return wrap(<Sparkles className={lucideClass} aria-hidden />)
  }

  return wrap(<Coins className={lucideClass} aria-hidden />)
}
