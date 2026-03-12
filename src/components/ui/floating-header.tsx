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
  MapPin,
  Clock
} from 'lucide-react'

export const FloatingHeader = ({ data }: { data: any }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Services', href: '/services' },
    { label: 'Branches', href: '/branches' },
    { label: 'About Us', href: '/about' },
    { label: 'Compliance', href: '/compliance' },
    { label: 'News', href: '/news' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact-us' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full',
        scrolled ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-md shadow-sm border-b' : 'bg-transparent'
      )}
    >
      {/* Top Utility Bar */}
      <div className={cn(
        "hidden md:block border-b transition-all duration-300 overflow-hidden",
        scrolled ? "h-0 border-transparent" : "h-10 bg-slate-50 dark:bg-slate-900/50"
      )}>
        <div className="container mx-auto h-full px-6 flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-slate-500">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3 text-primary" />
              <span>0800-13537</span>
            </div>
            <div className="flex items-center gap-2 border-l pl-6">
              <Clock className="h-3 w-3 text-primary" />
              <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-primary transition-colors">
              <Facebook className="h-3.5 w-3.5" />
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              <Linkedin className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={cn(
        "container mx-auto transition-all duration-300 px-6",
        scrolled ? "py-3" : "py-5"
      )}>
        <div className="flex items-center justify-between">
          <Link href="/" className="relative z-50">
            <Logo loading="eager" priority="high" className={cn(
                "transition-all duration-300",
                scrolled ? "h-10" : "h-12"
            )} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="px-4 py-2 text-[11px] font-black uppercase tracking-[0.15em] hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button className="hidden sm:flex h-11 px-8 rounded-full text-xs font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0">
              Live Rates
            </Button>
            
            {/* Mobile Toggle */}
            <button 
                className="xl:hidden p-2 text-slate-900 dark:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-white dark:bg-slate-950 z-40 transition-transform duration-500 ease-in-out transform xl:hidden",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full pt-32 px-10">
          <div className="space-y-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-3xl font-black uppercase tracking-tighter hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pb-16 space-y-8">
            <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Support</p>
              <div className="flex items-center gap-4 text-xl font-bold">
                <Phone className="text-primary" />
                <span>0800-13537</span>
              </div>
            </div>
            
            <div className="flex gap-6">
                <Facebook className="h-6 w-6 text-slate-400" />
                <Linkedin className="h-6 w-6 text-slate-400" />
            </div>

            <Button className="w-full h-16 rounded-2xl text-lg font-black uppercase tracking-widest">
              Live Market Rates
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
