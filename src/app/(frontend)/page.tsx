import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Globe, CreditCard } from 'lucide-react'
import Image from 'next/image'

// Premium Blocks
import { LiveExchangeRatesBlock } from '@/blocks/LiveExchangeRates/Component'
import { CurrencyConverterBlock } from '@/blocks/CurrencyConverter/Component'
import { ServicesGridBlock } from '@/blocks/ServicesGrid/Component'
import { WhatsAppCTABlock } from '@/blocks/WhatsAppCTA/Component'

// Sample Data for Hybrid Rendering
const SAMPLE_RATES = [
  { id: 1, currency_name: 'US Dollar', currency_code: 'USD', buy_rate: 277.5, sell_rate: 280.2 },
  { id: 2, currency_name: 'Euro', currency_code: 'EUR', buy_rate: 302.1, sell_rate: 305.4 },
  { id: 3, currency_name: 'British Pound', currency_code: 'GBP', buy_rate: 352.4, sell_rate: 356.8 },
  { id: 4, currency_name: 'Saudi Riyal', currency_code: 'SAR', buy_rate: 73.8, sell_rate: 74.5 },
  { id: 5, currency_name: 'UAE Dirham', currency_code: 'AED', buy_rate: 75.4, sell_rate: 76.2 },
]

const SAMPLE_SERVICES = [
  { id: 1, title: 'Currency Exchange', slug: 'currency-exchange', description: 'Institutional and retail foreign exchange at best market rates.' },
  { id: 2, title: 'Money Transfer', slug: 'money-transfer', description: 'Fast and secure worldwide remittances through trusted partners.' },
  { id: 3, title: 'Utility Bill Payment', slug: 'utility-bills', description: 'Convenient payment of all local utility bills at any branch.' },
]

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  let rates = SAMPLE_RATES
  let services = SAMPLE_SERVICES
  let testimonials = []
  let news = []

  try {
    const ratesResult = await payload.find({ collection: 'currency-rates', sort: 'currency_name', limit: 5 })
    if (ratesResult.docs.length > 0) rates = ratesResult.docs as any[]

    const servicesResult = await payload.find({ collection: 'services', limit: 6 })
    if (servicesResult.docs.length > 0) services = servicesResult.docs as any[]

    const testimonialsResult = await payload.find({ collection: 'testimonials', limit: 10 })
    testimonials = testimonialsResult.docs as any[]

    const newsResult = await payload.find({ collection: 'news', limit: 3, sort: '-published_date' })
    news = newsResult.docs as any[]
  } catch (err) {
    console.error('Home Page Data Fetch Error (using fallback):', err)
  }

  const converterRates = rates.map((r: any) => ({
    id: r.id,
    currency_name: r.currency_name,
    currency_code: r.currency_code,
    buy_rate: r.buy_rate,
    sell_rate: r.sell_rate,
  }))

  return (
    <div className="flex flex-col gap-0 overflow-x-hidden">
      {/* 1. Hero Section with Integrated Converter */}
      <section className="relative min-h-[90vh] flex items-center bg-black text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <Image 
              src="/isb.jpg"
              alt="Faisal Mosque Islamabad"
              fill
              className="object-cover object-center opacity-70 mix-blend-luminosity scale-105 transition-transform duration-[10s] hover:scale-100"
              priority
           />
           <div className="absolute inset-0 bg-linear-to-r from-black via-black/90 to-transparent z-10" />
        </div>
        
        <div className="container relative z-10 px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center px-4 py-1.5 bg-white/10 border border-white/10 rounded-full text-primary text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              <span className="relative flex h-2 w-2 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Trusted Since 2003
            </div>
            <h1 className="text-6xl lg:text-8xl font-bold tracking-tight leading-[1.1]! uppercase">
              Fast, Secure & <br /><span className="text-primary italic">Best Rates</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-lg leading-relaxed font-medium">
              Pakistan's premier currency exchange and remittance services. Get competitive market rates with zero hidden charges.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <Button 
                asChild 
                size="lg" 
                className="h-16 px-10 text-lg rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20" 
              >
                <Link href="/currency-rates">
                  View Live Rates <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-16 px-10 text-lg rounded-full bg-white/5 border-white/20 text-white hover:bg-white hover:text-black transition-all font-bold backdrop-blur-sm">
                <Link href="/branches">Find Branch</Link>
              </Button>
            </div>
          </div>

          <div className="hidden lg:block relative group">
             <div className="absolute -inset-1 bg-linear-to-r from-primary/50 to-emerald-500/50 rounded-4xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
             <CurrencyConverterBlock rates={converterRates} disableInnerContainer />
          </div>
        </div>
      </section>

      {/* 2. Live Rates Section */}
      <section className="py-32 relative overflow-hidden bg-white dark:bg-slate-950">
        <div className="container px-4 relative z-10">
           <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20">
              <div className="max-w-2xl space-y-4">
                 <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">Real-Time Foreign Exchange</h2>
                 <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">Updated every minute based on interbank and open market movements.</p>
              </div>
              <Button asChild variant="link" className="text-primary font-bold text-lg p-0 hover:no-underline flex items-center group">
                 <Link href="/currency-rates" className="flex items-center">
                    Full Market Analysis <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </Link>
              </Button>
           </div>
           
           <div className="grid lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-8">
                 <LiveExchangeRatesBlock rates={rates as any} disableInnerContainer />
              </div>
              
              <div className="lg:col-span-4 space-y-10">
                 <div className="p-10 rounded-4xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-8 shadow-sm">
                    <h3 className="text-2xl font-bold dark:text-white">Why Exchange With Us?</h3>
                    <div className="space-y-8">
                       {[
                         { icon: ShieldCheck, title: "SBP Regulated", desc: "Full compliance with State Bank of Pakistan regulations." },
                         { icon: Globe, title: "Global Reach", desc: "Partnered with Western Union, RIA & MoneyGram." },
                         { icon: CreditCard, title: "No Hidden Fees", desc: "The rate you see is the rate you get. Transparent and fair." }
                       ].map((item, i) => (
                         <div key={i} className="flex gap-6 group">
                           <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                             <item.icon className="w-7 h-7" />
                           </div>
                           <div>
                             <h4 className="font-bold text-lg mb-1 dark:text-white">{item.title}</h4>
                             <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                           </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 4. Services Grid */}
      <ServicesGridBlock services={services as any} disableInnerContainer />

      {/* 5. Company Overview (About CTA) */}
      <section className="py-32 container px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-linear-to-tr from-primary/20 to-emerald-500/20 rounded-4xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative aspect-4/3 rounded-4xl overflow-hidden shadow-2xl">
               <Image src="/bg_1.jpg" alt="Legacy of Trust" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-10 left-10 text-white space-y-2">
                  <div className="text-5xl font-bold">1992</div>
                  <div className="text-lg font-medium opacity-90 uppercase tracking-widest">Est. Foundation</div>
               </div>
            </div>
          </div>
          
          <div className="space-y-10">
            <div className="inline-block px-4 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 font-bold text-xs uppercase tracking-widest">Our Legacy</div>
            <h2 className="text-5xl font-bold tracking-tight leading-tight text-slate-900 dark:text-white">Pakistan Currency Exchange: A Legacy of Trust Since 1992</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Serving the nation for over three decades, Pakistan Currency Exchange (Pvt) Ltd provides safe, secure, 
              and reliable money transfer services. Explore our network of over 130 locations across Pakistan.
            </p>
            <div className="grid grid-cols-2 gap-12 pt-4">
              <div className="space-y-2">
                <div className="text-5xl font-bold text-primary">130+</div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Branches Nationwide</p>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-bold text-primary">200+</div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Global Destinations</p>
              </div>
            </div>
            <Button asChild size="lg" className="h-16 px-10 text-lg rounded-full font-bold shadow-xl shadow-primary/20">
              <Link href="/about">Read Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 8. WhatsApp Support Block */}
      <WhatsAppCTABlock disableInnerContainer />

    </div>
  )
}
