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
}

type Props = {
  service: ServiceLike
  className?: string
}

/**
 * CMS upload first; otherwise keyword → MoneyGram asset / Lucide by service theme.
 */
export function ServiceListingIcon({ service, className }: Props) {
  const title = (service.title ?? '').toLowerCase()
  const slug = (service.slug ?? '').toLowerCase()
  const key = `${slug} ${title}`

  const wrap = (children: ReactNode) => (
    <div
      className={cn(
        'w-16 h-16 shrink-0 rounded border bg-white border-slate-200 flex items-center justify-center',
        className,
      )}
    >
      {children}
    </div>
  )

  if (service.icon && typeof service.icon === 'object') {
    return wrap(<Media resource={service.icon as never} className="w-10 h-10 object-contain" />)
  }

  if (key.includes('moneygram')) {
    return wrap(
      <Image
        src="/service-icons/moneygram.svg"
        alt=""
        width={40}
        height={40}
        className="object-contain"
      />,
    )
  }

  if (key.includes('western') && key.includes('union')) {
    return wrap(<Send className="w-10 h-10 text-[#099546]" aria-hidden />)
  }

  if (key.includes('demand') && key.includes('draft')) {
    return wrap(<FileText className="w-10 h-10 text-[#099546]" aria-hidden />)
  }

  if (key.includes('draft') || key.includes('dd ')) {
    return wrap(<FileText className="w-10 h-10 text-[#099546]" aria-hidden />)
  }

  if (
    key.includes('currency') ||
    key.includes('exchange') ||
    key.includes('forex') ||
    key.includes('fx ')
  ) {
    return wrap(<ArrowRightLeft className="w-10 h-10 text-[#099546]" aria-hidden />)
  }

  if (key.includes('remittance') || key.includes('transfer') || key.includes('send money')) {
    return wrap(<Send className="w-10 h-10 text-[#099546]" aria-hidden />)
  }

  if (key.includes('treasury') || key.includes('bank') || key.includes('account')) {
    return wrap(<Landmark className="w-10 h-10 text-[#099546]" aria-hidden />)
  }

  if (
    key.includes('time machine') ||
    key.includes('pakistan time') ||
    key.includes('initiative') ||
    key.includes('tmi')
  ) {
    return wrap(<Clock className="w-10 h-10 text-[#099546]" aria-hidden />)
  }

  if (key.includes('cash') || key.includes('notes') || key.includes('bulk')) {
    return wrap(<Banknote className="w-10 h-10 text-[#099546]" aria-hidden />)
  }

  if (key.includes('corporate') || key.includes('business') || key.includes('payroll')) {
    return wrap(<Sparkles className="w-10 h-10 text-[#099546]" aria-hidden />)
  }

  return wrap(<Coins className="w-10 h-10 text-[#099546]" aria-hidden />)
}
