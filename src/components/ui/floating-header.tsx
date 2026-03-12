'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import { 
  Phone, 
  Facebook, 
  Linkedin,
} from 'lucide-react'

export const FloatingHeader = ({ data }: { data: any }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 pt-4',
      )}
    >
      {/* Top Bar */}
      {!scrolled && (
        <div className="container mb-2 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500 px-6">
          <div className="flex items-center gap-4">
            <Phone className="h-3 w-3" />
            <span>0800-13537</span>
          </div>
          <div className="flex gap-3">
            <Facebook className="h-3.5 w-3.5" />
            <Linkedin className="h-3.5 w-3.5" />
          </div>
        </div>
      )}

      <div
        className={cn(
          'container mx-auto transition-all duration-300 border rounded-2xl',
          scrolled ? 'bg-white/90 py-3 shadow-2xl' : 'bg-white/60 py-5 shadow-lg',
        )}
      >
        <div className="flex items-center justify-between px-6">
          <Link href="/" className="font-black italic uppercase">
                Pakistan Currency
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/services" className="text-[10px] font-black uppercase tracking-[0.2em]">Services</Link>
            <Link href="/about" className="text-[10px] font-black uppercase tracking-[0.2em]">About</Link>
          </nav>

          <Button className="h-10 px-6 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#099546]">
            Live Rates
          </Button>
        </div>
      </div>
    </header>
  )
}
