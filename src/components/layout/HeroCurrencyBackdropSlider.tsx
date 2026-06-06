'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import type { HomeHeroCarouselSlide } from '@/components/home/homeContent'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

type HeroCurrencyBackdropSliderProps = {
  slides: readonly HomeHeroCarouselSlide[]
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string; external?: boolean }
  /** Live rates panel — fixed on the right on large screens (server component slot). */
  ratesAside?: React.ReactNode
  className?: string
  minHeightClassName?: string
  priority?: boolean
}

const SWIPE_PX = 50

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false
  return Boolean(
    target.closest(
      'a[href], button, input, textarea, select, [role="button"], [role="link"], [role="tab"], label',
    ),
  )
}

const heroNavBtnClass =
  'flex h-9 w-9 shrink-0 touch-manipulation items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-[#099546]/10 hover:text-[#099546] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#099546] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-35 sm:h-10 sm:w-10'

/** Desktop grid: copy column shrinks; rates column scales between breakpoints. */
const heroDesktopGridClass =
  'lg:grid lg:grid-cols-[minmax(0,1fr)_clamp(15rem,34vw,22rem)] lg:gap-x-5 xl:grid-cols-[minmax(0,1fr)_clamp(17rem,30vw,28rem)] xl:gap-x-6 2xl:gap-x-8'

type HeroSlideCopyProps = {
  slide: HomeHeroCarouselSlide
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string; external?: boolean }
  hasNav: boolean
  withRatesColumn: boolean
}

