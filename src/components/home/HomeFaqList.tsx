'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

import { HOME_INDEX_HEADING_CLASS } from '@/components/home/homeContent'
import type { HomeFaqItemProps } from '@/utilities/getHomeFaqSectionProps'

type Props = {
  heading: string
  subheading: string
  initialVisibleCount: number
  items: HomeFaqItemProps[]
}

export function HomeFaqList({ heading, subheading, initialVisibleCount, items }: Props) {
  const cap = useMemo(
    () => Math.min(Math.max(1, Math.floor(initialVisibleCount)), items.length),
    [initialVisibleCount, items.length],
  )
  const [expanded, setExpanded] = useState(false)
  const hasMore = items.length > cap
  const visibleItems = expanded || !hasMore ? items : items.slice(0, cap)

  return (
    <div className="container px-4 max-w-3xl mx-auto">
      <h2 id="home-faq-heading" className={`text-2xl md:text-3xl text-center mb-2 ${HOME_INDEX_HEADING_CLASS}`}>
        {heading}
      </h2>
      <p className="text-center text-slate-600 mb-8 md:mb-10">{subheading}</p>
      <div className="space-y-3 w-full md:w-[70%] md:mx-auto">
        {visibleItems.map((item, i) => (
          <details
            key={`faq-${i}-${item.q.slice(0, 24)}`}
            className="group rounded-xl border border-slate-200 bg-white px-4 py-3.5 md:px-5 md:py-4 shadow-sm open:shadow-md"
          >
            <summary className="relative cursor-pointer list-none flex items-center gap-3 py-0.5 md:min-h-[2.75rem] md:justify-center">
              <span className="min-w-0 flex-1 md:flex-none md:max-w-[calc(100%-2rem)] text-left md:text-center text-pretty text-[15px] md:text-base font-semibold text-slate-700 leading-snug md:mx-auto md:pl-2 md:pr-8">
                {item.q}
              </span>
              <ChevronDown
                className="absolute right-0 top-1/2 h-5 w-5 shrink-0 -translate-y-1/2 text-slate-500 transition-transform group-open:rotate-180 md:right-1"
                aria-hidden
              />
            </summary>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-left">
              {item.a}
            </p>
          </details>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:border-[#099546]/50 hover:text-[#099546] transition-colors"
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : `Show more (${items.length - cap} more)`}
          </button>
        </div>
      ) : null}

      <p className="text-center mt-10 md:mt-12 text-sm text-slate-600">
        Still unsure?{' '}
        <Link href="/contact" className="font-semibold text-[#099546] hover:underline">
          Contact our team
        </Link>
        .
      </p>
    </div>
  )
}
