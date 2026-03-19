import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'
import RichText from '@/components/RichText'
import { Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  try {
    const news = await payload.find({
      collection: 'news',
      limit: 1000,
    })
    return news?.docs?.map(({ slug }) => ({ slug })) || []
  } catch (err) {
    console.error('Failed to fetch news for static params:', err)
    return []
  }
}

export default async function NewsItem({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })
  
  const { docs: [newsItem] } = await payload.find({
    collection: 'news',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (!newsItem) return notFound()

  return (
    <article className="pb-24 pt-24 min-h-screen bg-slate-50/30 dark:bg-slate-950">
      <div className="container px-4 max-w-4xl">
        <div className="mb-12">
          <Button asChild variant="ghost" className="mb-8 -ml-4 text-slate-500 hover:text-[#099546] hover:bg-[#099546]/5 rounded-xl font-semibold">
            <Link href="/news" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to News
            </Link>
          </Button>
          
          <div className="flex items-center gap-2 text-[#099546] font-semibold mb-4 bg-[#099546]/5 w-fit px-4 py-1.5 rounded-full text-sm">
            <Calendar className="w-4 h-4" />
            {newsItem.published_date && new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(newsItem.published_date))}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
            {newsItem.title}
          </h1>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-p:text-slate-700 prose-p:leading-relaxed">
            {newsItem.content && <RichText data={newsItem.content} />}
          </div>
        </div>
      </div>
    </article>
  )
}
