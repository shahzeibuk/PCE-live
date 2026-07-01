import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { PartnersCarousel } from '@/components/PartnersCarousel'
import { Facebook, Linkedin, Twitter, Mail, Phone, MessageCircle } from 'lucide-react'
import { FOOTER_COMPANY_BLURB } from '@/components/home/homeContent'
import { FacebookPageEmbed } from '@/components/social/FacebookPageEmbed'
import { SOCIAL_FACEBOOK, SOCIAL_LINKEDIN, SOCIAL_TWITTER } from '@/constants/social'

const REGISTERED_OFFICE = {
  lines: [
    'Office 7, 8, 9 Al-Rasheed Chamber',
    'Block 6, 12/A P.E.C.H.S., Main Shahrah-e-Faisal',
    'Karachi, Pakistan',
  ],
}

const FOOTER_QUICK_LINKS = [
  { href: '/currency-rates', label: 'Exchange rates' },
  { href: '/branches', label: 'Branch locator' },
  { href: '/services', label: 'Services' },
  { href: '/financial-reports', label: 'Financial reports' },
  { href: '/contact', label: 'Contact' },
  { href: '/posts', label: 'Blog' },
] as const

const linkColumnHeadingClass =
  'text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500 mb-5 md:mb-6'
const footerLinkClass =
  'block py-1.5 text-[15px] leading-snug text-slate-300 transition-colors hover:text-[#099546]'

export async function Footer() {
  let footerData: Footer | null = null
  try {
    footerData = (await getCachedGlobal('footer', 1)()) as Footer
  } catch (err) {
    console.error('Footer CMS load failed (check DATABASE_URL & migrations):', err)
  }

  return (
    <>
      <div className="bg-white pt-12 md:pt-16">
        <PartnersCarousel />
      </div>

      <FacebookPageEmbed />

      <footer className="mt-auto overflow-hidden border-t-4 border-[#099546] bg-[#252a33] text-slate-200">
        <div className="container relative z-10 mx-auto max-w-7xl px-4 py-16 md:py-20 lg:py-24">
          <div className="flex flex-col gap-14 lg:flex-row lg:gap-16 xl:gap-20">
            {/* Brand & company — Travelex-style wide first column */}
            <div className="flex w-full shrink-0 flex-col gap-8 lg:max-w-md xl:max-w-lg">
              <Link
                href="/"
                className="inline-flex w-fit items-center justify-center p-0 transition-opacity hover:opacity-90"
              >
                <Logo
                  loading="eager"
                  priority="high"
                  className="h-12 w-auto max-w-[12.5rem] object-contain object-left sm:h-14 sm:max-w-[14rem] md:h-16 md:max-w-[16rem]"
                />
              </Link>
              <p className="max-w-xl text-sm leading-relaxed text-slate-400 md:text-[15px] md:leading-relaxed">
                {FOOTER_COMPANY_BLURB}
              </p>
              <div>
                <h3 className={linkColumnHeadingClass}>Registered office</h3>
                <address className="not-italic text-sm leading-relaxed text-slate-400 md:text-[15px]">
                  {REGISTERED_OFFICE.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
              <div>
                <h3 className={linkColumnHeadingClass}>Head office hours</h3>
                <p className="text-[15px] font-medium text-slate-300">09:00 am – 05:00 pm</p>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 xl:grid-cols-4">
                {/* Quick links — static column like Travelex “Quick links” */}
                <div>
                  <h3 className={linkColumnHeadingClass}>Quick links</h3>
                  <nav className="flex flex-col" aria-label="Quick links">
                    {FOOTER_QUICK_LINKS.map(({ href, label }) => (
                      <Link key={href} href={href} className={footerLinkClass}>
                        {label}
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* CMS-driven columns */}
                {footerData?.groups?.map((group, i) => (
                  <div key={group.id ?? i}>
                    <h3 className={linkColumnHeadingClass}>{group.label}</h3>
                    <nav className="flex flex-col" aria-label={group.label}>
                      {group.navItems?.map((item, j) => (
                        <CMSLink
                          key={item.id ?? j}
                          {...item.link}
                          label={item.link.label}
                          className={footerLinkClass}
                        />
                      ))}
                    </nav>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Connect — prominent row */}
          <div className="mt-16 border-t border-white/10 pt-12 md:mt-20 md:pt-14">
            <h3 className={`${linkColumnHeadingClass} mb-8 text-center sm:text-left`}>Connect</h3>
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:flex-wrap sm:justify-between lg:items-start">
              <div className="flex w-full max-w-2xl flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-4 lg:max-w-none">
                <a
                  href="tel:080013537"
                  className="flex items-center justify-center gap-3 text-[15px] font-medium text-slate-200 transition-colors hover:text-[#099546] sm:justify-start"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                    <Phone className="h-5 w-5 text-[#099546]" aria-hidden />
                  </span>
                  <span>Toll free: 0800-13537</span>
                </a>
                <a
                  href="mailto:info@pakistancurrency.com"
                  className="flex items-center justify-center gap-3 text-[15px] font-medium text-slate-200 transition-colors hover:text-[#099546] sm:justify-start"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                    <Mail className="h-5 w-5 text-[#099546]" aria-hidden />
                  </span>
                  <span className="break-all sm:break-normal">info@pakistancurrency.com</span>
                </a>
                <a
                  href="https://wa.me/923046668810"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 text-[15px] font-medium text-slate-200 transition-colors hover:text-[#099546] sm:justify-start"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                    <MessageCircle className="h-5 w-5 text-[#099546]" aria-hidden />
                  </span>
                  <span>WhatsApp: +92 304 6668810</span>
                </a>
              </div>
              <div className="flex items-center gap-3 sm:shrink-0">
                <a
                  href={SOCIAL_TWITTER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-slate-300 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Pakistan Currency Exchange on X (Twitter)"
                >
                  <Twitter className="h-5 w-5 fill-current" />
                </a>
                <a
                  href={SOCIAL_LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-slate-300 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Pakistan Currency Exchange on LinkedIn"
                >
                  <Linkedin className="h-5 w-5 fill-current" />
                </a>
                <a
                  href={SOCIAL_FACEBOOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-slate-300 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Pakistan Currency Exchange on Facebook"
                >
                  <Facebook className="h-5 w-5 fill-current" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar — copyright + utility links (Travelex-style) */}
        <div className="border-t border-white/10 bg-[#1a1e24]">
          <div className="container mx-auto max-w-7xl px-4 py-8 md:py-10">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
              <p className="max-w-3xl text-sm leading-relaxed text-slate-500">
                © {new Date().getFullYear()} Pakistan Currency Exchange. All rights reserved.
              </p>
              <nav
                className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500 md:justify-end"
                aria-label="Footer utilities"
              >
                <Link href="/contact" className="transition-colors hover:text-[#099546]">
                  Help & contact
                </Link>
                <Link href="/currency-rates" className="transition-colors hover:text-[#099546]">
                  Rates
                </Link>
                <Link href="/branches" className="transition-colors hover:text-[#099546]">
                  Branches
                </Link>
                <Link href="/search" className="transition-colors hover:text-[#099546]">
                  Search
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
