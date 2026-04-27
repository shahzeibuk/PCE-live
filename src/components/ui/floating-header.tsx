'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo/Logo'
import {
  Phone,
  Facebook,
  Linkedin,
  Menu,
  X,
  Search,
  ChevronLeft,
  ChevronDown,
  Smartphone,
  Banknote,
  Twitter,
} from 'lucide-react'
import { SOCIAL_FACEBOOK, SOCIAL_LINKEDIN, SOCIAL_TWITTER } from '@/constants/social'

import type { Header } from '@/payload-types'
import {
  headerCta,
  headerContactLines,
  isExternalHref,
  mediaToLogoSrc,
} from '@/Header/headerBrand'
import type { ServiceNavLink } from '@/Header/serviceNav'

function getNavHref(link: NonNullable<Header['navItems']>[number]['link']): string | null {
  if (link.type === 'custom' && link.url) return link.url
  if (link.type === 'reference' && link.reference) {
    const ref = link.reference
    const value = typeof ref.value === 'object' ? ref.value : null
    if (value && 'slug' in value && value.slug) {
      const base = ref.relationTo === 'pages' ? '' : `/${ref.relationTo}`
      return `${base}/${value.slug}`
    }
  }
  return null
}

function isServicesNavItem(href: string | null, label: string | null | undefined): boolean {
  if (!label) return href === '/services'
  const l = label.toLowerCase().trim()
  if (l === 'services' || l === 'our services') return true
  return href === '/services'
}

const navLinkClass =
  'px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-[#099546] transition-colors'

