'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Phone, Building2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function BranchLocator({ branches }: { branches: any[] }) {
  // Extract unique cities and sort them
  const cities = useMemo(() => {
    const uniqueCities = new Set(branches.map(b => b.city).filter(Boolean))
    return Array.from(uniqueCities).sort()
  }, [branches])

  const [selectedCity, setSelectedCity] = useState<string>(cities[0] || '')

  const filteredBranches = useMemo(() => {
    return branches.filter(b => b.city === selectedCity)
  }, [branches, selectedCity])

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* City Selector */}
      <div className="max-w-md mx-auto relative z-20">
        <label className="block text-sm font-bold text-muted-foreground mb-2 text-center uppercase tracking-widest">
          Select Your City
        </label>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="w-full h-14 text-lg font-medium rounded-2xl border-2 hover:border-primary transition-colors bg-white dark:bg-slate-900">
            <SelectValue placeholder="Select a city..." />
          </SelectTrigger>
          <SelectContent className="max-h-[60vh] rounded-xl z-[100]">
            {cities.map(city => (
              <SelectItem key={city} value={city} className="text-base py-3">
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Branches Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
        {filteredBranches.map((branch, i) => (
          <Card key={branch.id || i} className="overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-xl group">
            <CardContent className="p-0">
              <div className="bg-primary/5 p-6 border-b flex items-start gap-4">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 line-clamp-2">{branch.name}</h3>
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-white dark:bg-slate-800">
                    {branch.city}
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4 bg-white dark:bg-slate-900">
                <div className="flex gap-3 text-slate-600 dark:text-slate-300">
                  <MapPin className="w-5 h-5 shrink-0 text-primary mt-0.5" />
                  <p className="text-sm leading-relaxed">{branch.address}</p>
                </div>
                
                {branch.phone && (
                  <div className="flex gap-3 text-slate-600 dark:text-slate-300">
                    <Phone className="w-5 h-5 shrink-0 text-primary mt-0.5" />
                    <p className="text-sm font-medium">{branch.phone}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredBranches.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-lg text-muted-foreground font-medium">No branches found in the selected city.</p>
          </div>
        )}
      </div>
    </div>
  )
}
