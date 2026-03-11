import { CurrencyTable } from '@/components/CurrencyTable'
import { CurrencyConverter } from '@/components/CurrencyConverter'
import { ServiceCard } from '@/components/ServiceCard'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { ArrowRight, ShieldCheck, Globe, CreditCard } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  
  const { docs: rates } = (await payload.find({
    collection: 'currency-rates',
    sort: 'currency_name',
    limit: 100,
  })) as any

  const { docs: services } = (await payload.find({
    collection: 'services',
    limit: 6,
  })) as any

  const { docs: testimonials } = (await payload.find({
    collection: 'testimonials',
    limit: 10,
  })) as any

  const { docs: partners } = (await payload.find({
    collection: 'partners',
    limit: 12,
  })) as any

  const { docs: news } = (await payload.find({
    collection: 'news',
    limit: 3,
    sort: '-published_date',
  })) as any

  const converterRates = rates.map((r: any) => ({
    id: r.id,
    currency_name: r.currency_name,
    currency_code: r.currency_code,
    buy_rate: r.buy_rate,
    sell_rate: r.sell_rate,
  }))

  return (
    <div className="flex flex-col gap-0">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <Image 
              src="https://images.unsplash.com/photo-1596740615469-8ceac028cabd?q=80&w=2670&auto=format&fit=crop"
              alt="Faisal Mosque Islamabad Pakistan"
              fill
              className="object-cover object-center opacity-40 mix-blend-luminosity"
              priority
           />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent z-10" />
        </div>
        
        <div className="container relative z-10 px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              Trusted since 2003
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight !leading-tight uppercase">
              Fast, Secure & <span className="text-primary italic">Best Rates</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-lg leading-relaxed">
              Pakistan's premier currency exchange and remittance services. Get competitive market rates with zero hidden charges.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                asChild 
                size="lg" 
                className="h-14 px-8 text-lg rounded-full font-bold transition-opacity" 
              >
                <Link href="/currency-rates">
                  View Live Rates <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-900 border-none transition-all font-bold shadow-lg">
                <Link href="/branches">Find Nearby Branch</Link>
              </Button>
            </div>
          </div>

          <div className="hidden lg:block animate-in fade-in zoom-in duration-1000 delay-300">
             <div className="relative">
                <CurrencyConverter rates={converterRates} />
             </div>
          </div>
        </div>
      </section>

      {/* 2. Rates & Quick Converter (Mobile/Tablet and Highlight) */}
      <section className="py-24 container px-4">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold mb-2">Live Market Rates</h2>
                <p className="text-muted-foreground">Updated in real-time based on interbank movements</p>
              </div>
              <Button asChild variant="link" className="p-0 h-auto font-bold text-primary">
                <Link href="/currency-rates" className="flex items-center gap-1">
                   Full List <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="bg-card border rounded-3xl shadow-sm overflow-hidden">
              <CurrencyTable />
            </div>
          </div>
          <div className="lg:hidden">
              <CurrencyConverter rates={converterRates} />
          </div>
          
          <div className="space-y-8">
             <h2 className="text-3xl font-bold mb-2">Why Choose Us?</h2>
             <div className="space-y-6">
                {[
                  { icon: ShieldCheck, title: "100% Secure", desc: "Regulated by the State Bank of Pakistan with strict compliance." },
                  { icon: Globe, title: "Global Network", desc: "Partnered with Western Union, RIA, and MoneyGram for global reach." },
                  { icon: CreditCard, title: "Best Rates", desc: "Competitive buy and sell rates with no hidden processing fees." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl border bg-card/50 hover:bg-card transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 4. Services Grid */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/20">
        <div className="container px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">Financial Solutions Tailored For You</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From global remittances to local currency exchange, we provide professional services for every need.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: any) => (
              <ServiceCard 
                key={service.id}
                title={service.title}
                description={service.short_description || service.description}
                slug={service.slug}
                hero_image={service.hero_image}
              />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/services">Discover All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Company Overview (About CTA) */}
      <section className="py-24 container px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl group-hover:bg-primary/20 transition-colors" />
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
               <div className="w-full h-full bg-slate-200 animate-pulse flex items-center justify-center">
                  <span className="text-slate-400 font-bold italic text-3xl">PCE Excellence</span>
               </div>
            </div>
            {/* Stats Badge */}
            <div className="absolute -bottom-8 -right-8 bg-primary text-primary-foreground p-8 rounded-3xl shadow-2xl hidden md:block">
               <div className="text-4xl font-bold mb-1">20+</div>
               <div className="text-sm font-medium opacity-90">Years of Experience</div>
            </div>
          </div>
          
          <div className="space-y-8">
            <h2 className="text-4xl font-bold tracking-tight leading-tight">Pakistan Currency Exchange: A Legacy of Trust Since 1992</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Serving the nation for over three decades, Pakistan Currency Exchange (Pvt) Ltd provides safe, secure, 
              and reliable money transfer services. Explore our network of over 130 locations ensuring your convenience is always prioritized.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-[#0a8258] mb-1">130+</div>
                <p className="text-sm text-muted-foreground">Branches Nationwide</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0a8258] mb-1">200+</div>
                <p className="text-sm text-muted-foreground">Global Destinations</p>
              </div>
            </div>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Slider */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-primary/5">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-muted-foreground">Your trust is our greatest achievement.</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Carousel className="w-full">
                <CarouselContent>
                  {testimonials.map((t: any) => (
                    <CarouselItem key={t.id}>
                      <Card className="border-none bg-transparent shadow-none">
                        <CardContent className="flex flex-col items-center text-center p-6">
                           <div className="mb-8 relative">
                             <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
                               <AvatarImage src={t.photo?.url} alt={t.name} />
                               <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                                 {t.name.substring(0, 2).toUpperCase()}
                               </AvatarFallback>
                             </Avatar>
                             <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
                                <ShieldCheck className="w-4 h-4" />
                             </div>
                           </div>
                           <blockquote className="text-2xl italic text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                             "{t.testimonial}"
                           </blockquote>
                           <h4 className="font-bold text-xl">{t.name}</h4>
                           <p className="text-muted-foreground">{t.position}</p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-4 mt-8">
                  <CarouselPrevious className="static translate-y-0" />
                  <CarouselNext className="static translate-y-0" />
                </div>
              </Carousel>
            </div>
          </div>
        </section>
      )}

      {/* 7. Partners Grid (Removed: Now globally integrated in Footer via PartnersCarousel) */}

      {/* 8. Latest News */}
      {news.length > 0 && (
        <section className="py-24 container px-4">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold">Latest Updates</h2>
              <p className="text-muted-foreground mt-2">Market insights and company announcements.</p>
            </div>
            <Button asChild variant="outline" className="rounded-full px-6">
               <Link href="/news">View All News</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item: any) => (
              <Link key={item.id} href={`/news/${item.slug}`} className="group space-y-5">
                 <div className="aspect-video rounded-3xl overflow-hidden bg-muted transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 italic">
                      No Image available
                    </div>
                 </div>
                 <div className="space-y-3">
                    <div className="text-sm font-bold text-primary">
                       {new Date(item.published_date).toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors leading-snug">
                       {item.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">
                       {item.description || "Read our latest announcement regarding market developments and company services..."}
                    </p>
                 </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 9. Branch CTA */}
      <section className="py-12 container px-4 mb-24">
        <div className="bg-primary rounded-[3rem] p-12 lg:p-20 flex flex-col lg:flex-row gap-12 items-center text-center lg:text-left overflow-hidden relative">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/10 rounded-full -ml-32 -mb-32 blur-3xl" />
           
           <div className="space-y-6 relative z-10 flex-1">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground tracking-tight">Visit a branch near you today.</h2>
              <p className="text-xl text-primary-foreground/80 max-w-xl">
                 Our professional staff is ready to assist you with all your currency needs across 50+ locations in Pakistan.
              </p>
           </div>
           
           <div className="relative z-10 flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="h-16 px-10 text-lg rounded-full shadow-2xl font-bold transition-opacity"
              >
                 <Link href="/branches">Locate Branch</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-16 px-10 text-lg rounded-full bg-white text-primary border-none hover:bg-slate-100 transition-all shadow-lg font-bold shadow-black/10">
                 <Link href="/contact">Get in Touch</Link>
              </Button>
           </div>
        </div>
      </section>

    </div>
  )
}