function HeroSlideCopy({
  slide,
  primaryCta,
  secondaryCta,
  hasNav,
  withRatesColumn,
}: HeroSlideCopyProps) {
  return (
    <div
      className={cn(
        'min-w-0 space-y-0 break-words pb-3 pt-1 sm:pb-5 sm:pt-4 md:pb-6 md:pt-5 lg:pb-6 lg:pt-6',
        hasNav && 'pb-[4.5rem] sm:pb-20 lg:pb-[4.75rem]',
      )}
    >
      <div className={cn('min-w-0 max-w-2xl', withRatesColumn && 'lg:max-w-none')}>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#099546] sm:text-sm">
          {slide.eyebrow}
        </p>
        <h1 className="text-pretty mt-2 text-2xl font-black leading-[1.15] tracking-tight text-[#2a313c] sm:mt-4 sm:text-4xl sm:leading-[1.12] md:mt-5 md:text-5xl lg:mt-5 lg:text-[2.65rem] lg:leading-[1.12] xl:mt-6 xl:text-5xl 2xl:text-6xl 2xl:leading-[1.1]">
          {slide.h1}
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-snug text-slate-700 sm:mt-5 sm:hidden md:leading-relaxed">
          {slide.leadShort}
        </p>
        <p className="mt-4 max-w-xl hidden text-base leading-relaxed text-slate-700 sm:mt-5 sm:block md:mt-6 md:text-lg lg:max-w-none lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed 2xl:text-xl 2xl:leading-relaxed">
          {slide.lead}
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:mt-10">
          <Button asChild className="min-h-11 w-full rounded p-0 sm:min-h-12 sm:w-auto">
            <Link
              href={primaryCta.href}
              className="group/hero-btn relative inline-flex min-h-11 w-full items-center justify-center overflow-hidden rounded bg-[#099546] px-5 text-sm font-semibold text-white sm:min-h-12 sm:px-6 sm:w-auto"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-[#088040] transition-transform duration-500 ease-out group-hover/hero-btn:scale-y-100"
              />
              <span className="relative z-10">{primaryCta.label}</span>
            </Link>
          </Button>
          {secondaryCta.external ? (
            <Button
              asChild
              variant="outline"
              className="min-h-11 w-full rounded border-2 border-slate-800 bg-white/80 p-0 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur-sm sm:min-h-12 sm:w-auto"
            >
              <a
                href={secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/hero-btn relative inline-flex min-h-11 w-full items-center justify-center overflow-hidden rounded px-5 text-sm text-slate-900 sm:min-h-12 sm:px-6 sm:w-auto"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-[#099546] transition-transform duration-500 ease-out group-hover/hero-btn:scale-y-100"
                />
                <span className="relative z-10 transition-colors duration-300 group-hover/hero-btn:text-white">
                  {secondaryCta.label}
                </span>
              </a>
            </Button>
          ) : (
            <Button
              asChild
              variant="outline"
              className="min-h-11 w-full rounded border-2 border-slate-800 bg-white/80 p-0 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur-sm sm:min-h-12 sm:w-auto"
            >
              <Link
                href={secondaryCta.href}
                className="group/hero-btn relative inline-flex min-h-11 w-full items-center justify-center overflow-hidden rounded px-5 text-sm text-slate-900 sm:min-h-12 sm:px-6 sm:w-auto"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-[#099546] transition-transform duration-500 ease-out group-hover/hero-btn:scale-y-100"
                />
                <span className="relative z-10 transition-colors duration-300 group-hover/hero-btn:text-white">
                  {secondaryCta.label}
                </span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Homepage hero carousel: unified bottom nav (prev · dots · next) aligned to site container.
 */
export function HeroCurrencyBackdropSlider({
  slides,
  primaryCta,
  secondaryCta,
  ratesAside,
  className,
  minHeightClassName,
  priority = false,
}: HeroCurrencyBackdropSliderProps) {
  const n = slides.length
  const [index, setIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [isPointerDragging, setIsPointerDragging] = useState(false)
  const [dragOffsetPx, setDragOffsetPx] = useState(0)
  const pointerStartX = useRef<number | null>(null)
  const activePointerId = useRef<number | null>(null)
  const bgViewportRef = useRef<HTMLDivElement | null>(null)
  const textViewportRef = useRef<HTMLDivElement | null>(null)

  const slideTransform = (viewportEl: HTMLDivElement | null) =>
    `translate3d(calc(-${index * 100}% + ${
      viewportEl && viewportEl.clientWidth > 0
        ? `${(dragOffsetPx / viewportEl.clientWidth) * 100}%`
        : '0px'
    }), 0, 0)`

  const trackTransition =
    !reduceMotion && !isPointerDragging
      ? 'transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]'
      : undefined

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const goTo = useCallback(
    (i: number) => {
      if (n <= 0) return
      const next = ((i % n) + n) % n
      setIndex(next)
    },
    [n],
  )

  const goPrev = useCallback(() => {
    goTo(index - 1)
  }, [goTo, index])

  const goNext = useCallback(() => {
    goTo(index + 1)
  }, [goTo, index])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (n < 2) return
      const t = e.target as HTMLElement | null
      if (t?.closest('input, textarea, select, [contenteditable="true"]')) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext, n])

  useEffect(() => {
    if (n < 2 || reduceMotion || isPointerDragging) return
    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % n)
    }, 5000)
    return () => window.clearInterval(interval)
  }, [n, reduceMotion, isPointerDragging])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (n < 2 || !e.isPrimary) return
    if (e.pointerType === 'mouse' && e.button !== 0) return
    // Avoid pointer capture on CTAs / controls — it prevents click navigation on desktop.
    if (isInteractiveTarget(e.target)) return
    pointerStartX.current = e.clientX
    activePointerId.current = e.pointerId
    setIsPointerDragging(true)
    setDragOffsetPx(0)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (
      pointerStartX.current === null ||
      activePointerId.current === null ||
      e.pointerId !== activePointerId.current ||
      n < 2
    ) {
      return
    }
    setDragOffsetPx(e.clientX - pointerStartX.current)
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (
      pointerStartX.current === null ||
      activePointerId.current === null ||
      e.pointerId !== activePointerId.current ||
      n < 2
    ) {
      return
    }
    const delta = e.clientX - pointerStartX.current
    pointerStartX.current = null
    activePointerId.current = null
    setIsPointerDragging(false)
    setDragOffsetPx(0)
    if (delta > SWIPE_PX) goPrev()
    else if (delta < -SWIPE_PX) goNext()
  }

  const onPointerCancel = () => {
    pointerStartX.current = null
    activePointerId.current = null
    setIsPointerDragging(false)
    setDragOffsetPx(0)
  }

  return (
    <div
      className={cn('group/hero-slider relative flex flex-col overflow-x-hidden bg-slate-100', className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Homepage highlights"
    >
      <div
        className={cn(
          'relative isolate min-h-0 flex-1',
          ratesAside && minHeightClassName,
        )}
      >
        {/* Full-bleed background carousel */}
        <div
          ref={bgViewportRef}
          className="absolute inset-0 z-0 overflow-hidden"
          aria-hidden
        >
          <div
            className={cn('flex h-full items-stretch', trackTransition)}
            style={{ transform: slideTransform(bgViewportRef.current) }}
          >
            {slides.map((slide, i) => (
              <div
                key={`bg-${slide.imageSrc}`}
                className={cn(
                  'relative h-full w-full min-w-0 shrink-0 grow-0 basis-full',
                  minHeightClassName,
                )}
              >
                <Image
                  src={slide.imageSrc}
                  alt=""
                  fill
                  className="object-cover object-[center_42%] md:object-center"
                  sizes="100vw"
                  priority={priority && i === 0}
                />
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-b from-white/93 via-white/78 to-white/55',
                    'sm:bg-gradient-to-r sm:from-white/94 sm:via-white/72 sm:to-transparent',
                    ratesAside
                      ? 'md:from-white/[0.93] md:via-white/65 lg:via-white/58 xl:via-white/52'
                      : 'md:from-white/[0.93] md:via-white/60',
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Swipe layer (full hero; skips links/buttons) */}
        <div
          className={cn(
            'absolute inset-0 z-[5] touch-pan-y select-none',
            n > 1 && (isPointerDragging ? 'cursor-grabbing' : 'cursor-grab'),
          )}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          aria-hidden
        />

        {/* Foreground: grid keeps copy and rates in separate columns on desktop */}
        <div className="hero-below-nav relative z-10 flex min-h-full w-full flex-col justify-center max-sm:justify-start pointer-events-none">
          <div
            className={cn(
              'container mx-auto w-full px-4 pointer-events-auto',
              ratesAside && heroDesktopGridClass,
            )}
          >
            <div
              ref={textViewportRef}
              className="min-w-0 overflow-hidden"
              role="region"
              aria-roledescription="carousel"
              aria-label="Homepage slide copy"
            >
              <div
                className={cn('flex items-stretch', trackTransition)}
                style={{ transform: slideTransform(textViewportRef.current) }}
              >
                {slides.map((slide, i) => (
                  <div
                    key={`copy-${slide.imageSrc}`}
                    className="w-full min-w-0 shrink-0 grow-0 basis-full"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${n}`}
                    {...(i !== index ? { inert: true as const } : {})}
                  >
                    <HeroSlideCopy
                      slide={slide}
                      primaryCta={primaryCta}
                      secondaryCta={secondaryCta}
                      hasNav={n > 1}
                      withRatesColumn={Boolean(ratesAside)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {ratesAside ? (
              <aside
                className="hidden min-h-0 min-w-0 flex-col self-stretch py-4 md:py-5 lg:flex lg:py-6"
                aria-label="Live exchange rates"
              >
                <div className="flex h-full min-h-0 w-full flex-col rounded-md shadow-lg shadow-slate-900/10">
                  {ratesAside}
                </div>
              </aside>
            ) : null}
          </div>
        </div>

      {n > 1 ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-3 sm:pb-4 md:pb-5 lg:pb-6">
          <nav
            className="pointer-events-auto inline-flex max-w-full items-center gap-0.5 rounded-full border border-slate-200/90 bg-white/95 p-1 shadow-md shadow-slate-900/10 backdrop-blur-sm"
              aria-label="Carousel navigation"
            >
              <button
                type="button"
                aria-label="Previous slide"
                className={heroNavBtnClass}
                onClick={goPrev}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>

              <div
                className="flex min-w-0 items-center justify-center gap-1.5 px-2 sm:gap-2 sm:px-3"
                aria-label="Slide indicators"
              >
                {slides.map((s, i) => (
                  <button
                    key={s.imageSrc}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index ? 'true' : undefined}
                    className={cn(
                      'rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#099546] focus-visible:ring-offset-2',
                      i === index
                        ? 'h-2 w-7 bg-[#099546] shadow-sm'
                        : 'h-2 w-2 bg-slate-300 hover:bg-slate-400',
                    )}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Next slide"
                className={heroNavBtnClass}
                onClick={goNext}
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </nav>
        </div>
      ) : null}
      </div>

      {ratesAside ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">{ratesAside}</div>
      ) : null}
    </div>
  )
}
