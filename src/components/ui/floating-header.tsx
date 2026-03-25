'use client'

import React, { useEffect, useState } from 'react'
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
  Smartphone,
} from 'lucide-react'

import type { Header } from '@/payload-types'

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

export const FloatingHeader = ({ data }: { data: Header | null }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = data?.navItems ?? []

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div
        className={cn(
          'container mx-auto px-4 sm:px-6 transition-all duration-300',
          scrolled ? 'py-2.5' : 'py-3 md:py-4'
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="relative z-50 shrink-0">
            <Logo
              loading="eager"
              priority="high"
              className={cn('transition-all duration-300', scrolled ? 'h-8 sm:h-9' : 'h-9 sm:h-11')}
            />
          </Link>

          {/* Center: toll-free + mobile (md+) */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-10 text-slate-700 dark:text-slate-300">
            <a href="tel:080013537" className="flex items-center gap-2 text-sm font-semibold hover:text-[#099546] transition-colors">
              <Phone className="h-4 w-4 text-[#099546] shrink-0" />
              <span>0800-13537</span>
            </a>
            <a href="tel:03046668810" className="flex items-center gap-2 text-sm font-semibold hover:text-[#099546] transition-colors">
              <Smartphone className="h-4 w-4 text-[#099546] shrink-0" />
              <span>0304-6668810</span>
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Button
              asChild
              className="hidden sm:inline-flex rounded bg-[#099546] hover:bg-[#088040] text-white h-9 md:h-10 px-4 md:px-5 text-xs md:text-sm font-semibold"
            >
              <Link href="/currency-rates">Get Live Rates</Link>
            </Button>
            <Link
              href="/search"
              className="p-2 text-slate-900 dark:text-white hover:text-[#099546] transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>
            <button
              type="button"
              className="lg:hidden p-2 -mr-2 text-slate-900 dark:text-white hover:text-[#099546] transition-colors"
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
        <nav className="hidden lg:flex items-center justify-center gap-1 flex-wrap border-t border-slate-100 dark:border-slate-800 mt-3 pt-3">
          {navItems.map(({ link }, i) => {
            const href = getNavHref(link)
            if (!href) return null
            return (
              <Link
                key={i}
                href={href}
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-[#099546] transition-colors"
              >
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
          'fixed inset-0 bg-white dark:bg-slate-950 z-40 transition-transform duration-300 ease-out lg:hidden',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="relative flex flex-col h-full pt-20 px-5 sm:px-8 overflow-y-auto">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-[#099546] transition-colors -ml-1 mb-6"
            aria-label="Close menu"
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">Back</span>
          </button>

          <div className="flex flex-col gap-3 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
            <a
              href="tel:080013537"
              className="flex items-center gap-3 text-base font-semibold text-slate-900 dark:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Phone className="h-5 w-5 text-[#099546]" />
              0800-13537
            </a>
            <a
              href="tel:03046668810"
              className="flex items-center gap-3 text-base font-semibold text-slate-900 dark:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Smartphone className="h-5 w-5 text-[#099546]" />
              0304-6668810
            </a>
            <Button asChild className="w-full rounded bg-[#099546] hover:bg-[#088040] text-white mt-2">
              <Link href="/currency-rates" onClick={() => setMobileMenuOpen(false)}>
                Get Live Rates
              </Link>
            </Button>
          </div>

          <nav className="space-y-1">
            {navItems.map(({ link }, i) => {
              const href = getNavHref(link)
              if (!href) return null
              const newTab = link.newTab ?? false
              return (
                <Link
                  key={i}
                  href={href}
                  target={newTab ? '_blank' : undefined}
                  rel={newTab ? 'noopener noreferrer' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-bold text-slate-900 dark:text-white py-3 border-b border-slate-100 dark:border-slate-800 hover:text-[#099546] transition-colors"
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="mt-auto pt-8 pb-10 flex gap-4">
            <Link href="#" className="hover:text-[#099546] transition-colors" aria-label="Facebook">
              <Facebook className="h-6 w-6 text-slate-400" />
            </Link>
            <Link href="#" className="hover:text-[#099546] transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
