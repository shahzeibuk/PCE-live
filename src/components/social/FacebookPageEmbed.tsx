'use client'

import React, { useState } from 'react'

const DEFAULT_PAGE = 'https://www.facebook.com/pkcurrency'

/**
 * Facebook Page Plugin — timeline tab, lazy-loaded iframe.
 * Override with `NEXT_PUBLIC_FACEBOOK_PAGE_URL` (full page URL).
 */
export function FacebookPageEmbed() {
  const [showEmbed, setShowEmbed] = useState(false)
  const href = (
    process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL?.trim() || DEFAULT_PAGE
  ).replace(/\/$/, '')
  const src = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(href)}&tabs=timeline&width=500&height=480&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=&lazy=true`

  return (
    <section
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
            {showEmbed ? (
              <iframe
                title="Pakistan Currency Exchange on Facebook"
                src={src}
                className="block h-[min(480px,70vh)] w-full max-w-full border-0 bg-white"
                style={{ maxWidth: '100%' }}
                loading="lazy"
                scrolling="no"
                allow="encrypted-media"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <div className="flex h-[min(480px,70vh)] w-full flex-col items-center justify-center gap-4 bg-white px-6 text-center">
                <p className="text-sm text-slate-600">
                  Facebook feed is blocked by some browsers, ad blockers, and privacy settings.
                </p>
                <button
                  type="button"
                  onClick={() => setShowEmbed(true)}
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
