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

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  return (
    <>
      {/* Partners section sits right above the footer */}
      <div className="bg-white pt-10">
        <p className="text-center text-sm text-slate-600 max-w-3xl mx-auto px-4 mb-2 leading-relaxed">
          {FOOTER_COMPANY_BLURB}
        </p>
      </div>
      <PartnersCarousel />

      <FacebookPageEmbed />
      
      <footer className="mt-auto bg-[#099546] text-white overflow-hidden relative">
        
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

            {footerData?.groups?.map((group, i) => (
              <div key={i} className="flex flex-col gap-4">
                <h3 className="font-bold text-lg uppercase tracking-wide">{group.label}</h3>
                <nav className="flex flex-col gap-2 text-sm text-white/90">
                  {group.navItems?.map((item, j) => (
                    <CMSLink
                      key={j}
                      {...item.link}
                      label={null}
                      className="hover:text-white transition-colors flex items-center gap-2"
                    >
                      <span className="text-xs opacity-70">›</span>
                      <span>{item.link.label}</span>
                    </CMSLink>
                  ))}
                </nav>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-white/80 mt-10 pt-6 border-t border-white/20">
            © {new Date().getFullYear()} Pakistan Currency Exchange. All rights reserved.
          </p>

          {/* Bottom Bar: Contact Info and CMS Links */}
          <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-6 text-sm items-center">
              <a href="tel:080013537" className="flex items-center gap-2 hover:text-[#099546] transition-colors"><Phone className="h-4 w-4" /> Toll Free: 080013537</a>
              <a href="mailto:info@pakistancurrency.com" className="flex items-center gap-2 hover:text-[#099546] transition-colors"><Mail className="h-4 w-4" /> info@pakistancurrency.com</a>
              <a href="https://wa.me/923046668810" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#099546] transition-colors"><MessageCircle className="h-4 w-4" /> +92 304 6668810</a>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#099546] transition-colors"><Twitter className="h-5 w-5 fill-current" /></a>
              <a href="https://pk.linkedin.com/company/pakistan-currency-exchange-pvt-ltd" target="_blank" rel="noopener noreferrer" className="hover:text-[#099546] transition-colors"><Linkedin className="h-5 w-5 fill-current" /></a>
              <a href="https://www.facebook.com/pkcurrency/" target="_blank" rel="noopener noreferrer" className="hover:text-[#099546] transition-colors"><Facebook className="h-5 w-5 fill-current" /></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
