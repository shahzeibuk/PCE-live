'use client'

import { useEffect, useRef, useState } from 'react'

import { HOME_INDEX_HEADING_CLASS, HOME_TRUST } from '@/components/home/homeContent'

const BRAND_GREEN_CLASS = 'text-[#099546]'

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

export function HomeTrustAnimatedStats() {
  const { stats } = HOME_TRUST
  const listRef = useRef<HTMLUListElement>(null)
  const [values, setValues] = useState(() => stats.map(() => 0))
  const startedRef = useRef(false)

  useEffect(() => {
    const el = listRef.current
    if (!el) return

    let cancelled = false
    const targets = stats.map((s) => s.target)

    const runAnimation = () => {
      if (startedRef.current) return
      startedRef.current = true

      const reduced =
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduced) {
        if (!cancelled) setValues(targets)
        return
      }

      const durationMs = 1400
      const t0 = performance.now()

      const tick = (now: number) => {
        if (cancelled) return
        const t = Math.min(1, (now - t0) / durationMs)
        const eased = easeOutCubic(t)
        setValues(targets.map((target) => Math.round(target * eased)))
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        runAnimation()
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [stats])

  return (
    <ul
      ref={listRef}
      className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 md:gap-10 lg:gap-12 list-none p-0 m-0"
    >
      {stats.map((stat, i) => (
        <li key={stat.label} className="flex flex-col items-center">
          <span
            className={`text-4xl sm:text-5xl md:text-[3.25rem] lg:text-6xl font-black tabular-nums tracking-tight leading-none ${BRAND_GREEN_CLASS}`}
          >
            {values[i]}
            {stat.suffix}
          </span>
          <p className={`mt-3 md:mt-4 text-sm md:text-base leading-snug max-w-[14rem] ${HOME_INDEX_HEADING_CLASS}`}>
            {stat.label}
          </p>
        </li>
      ))}
    </ul>
  )
}
