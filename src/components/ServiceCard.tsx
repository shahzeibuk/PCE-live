import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { ArrowRight } from 'lucide-react'

interface ServiceProps {
  title: string
  description?: string
  slug: string
  hero_image?: any
}

export const ServiceCard = ({ title, description, slug, hero_image }: ServiceProps) => {
  return (
    <Card className="group flex flex-col h-full overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary/40 transition-colors bg-white dark:bg-slate-950 rounded-lg">
      {hero_image && (
        <div className="relative aspect-video w-full overflow-hidden">
          <Media 
            resource={hero_image} 
            className="w-full h-full object-cover" 
          />
        </div>
      )}
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="grow pb-8">
        <CardDescription className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed line-clamp-3">
          {description || "Explore our professional exchange and remittance services."}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild variant="ghost" className="w-full h-12 rounded-xl font-bold bg-slate-50 group-hover:bg-primary group-hover:text-white transition-all">
          <Link href={`/services/${slug}`} className="flex items-center justify-center gap-2">
            Explore Service <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
