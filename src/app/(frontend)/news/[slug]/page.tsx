import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'
import RichText from '@/components/RichText'
import { Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

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
    <article className="pb-16 md:pb-24 min-h-screen bg-slate-50">
      <div className="container px-4 max-w-4xl pt-6 md:pt-8">
        <div className="mb-10">
          <Button asChild variant="ghost" className="mb-6 -ml-2 text-slate-600 hover:text-[#099546] font-semibold rounded">
            <Link href="/news" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to News
            </Link>
          </Button>
          
          <div className="flex items-center gap-2 text-[#099546] font-semibold mb-4 bg-[#099546]/10 w-fit px-3 py-1.5 rounded text-sm border border-[#099546]/20">
            <Calendar className="w-4 h-4" />
            {newsItem.published_date && new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(newsItem.published_date))}
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-8 tracking-tight">
            {newsItem.title}
          </h1>
        </div>
        
        <div className="bg-white p-6 md:p-10 rounded border border-slate-200">
          <div className="prose prose-lg md:prose-xl max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-p:text-slate-700 prose-p:leading-relaxed">
            {newsItem.content && <RichText data={newsItem.content} />}
          </div>
        </div>
      </div>
    </article>
  )
}
