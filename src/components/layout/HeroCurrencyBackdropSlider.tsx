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

/**
 * Homepage hero carousel: CSS translate — arrows mid left/right, dots along the bottom of the hero image.
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
  const viewportRef = useRef<HTMLDivElement | null>(null)

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
      <div className={cn('relative min-h-0 flex-1', ratesAside && minHeightClassName)}>
      <div
        ref={viewportRef}
        className={cn(
          'overflow-hidden touch-pan-y select-none',
          ratesAside && 'lg:pr-[min(22rem,36vw)] xl:pr-[28rem]',
          isPointerDragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div
          className={cn(
            'flex items-stretch',
            !reduceMotion &&
              !isPointerDragging &&
              'transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
          )}
          style={{
            transform: `translate3d(calc(-${index * 100}% + ${
              viewportRef.current && viewportRef.current.clientWidth > 0
                ? `${(dragOffsetPx / viewportRef.current.clientWidth) * 100}%`
                : '0px'
            }), 0, 0)`,
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.imageSrc}
              className={cn(
                'relative isolate w-full min-w-0 shrink-0 grow-0 basis-full',
                minHeightClassName,
              )}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}`}
              {...(i !== index ? { inert: true as const } : {})}
            >
              <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
                <Image
                  src={slide.imageSrc}
                  alt=""
                  fill
                  className="object-cover object-[center_42%] md:object-center"
                  sizes="100vw"
                  priority={priority && i === 0}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-b from-white/93 via-white/78 to-white/55 sm:bg-gradient-to-r sm:from-white/94 sm:via-white/72 sm:to-transparent md:from-white/[0.93] md:via-white/60"
                  aria-hidden
                />
              </div>

              <div className="hero-below-nav relative z-10 flex w-full flex-col justify-center max-sm:justify-start">
                <div
                  className={cn(
                    'container px-4 pb-3 pt-1 sm:pb-5 sm:pt-4 md:pb-6 md:pt-5 lg:pb-6 lg:pt-6',
                    n > 1 && 'pb-10 sm:pb-14',
                  )}
                >
                  <div className="max-w-2xl space-y-0 break-words">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#099546] sm:text-sm">
                      {slide.eyebrow}
                    </p>
                    <h1 className="text-pretty mt-2 text-2xl font-black leading-[1.15] tracking-tight text-[#2a313c] sm:mt-4 sm:text-4xl sm:leading-[1.12] md:mt-5 md:text-5xl lg:mt-6 lg:text-6xl lg:leading-[1.1]">
                      {slide.h1}
                    </h1>
                    <p className="mt-2 max-w-xl text-sm leading-snug text-slate-700 sm:mt-5 sm:hidden md:leading-relaxed">
                      {slide.leadShort}
                    </p>
                    <p className="mt-4 max-w-xl hidden text-base leading-relaxed text-slate-700 sm:mt-5 sm:block md:mt-6 md:text-lg md:leading-relaxed lg:text-xl lg:leading-relaxed">
                      {slide.lead}
                    </p>
                    <div className="mt-4 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:mt-10">
                      <Button
                        asChild
                        className="min-h-11 w-full rounded p-0 sm:min-h-12 sm:w-auto"
                      >
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {ratesAside ? (
        <aside
          className="pointer-events-none absolute bottom-0 right-0 top-[var(--site-header-height)] z-20 hidden w-[min(100%,22rem)] lg:flex lg:flex-col xl:w-[28rem]"
          aria-label="Live exchange rates"
        >
          <div className="pointer-events-auto flex h-full min-h-0 w-full flex-col">{ratesAside}</div>
        </aside>
      ) : null}

      {n > 1 ? (
        <>
          {/* Dots: bottom center of slider */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 sm:pb-3 sm:pt-0 md:pb-4"
            aria-label="Slide indicators"
          >
            <div className="pointer-events-auto flex items-center justify-center gap-2 rounded-full border border-white/40 bg-slate-900/25 px-3 py-1.5 backdrop-blur-sm sm:gap-2.5 sm:px-4 sm:py-2">
              {slides.map((s, i) => (
                <button
                  key={s.imageSrc}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    'h-2 rounded-full transition-[width,background-color] duration-300',
                    i === index
                      ? 'w-8 bg-white shadow-sm'
                      : 'w-2 bg-white/55 hover:bg-white/85',
                  )}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </div>

          {/* Arrows: vertical center, left & right */}
          <button
            type="button"
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-white/35 bg-slate-900/35 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-slate-900/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-3 sm:h-11 sm:w-11 md:left-4 md:h-12 md:w-12"
            onClick={goPrev}
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            className={cn(
              'absolute top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-white/35 bg-slate-900/35 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-slate-900/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-11 sm:w-11 md:h-12 md:w-12',
              ratesAside ? 'right-2 sm:right-3 lg:right-[min(22rem,36vw)] xl:right-[28rem]' : 'right-2 sm:right-3 md:right-4',
            )}
            onClick={goNext}
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
          </button>
        </>
      ) : null}
      </div>

      {ratesAside ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">{ratesAside}</div>
      ) : null}
    </div>
  )
}
