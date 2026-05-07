'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

const DEFAULT_PAGE = 'https://www.facebook.com/pkcurrency'

/** Number of load attempts (initial + retries after timeout). */
const MAX_ATTEMPTS = 4
/** If the iframe does not fire `load` in this window, treat as failed and retry. */
const LOAD_TIMEOUT_MS = 16_000
/** Start loading the embed when the section is this far from the viewport (px). */
const INTERSECTION_ROOT_MARGIN = '320px'

/**
 * Facebook Page Plugin — timeline tab.
 * Override with `NEXT_PUBLIC_FACEBOOK_PAGE_URL` (full page URL).
 *
 * - Starts loading when the section nears the viewport (no click required), with a manual fallback.
 * - Retries up to MAX_ATTEMPTS if load is not confirmed in time.
 * - Plugin URL does not use Facebook's lazy mode; iframe uses eager loading so timers match real network work.
 */
export function FacebookPageEmbed() {
  const sectionRef = useRef<HTMLElement>(null)
  const [showEmbed, setShowEmbed] = useState(false)
  const [attemptIndex, setAttemptIndex] = useState(0)
  const [loadConfirmed, setLoadConfirmed] = useState(false)
  const [gaveUp, setGaveUp] = useState(false)
  const [iframeSrc, setIframeSrc] = useState('')
  const loadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const href = (
    process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL?.trim() || DEFAULT_PAGE
  ).replace(/\/$/, '')

  const buildSrc = useCallback(
    (attempt: number) =>
      `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(href)}&tabs=timeline&width=500&height=480&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=&_try=${attempt}&_cb=${Date.now()}`,
    [href],
  )

  const clearLoadTimer = useCallback(() => {
    if (loadTimerRef.current) {
      clearTimeout(loadTimerRef.current)
      loadTimerRef.current = null
    }
  }, [])

  const startShowingEmbed = useCallback(() => {
    clearLoadTimer()
    setGaveUp(false)
    setLoadConfirmed(false)
    setAttemptIndex(0)
    setShowEmbed(true)
  }, [clearLoadTimer])

  const retryManual = useCallback(() => {
    clearLoadTimer()
    setGaveUp(false)
    setLoadConfirmed(false)
    setAttemptIndex(0)
    setShowEmbed(true)
    setIframeSrc(buildSrc(0))
  }, [buildSrc, clearLoadTimer])

  const handleIframeLoad = useCallback(() => {
    clearLoadTimer()
    setLoadConfirmed(true)
    setGaveUp(false)
  }, [clearLoadTimer])

  /** Begin embed when the block is near the viewport (or if IntersectionObserver is unavailable). */
  useEffect(() => {
    let cancelled = false
    const begin = () => {
      if (!cancelled) setShowEmbed(true)
    }

    const el = sectionRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      begin()
      return () => {
        cancelled = true
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          begin()
          io.disconnect()
        }
      },
      { rootMargin: INTERSECTION_ROOT_MARGIN, threshold: 0.01 },
    )
    io.observe(el)
    return () => {
      cancelled = true
      io.disconnect()
    }
  }, [])

  /** Keep iframe URL in sync with retry attempts (do not nest setState inside other updaters). */
  useEffect(() => {
    if (!showEmbed || gaveUp) return
    setIframeSrc(buildSrc(attemptIndex))
  }, [showEmbed, gaveUp, attemptIndex, buildSrc])

  /** Timeout → bump attempt or give up. */
  useEffect(() => {
    if (!showEmbed || loadConfirmed || gaveUp) return

    clearLoadTimer()
    loadTimerRef.current = setTimeout(() => {
      setAttemptIndex((i) => {
        if (i >= MAX_ATTEMPTS - 1) {
          setGaveUp(true)
          return i
        }
        return i + 1
      })
    }, LOAD_TIMEOUT_MS)

    return clearLoadTimer
  }, [showEmbed, attemptIndex, loadConfirmed, gaveUp, clearLoadTimer])

  useEffect(() => () => clearLoadTimer(), [clearLoadTimer])

  return (
    <section
      ref={sectionRef}
      className="border-t border-slate-200 bg-slate-50 py-14 md:py-20"
      aria-labelledby="facebook-feed-heading"
    >
      <div className="container px-4">
        <h2
          id="facebook-feed-heading"
          className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-2"
        >
          Updates on Facebook
        </h2>
        <p className="text-center text-slate-600 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Follow Pakistan Currency Exchange for rate alerts, branch news, and customer announcements.
        </p>
        <div className="mx-auto flex w-full max-w-full justify-center">
          <div className="w-full max-w-[500px] min-h-[min(480px,70vh)] min-w-0 rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
            {gaveUp ? (
              <div className="flex h-[min(480px,70vh)] w-full flex-col items-center justify-center gap-4 bg-white px-6 text-center">
                <p className="text-sm text-slate-600">
                  The Facebook feed did not load after {MAX_ATTEMPTS} attempts. Check your connection, ad
                  blocker, or privacy settings.
                </p>
                <button
                  type="button"
                  onClick={retryManual}
                  className="inline-flex items-center justify-center rounded-md bg-[#099546] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#088040]"
                >
                  Try loading again
                </button>
              </div>
            ) : showEmbed ? (
              iframeSrc ? (
                <div className="flex h-[min(480px,70vh)] w-full flex-col">
                  {!loadConfirmed ? (
                    <div className="flex shrink-0 items-center justify-center gap-2 border-b border-slate-100 bg-slate-50 px-3 py-2 text-center text-xs text-slate-600">
                      <span
                        className="inline-block size-3.5 shrink-0 animate-spin rounded-full border-2 border-[#099546] border-t-transparent"
                        aria-hidden
                      />
                      <span>
                        Loading Facebook…
                        {attemptIndex > 0
                          ? ` (retry ${attemptIndex + 1} of ${MAX_ATTEMPTS})`
                          : null}
                      </span>
                    </div>
                  ) : null}
                  <iframe
                    key={`fb-embed-${attemptIndex}`}
                    title="Pakistan Currency Exchange on Facebook"
                    src={iframeSrc}
                    onLoad={handleIframeLoad}
                    className="min-h-0 w-full max-w-full flex-1 border-0 bg-white"
                    style={{ maxWidth: '100%' }}
                    loading="eager"
                    scrolling="no"
                    allow="encrypted-media"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              ) : (
                <div className="flex h-[min(480px,70vh)] w-full flex-col items-center justify-center gap-2 bg-white px-6">
                  <span
                    className="inline-block size-8 shrink-0 animate-spin rounded-full border-2 border-[#099546] border-t-transparent"
                    aria-hidden
                  />
                  <p className="text-center text-xs text-slate-600">Preparing Facebook feed…</p>
                </div>
              )
            ) : (
              <div className="flex h-[min(480px,70vh)] w-full flex-col items-center justify-center gap-4 bg-white px-6 text-center">
                <p className="text-sm text-slate-600">
                  Facebook feed is blocked by some browsers, ad blockers, and privacy settings.
                </p>
                <button
                  type="button"
                  onClick={startShowingEmbed}
                  className="inline-flex items-center justify-center rounded-md bg-[#099546] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#088040]"
                >
                  Load Facebook feed
                </button>
              </div>
            )}
          </div>
        </div>
        <p className="text-center mt-6 text-sm text-slate-600">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#099546] hover:underline"
          >
            Open our Facebook page
          </a>{' '}
          if the feed does not load (ad blockers or privacy settings can block embedded plugins).
        </p>
      </div>
    </section>
  )
}