export const FloatingHeader = ({
  data,
  serviceNavLinks = [],
}: {
  data: Header | null
  serviceNavLinks?: ServiceNavLink[]
}) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const servicesDropdownRef = useRef<HTMLDivElement>(null)

  const navItems = data?.navItems ?? []
  const contactLines = headerContactLines(data)
  const { label: ctaLabel, url: ctaUrl } = headerCta(data)
  const logoSrc = mediaToLogoSrc(data?.logo)
  const logoAlt = data?.logoAlt?.trim() || undefined

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setMobileServicesOpen(false)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!servicesOpen) return
    const onDown = (e: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [servicesOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-slate-200">
      <div
        className={cn(
          /* Match globals `.container` horizontal padding only — no extra px so hero/text align with nav */
          'container mx-auto transition-all duration-300',
          scrolled ? 'py-2.5' : 'py-3 md:py-4'
        )}
      >
        <div className="flex flex-nowrap items-center justify-between gap-2 min-[480px]:gap-3">
          {/*
            Mobile: reserve width for Get Live Rates / bank icon + search + menu (40px taps + gaps).
          */}
          <Link
            href="/"
            className={cn(
              'relative z-50 flex min-w-0 flex-1 items-center overflow-hidden',
              'max-w-[calc(100%-10.75rem)] min-[400px]:max-w-[calc(100%-15rem)] sm:max-w-[calc(100%-16rem)] md:max-w-none md:flex-initial md:overflow-visible',
            )}
            aria-label="Pakistan Currency Exchange — Home"
          >
            <Logo
              imageUrl={logoSrc}
              alt={logoAlt}
              loading="eager"
              priority="high"
              className={cn(
                'w-full min-w-0 transition-[height,max-height,max-width] duration-300',
                'max-h-9 max-w-[8rem]',
                'min-[360px]:max-h-10 min-[360px]:max-w-[9rem]',
                'min-[400px]:max-h-11 min-[400px]:max-w-[10.25rem]',
                'sm:max-h-[3.25rem] sm:max-w-[13rem]',
                'md:max-h-[4.5rem] md:max-w-[21rem] md:w-auto',
                'lg:max-h-[5.25rem] lg:max-w-[26rem]',
                scrolled
                  ? 'max-h-8 max-w-[7.25rem] min-[360px]:max-h-9 min-[360px]:max-w-[8.25rem] min-[400px]:max-h-10 min-[400px]:max-w-[9.25rem] sm:max-h-11 sm:max-w-[11.5rem] md:max-h-[3.75rem] md:max-w-[18rem] lg:max-h-[4.5rem] lg:max-w-[22rem]'
                  : null,
              )}
            />
          </Link>

          {/* Center: toll-free + mobile (md+) */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-10 text-slate-700">
            {contactLines.map((line, i) => {
              const Icon = line.icon === 'mobile' ? Smartphone : Phone
              return (
                <a
                  key={`${line.telHref}-${i}`}
                  href={line.telHref}
                  className="flex items-center gap-2 text-sm font-semibold hover:text-[#099546] transition-colors"
                >
                  <Icon className="h-4 w-4 text-[#099546] shrink-0" />
                  <span>{line.text}</span>
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
            {isExternalHref(ctaUrl) ? (
              <Button
                asChild
                className="hidden min-[400px]:inline-flex rounded bg-[#099546] hover:bg-[#088040] text-white h-8 shrink-0 px-2.5 text-[11px] font-semibold whitespace-nowrap sm:h-9 sm:px-3.5 sm:text-xs md:h-10 md:px-5 md:text-sm"
              >
                <a href={ctaUrl} target="_blank" rel="noopener noreferrer">
                  {ctaLabel}
                </a>
              </Button>
            ) : (
              <Button
                asChild
                className="hidden min-[400px]:inline-flex rounded bg-[#099546] hover:bg-[#088040] text-white h-8 shrink-0 px-2.5 text-[11px] font-semibold whitespace-nowrap sm:h-9 sm:px-3.5 sm:text-xs md:h-10 md:px-5 md:text-sm"
              >
                <Link href={ctaUrl}>{ctaLabel}</Link>
              </Button>
            )}
            {isExternalHref(ctaUrl) ? (
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ctaLabel}
                className="min-[400px]:hidden flex h-10 w-10 items-center justify-center rounded-md text-[#099546] hover:bg-[#099546]/10 transition-colors"
              >
                <Banknote className="h-5 w-5" aria-hidden />
              </a>
            ) : (
              <Link
                href={ctaUrl}
                aria-label={ctaLabel}
                className="min-[400px]:hidden flex h-10 w-10 items-center justify-center rounded-md text-[#099546] hover:bg-[#099546]/10 transition-colors"
              >
                <Banknote className="h-5 w-5" aria-hidden />
              </Link>
            )}
            <Link
              href="/search"
              className="flex h-10 w-10 items-center justify-center rounded-md text-slate-900 hover:bg-slate-100 hover:text-[#099546] transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>
            <button
              type="button"
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-md text-slate-900 hover:bg-slate-100 hover:text-[#099546] transition-colors"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center justify-center gap-1 flex-wrap border-t border-slate-100 mt-3 pt-3">
          {navItems.map(({ link }, i) => {
            const href = getNavHref(link)
            if (!href && !isServicesNavItem(null, link.label)) return null
            const showServicesMenu =
              serviceNavLinks.length > 0 && isServicesNavItem(href, link.label)

            if (showServicesMenu) {
              return (
                <div key={i} className="relative" ref={servicesDropdownRef}>
                  <button
                    type="button"
                    className={cn(
                      navLinkClass,
                      'inline-flex items-center gap-0.5 rounded-sm',
                      servicesOpen && 'text-[#099546]',
                    )}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    onClick={() => setServicesOpen((o) => !o)}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn('h-3.5 w-3.5 shrink-0 transition-transform', servicesOpen && 'rotate-180')}
                      aria-hidden
                    />
                  </button>
                  {servicesOpen ? (
                    <div
                      role="menu"
                      className="absolute left-0 top-full z-50 mt-1 min-w-72 max-h-[min(70vh,28rem)] overflow-y-auto rounded-md border border-slate-200 bg-white py-1 shadow-lg"
                    >
                      <Link
                        href="/services"
                        role="menuitem"
                        className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-slate-900 hover:bg-slate-50"
                        onClick={() => setServicesOpen(false)}
                      >
                        All services
                      </Link>
                      <div className="my-1 h-px bg-slate-100" aria-hidden />
                      {serviceNavLinks.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          role="menuitem"
                          className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#099546]"
                          onClick={() => setServicesOpen(false)}
                        >
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              )
            }

            if (!href) return null
            return (
              <Link key={i} href={href} className={navLinkClass}>
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-nav-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          'fixed inset-0 bg-white z-40 transition-transform duration-300 ease-out lg:hidden',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div
          className="relative flex flex-col h-full px-5 pt-[calc(var(--site-header-height)+0.75rem)] sm:px-8 overflow-y-auto"
          style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
        >
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-slate-600 hover:text-[#099546] transition-colors -ml-1 mb-6"
            aria-label="Close menu"
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">Back</span>
          </button>

          <div className="flex flex-col gap-3 mb-8 pb-6 border-b border-slate-200">
            {contactLines.map((line, i) => {
              const Icon = line.icon === 'mobile' ? Smartphone : Phone
              return (
                <a
                  key={`m-${line.telHref}-${i}`}
                  href={line.telHref}
                  className="flex items-center gap-3 text-base font-semibold text-slate-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5 text-[#099546]" />
                  {line.text}
                </a>
              )
            })}
            {isExternalHref(ctaUrl) ? (
              <Button asChild className="w-full rounded bg-[#099546] hover:bg-[#088040] text-white mt-2">
                <a
                  href={ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {ctaLabel}
                </a>
              </Button>
            ) : (
              <Button asChild className="w-full rounded bg-[#099546] hover:bg-[#088040] text-white mt-2">
                <Link href={ctaUrl} onClick={() => setMobileMenuOpen(false)}>
                  {ctaLabel}
                </Link>
              </Button>
            )}
          </div>

          <nav className="space-y-1">
            {navItems.map(({ link }, i) => {
              const href = getNavHref(link)
              const showServicesMenu =
                serviceNavLinks.length > 0 && isServicesNavItem(href, link.label)

              if (showServicesMenu) {
                return (
                  <div key={i} className="border-b border-slate-100">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between text-left text-lg font-bold text-slate-900 py-3 hover:text-[#099546] transition-colors"
                      aria-expanded={mobileServicesOpen}
                      onClick={() => setMobileServicesOpen((o) => !o)}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn('h-5 w-5 shrink-0 transition-transform', mobileServicesOpen && 'rotate-180')}
                      />
                    </button>
                    {mobileServicesOpen ? (
                      <div className="pb-3 pl-3 space-y-0 border-l-2 border-[#099546]/40 ml-1">
                        <Link
                          href="/services"
                          onClick={() => {
                            setMobileMenuOpen(false)
                            setMobileServicesOpen(false)
                          }}
                          className="block py-2 text-base font-semibold text-[#099546]"
                        >
                          All services
                        </Link>
                        {serviceNavLinks.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            onClick={() => {
                              setMobileMenuOpen(false)
                              setMobileServicesOpen(false)
                            }}
                            className="block py-2 text-base text-slate-600 hover:text-[#099546]"
                          >
                            {s.title}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                )
              }

              if (!href) return null
              const newTab = link.newTab ?? false
              return (
                <Link
                  key={i}
                  href={href}
                  target={newTab ? '_blank' : undefined}
                  rel={newTab ? 'noopener noreferrer' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-bold text-slate-900 py-3 border-b border-slate-100 hover:text-[#099546] transition-colors"
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="mt-auto pt-8 pb-10 flex flex-wrap gap-4">
            <a
              href={SOCIAL_FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-[#099546] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href={SOCIAL_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-[#099546] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href={SOCIAL_TWITTER}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-[#099546] transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
