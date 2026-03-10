import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Media } from '@/components/Media'

interface ServiceProps {
  title: string
  description?: string
  slug: string
  hero_image?: any
}

export const ServiceCard = ({ title, description, slug, hero_image }: ServiceProps) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow">
      {hero_image && (
        <div className="aspect-video w-full overflow-hidden">
          <Media resource={hero_image} className="w-full h-full object-cover" />
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grow">
        <CardDescription className="line-clamp-3">
          {description || "Explore our professional exchange and remittance services."}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/services/${slug}`}>Learn More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
