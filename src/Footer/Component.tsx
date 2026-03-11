import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { PartnersCarousel } from '@/components/PartnersCarousel'
import { Facebook, Linkedin, Twitter, Mail, Phone, MessageCircle } from 'lucide-react'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <>
      {/* Partners section sits right above the footer */}
      <PartnersCarousel />
      
      <footer className="mt-auto bg-[#099546] dark:bg-card text-white overflow-hidden relative">
        
        <div className="container py-12 gap-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Logo and Head Office Info */}
            <div className="lg:col-span-1 flex flex-col items-start gap-4">
              <Link className="flex items-center bg-white p-2 rounded-md" href="/">
                <Logo />
              </Link>
              <div className="mt-4">
                <p className="font-semibold text-sm uppercase tracking-wider mb-2">Head Office Timing</p>
                <p className="text-sm">09:00 am - 05:00pm</p>
              </div>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-lg uppercase tracking-wide">Company</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <Link href="/about" className="hover:text-primary-foreground/80 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Company Profile</Link>
                <Link href="/mission-vision" className="hover:text-primary-foreground/80 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Mission & Vision</Link>
                <Link href="/careers" className="hover:text-primary-foreground/80 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Careers</Link>
                <Link href="/partners-associates" className="hover:text-primary-foreground/80 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Partners & Associates</Link>
                <Link href="/complaints-feedback" className="hover:text-primary-foreground/80 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Complaints & Feedback</Link>
              </nav>
            </div>

            {/* Product & Services */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-lg uppercase tracking-wide">Product & Services</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <Link href="/services/currency-exchange" className="hover:text-primary-foreground/80 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Currency Exchange</Link>
                <Link href="/services/remittance" className="hover:text-primary-foreground/80 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Remittance</Link>
                <Link href="/services/western-union" className="hover:text-primary-foreground/80 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Western-union</Link>
                <Link href="/services/demand-draft" className="hover:text-primary-foreground/80 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Demand-draft</Link>
                <Link href="/services/telegraphic-transfer" className="hover:text-primary-foreground/80 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Telegraphic Transfer</Link>
                <Link href="/services/ria" className="hover:text-primary-foreground/80 transition-colors flex items-center gap-2"><span className="text-xs">›</span> RIA</Link>
                <Link href="/services/moneygram" className="hover:text-primary-foreground/80 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Money Gram</Link>
              </nav>
            </div>

            {/* Media Center */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-lg uppercase tracking-wide">Media Center</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <Link href="/gallery" className="hover:text-primary-foreground/80 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Gallery</Link>
                <Link href="/blog" className="hover:text-primary-foreground/80 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Blog</Link>
                <Link href="/news" className="hover:text-primary-foreground/80 transition-colors flex items-center gap-2"><span className="text-xs">›</span> News</Link>
              </nav>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-lg uppercase tracking-wide">Legal</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <Link href="/terms" className="hover:text-primary-foreground/80 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Terms & Conditions</Link>
                <Link href="/privacy" className="hover:text-primary-foreground/80 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Privacy Policy</Link>
                <Link href="/kyc" className="hover:text-primary-foreground/80 transition-colors flex items-center gap-2"><span className="text-xs">›</span> KYC & Compliance</Link>
              </nav>
            </div>
          </div>

          {/* Bottom Bar: Contact Info and CMS Links */}
          <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-6 text-sm items-center">
              <a href="tel:080013537" className="flex items-center gap-2 hover:text-[#099546] transition-colors"><Phone className="h-4 w-4" /> Toll Free: 080013537</a>
              <a href="mailto:info@pakistancurrency.com" className="flex items-center gap-2 hover:text-[#099546] transition-colors"><Mail className="h-4 w-4" /> info@pakistancurrency.com</a>
              <a href="https://wa.me/923046668810" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#099546] transition-colors"><MessageCircle className="h-4 w-4" /> +92 304 6668810</a>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#099546] transition-colors"><Twitter className="h-5 w-5 fill-current" /></a>
              <a href="https://pk.linkedin.com/company/pakistan-currency-exchange-pvt-ltd" target="_blank" rel="noopener noreferrer" className="hover:text-[#099546] transition-colors"><Linkedin className="h-5 w-5 fill-current" /></a>
              <a href="https://www.facebook.com/pkcurrency/" target="_blank" rel="noopener noreferrer" className="hover:text-[#099546] transition-colors"><Facebook className="h-5 w-5 fill-current" /></a>
              <ThemeSelector />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
