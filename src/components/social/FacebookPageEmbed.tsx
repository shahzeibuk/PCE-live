import React from 'react'

const DEFAULT_PAGE = 'https://www.facebook.com/pkcurrency'

/**
 * Facebook Page Plugin — timeline tab, lazy-loaded iframe.
 * Override with `NEXT_PUBLIC_FACEBOOK_PAGE_URL` (full page URL).
 */
export function FacebookPageEmbed() {
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
        <div className="max-w-[100%] mx-auto flex justify-center">
          <div className="w-full max-w-[500px] min-h-[420px] rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
            <iframe
              title="Pakistan Currency Exchange on Facebook"
              src={src}
              className="w-full border-0 bg-white"
              style={{ height: 480 }}
              loading="lazy"
              scrolling="no"
              allow="encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
            />
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
