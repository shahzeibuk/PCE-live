import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function NewsPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs: newsItems } = (await payload.find({
    collection: 'news',
    sort: '-published_date',
    limit: 100,
  })) as any

  return (
    <div className="pb-24">
      <section className="bg-primary/5 py-16 mb-12 border-b">
        <div className="container px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Latest News</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed about market trends, company announcements, and financial updates.
          </p>
        </div>
      </section>

      <div className="container px-4">
        <div className="grid gap-8 max-w-4xl mx-auto">
          {newsItems.map((news: any) => (
            <Card key={news.id} className="overflow-hidden hover:shadow-md transition-shadow group">
               <Link href={`/news/${news.slug}`}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0 gap-4">
                  <div className="space-y-2">
                    <Badge variant="secondary">
                       {new Date(news.published_date).toLocaleDateString('en-PK', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </Badge>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {news.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert line-clamp-3 opacity-80">
                    {/* Assuming the first text node of content or description */}
                    {news.description || 'Read more about this update...'}
                  </div>
                  <div className="mt-6 font-semibold text-primary inline-flex items-center gap-2">
                    Read Full Article
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </CardContent>
               </Link>
            </Card>
          ))}
        </div>

        {newsItems.length === 0 && (
          <div className="text-center py-24 border-2 border-dashed rounded-3xl bg-muted/20">
            <h2 className="text-2xl font-semibold mb-2">No news items found</h2>
            <p className="text-muted-foreground">Check back soon for latest updates.</p>
          </div>
        )}
      </div>
    </div>
  )
}
