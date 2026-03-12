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
  Clock,
  Search,
  ChevronLeft,
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
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800'
      )}
    >
      {/* Top Utility Bar */}
      <div className="hidden md:block border-b border-slate-200 dark:border-slate-800 h-10 bg-slate-50 dark:bg-slate-900/80">
        <div className="container mx-auto h-full px-4 sm:px-6 flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="tel:080013537"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-colors"
            >
              <Phone className="h-3 w-3 text-primary shrink-0" />
              <span>0800-13537</span>
            </a>
            <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-4 sm:pl-6">
              <Clock className="h-3 w-3 text-primary shrink-0" />
              <span className="hidden sm:inline">Mon - Sat: 9:00 AM - 6:00 PM</span>
              <span className="sm:hidden">9AM - 6PM</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
              <Facebook className="h-3.5 w-3.5" />
            </Link>
            <Link href="#" className="hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div
        className={cn(
          'container mx-auto transition-all duration-300 px-4 sm:px-6',
          scrolled ? 'py-3' : 'py-5'
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="relative z-50 shrink-0">
            <Logo
              loading="eager"
              priority="high"
              className={cn(
                'transition-all duration-300',
                scrolled ? 'h-8 sm:h-10' : 'h-10 sm:h-12'
              )}
            />
          </Link>

          {/* Desktop Nav - lg and up (1024px+) */}
          <nav className="hidden lg:flex items-center gap-1 flex-wrap justify-center">
            {navItems.map(({ link }, i) => {
              const href = getNavHref(link)
              if (!href) return null
              return (
                <Link
                  key={i}
                  href={href}
                  className="px-3 py-2 text-[11px] font-black uppercase tracking-[0.15em] hover:text-primary transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link
              href="/search"
              className="p-2 text-slate-900 dark:text-white hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>
            <a
              href="tel:080013537"
              className="hidden sm:flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors"
              aria-label="Call toll-free 0800-13537"
            >
              <Phone className="h-4 w-4 shrink-0" />
              <span>0800-13537</span>
            </a>

            {/* Mobile Toggle - visible below lg (1024px) */}
            <button
              type="button"
              className="lg:hidden p-2 -mr-2 text-slate-900 dark:text-white hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - full-screen overlay */}
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
        <div
          className="relative flex flex-col h-full pt-24 sm:pt-28 px-6 sm:px-10 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors -ml-2 mb-6"
            aria-label="Close menu"
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">Back</span>
          </button>
          <nav className="space-y-4 sm:space-y-6">
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
                  className="block text-2xl sm:text-3xl font-black uppercase tracking-tighter hover:text-primary transition-colors py-1"
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="mt-auto pt-12 pb-16 space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Support
              </p>
              <a
                href="tel:080013537"
                className="flex items-center gap-4 text-lg sm:text-xl font-bold hover:text-primary transition-colors"
              >
                <Phone className="text-primary shrink-0" />
                <span>0800-13537</span>
              </a>
            </div>

            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-slate-400" />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-slate-400" />
              </Link>
            </div>

            <a
              href="tel:080013537"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-3 w-full h-14 sm:h-16 rounded-lg text-base sm:text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Phone className="h-6 w-6 shrink-0" />
              <span>0800-13537</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
