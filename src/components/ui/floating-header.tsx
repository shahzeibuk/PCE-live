'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import { 
  ChevronDown, 
  MenuIcon, 
  Phone, 
  Facebook, 
  Linkedin,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight
} from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export const FloatingHeader = ({ data }: { data: any }) => {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

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
        scrolled ? 'translate-y-0' : 'translate-y-0',
      )}
    >
      {/* Top Bar - Contact & Social */}
      {!scrolled && (
        <div className="container mb-2 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500 px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
              <Phone className="h-3 w-3" />
              <span>Toll Free: 0800-13537</span>
            </div>
            <div className="w-px h-3 bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
              <span>Support: info@pakistancurrency.com</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              <Link href="#" className="hover:text-primary transition-colors"><Facebook className="h-3.5 w-3.5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Linkedin className="h-3.5 w-3.5" /></Link>
            </div>
          </div>
        </div>
      )}

      <div
        className={cn(
          'container mx-auto transition-all duration-300 overflow-visible',
          scrolled
            ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-slate-200/50 dark:border-slate-800/50 shadow-2xl py-3 rounded-2xl'
            : 'bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-slate-200/30 dark:border-slate-800/30 shadow-lg py-5 rounded-3xl',
          'border',
        )}
      >
        <div className="flex items-center justify-between px-2 md:px-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="size-10 rounded-xl bg-[#099546] flex items-center justify-center font-black text-white text-xl shadow-lg shadow-[#099546]/20 transition-transform group-hover:scale-110">
              P
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tighter leading-none text-slate-900 dark:text-white uppercase italic">
                Pakistan
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] leading-none text-slate-500 uppercase mt-0.5">
                Currency
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-1 lg:gap-2">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-xs font-bold uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors h-10 px-4 rounded-xl">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white dark:bg-slate-950 border rounded-2xl shadow-2xl">
                        {[
                            { title: "Western Union", href: "/services/western-union", desc: "Global money transfer network." },
                            { title: "MoneyGram", href: "/services/moneygram", desc: "Fast & secure reliable transfers." },
                            { title: "RIA Money Transfer", href: "/services/ria-money-transfer", desc: "Competitive rates worldwide." },
                            { title: "Intel Express", href: "/services/intel-express", desc: "Swift European corridors." },
                            { title: "Small World", href: "/services/small-world", desc: "Reliable global reach." },
                            { title: "Currency Exchange", href: "/services/currency-exchange", desc: "Best market rates daily." }
                        ].map((item) => (
                            <Link key={item.title} href={item.href} className="group block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-50 dark:hover:bg-slate-900">
                                <div className="text-sm font-bold tracking-tight text-[#099546]">{item.title}</div>
                                <p className="line-clamp-2 text-xs font-medium leading-snug text-slate-500 dark:text-slate-400">
                                    {item.desc}
                                </p>
                            </Link>
                        ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-xs font-bold uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors h-10 px-4 rounded-xl">
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[200px] gap-1 p-4 bg-white dark:bg-slate-950 border rounded-2xl shadow-2xl">
                      {[
                        { title: 'About Us', href: '/about' },
                        { title: 'Mission & Vision', href: '/mission-vision' },
                        { title: 'News & Updates', href: '/news' },
                        { title: 'Blog', href: '/posts' },
                        { title: 'Careers', href: '/careers' },
                        { title: 'Compliance', href: '/compliance' },
                      ].map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="block select-none space-y-1 rounded-lg p-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-primary transition-colors"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/branches" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-xs font-bold uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors h-10 px-4 rounded-xl flex items-center")}>
                      Branches
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/contact" className="hidden sm:block">
              <Button
                variant="outline"
                className="h-10 px-6 rounded-xl text-xs font-bold uppercase tracking-widest border-2 hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95"
              >
                Find Branch
              </Button>
            </Link>
            <Button className="h-10 px-6 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#099546]/20 bg-[#099546] hover:bg-[#088a41] transition-all active:scale-95">
              Live Rates
            </Button>
            
            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden size-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] border-l-0 bg-white dark:bg-slate-950 p-0">
                <div className="flex flex-col h-full bg-white dark:bg-slate-950">
                  <div className="p-8 border-b">
                    <div className="size-12 rounded-xl bg-[#099546] flex items-center justify-center font-black text-white text-2xl mb-4">P</div>
                    <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white italic uppercase">Pakistan Currency</span>
                  </div>
                  <nav className="flex-1 overflow-y-auto py-8 px-4">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <span className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Our Services</span>
                        {[
                          { title: "Western Union", href: "/services/western-union" },
                          { title: "MoneyGram", href: "/services/moneygram" },
                          { title: "RIA Money Transfer", href: "/services/ria-money-transfer" },
                          { title: "Currency Exchange", href: "/services/currency-exchange" }
                        ].map((item) => (
                          <Link key={item.title} href={item.href} onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors uppercase">
                            {item.title}
                          </Link>
                        ))}
                      </div>
                      <div className="space-y-4">
                        <span className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Company</span>
                        {[
                          { title: 'About Us', href: '/about' },
                          { title: 'Branches', href: '/branches' },
                          { title: 'Contact', href: '/contact' }
                        ].map((item) => (
                          <Link key={item.title} href={item.href} onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors uppercase">
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </nav>
                  <div className="p-8 border-t bg-slate-50 dark:bg-slate-900/50">
                    <Button className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest shadow-xl shadow-[#099546]/20 bg-[#099546]">Contact Us</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
