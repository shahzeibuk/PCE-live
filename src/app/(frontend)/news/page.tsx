import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar } from 'lucide-react'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function NewsArchive() {
  const payload = await getPayload({ config: configPromise })
  const { docs: news } = (await payload.find({
    collection: 'news',
    sort: '-published_date',
    limit: 100,
  })) as any

  return (
    <div className="pb-24 pt-16">
      <section className="bg-primary/5 py-20 mb-12 border-b relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
        <div className="container px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-[#099546]">
            Latest News
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Stay informed with the most recent updates, announcements, and financial insights from Pakistan Currency Exchange.
          </p>
        </div>
      </section>

      <div className="container px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item: any) => (
            <Card key={item.id} className="group flex flex-col h-full overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-[#099546]/40 transition-all duration-300 bg-white dark:bg-slate-950 rounded-xl shadow-sm hover:shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                  <Calendar className="w-4 h-4 text-[#099546]" />
                  {item.published_date && new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(item.published_date))}
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight group-hover:text-[#099546] transition-colors line-clamp-2 min-h-[4rem]">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="grow pb-8">
                <CardDescription className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed line-clamp-3">
                  {/* Since news doesn't have a short_description, we'll try to extract some text from content if it exists, or show a default */}
                  Visit the news article to read the full story and stay updated with the latest in Pakistani finance.
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-0">
                <Button asChild variant="ghost" className="w-full h-12 rounded-xl font-bold bg-slate-50 group-hover:bg-[#099546] group-hover:text-white transition-all">
                  <Link href={`/news/${item.slug}`} className="flex items-center justify-center gap-2">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {news.length === 0 && (
          <div className="text-center py-24 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">No news items found</h2>
            <p className="text-slate-500">Our team is currently preparing the latest announcements. Please check back soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}
