import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Phone, Mail } from 'lucide-react'

export default async function BranchesPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs: branches } = (await payload.find({
    collection: 'branches',
  })) as any

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Branches</h1>
        <p className="text-xl text-muted-foreground">Find a Pakistan Currency Exchange branch near you.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch: any) => (
          <Card key={branch.id} className="h-full">
            <CardHeader>
              <CardTitle>{branch.branch_name}</CardTitle>
              <p className="text-sm font-medium text-primary">{branch.city}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-sm">{branch.address}</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-muted-foreground shrink-0" />
                <p className="text-sm">{branch.phone}</p>
              </div>
              {branch.email && (
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-muted-foreground shrink-0" />
                  <p className="text-sm">{branch.email}</p>
                </div>
              )}
              {branch.google_map_link && (
                <a 
                  href={branch.google_map_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-medium text-blue-600 hover:underline"
                >
                  View on Google Maps
                </a>
              )}
            </CardContent>
          </Card>
        ))}
        {branches.length === 0 && (
          <p className="col-span-full text-center py-12 text-muted-foreground border rounded-lg bg-muted/50">
            Branch list is being updated. Please contact us for more information.
          </p>
        )}
      </div>
    </div>
  )
}
