'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Phone, Building2 } from 'lucide-react'
import Link from 'next/link'
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
    <div className="space-y-8">
      {/* City Selector */}
      <div className="max-w-sm relative z-20">
        <label className="block text-xs font-semibold text-slate-500 mb-2">
          Filter by City
        </label>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="w-full h-11 text-base font-medium rounded-md border border-slate-200 focus:ring-1 focus:ring-primary bg-white">
            <SelectValue placeholder="Select a city..." />
          </SelectTrigger>
          <SelectContent className="max-h-[60vh] rounded-md z-[100] border-slate-200">
            {cities.map(city => (
              <SelectItem key={city} value={city} className="text-sm py-2">
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Branches Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
        {filteredBranches.map((branch, i) => (
          <Link href={`/branches/${branch.id}`} key={branch.id || i} className="group block h-full">
            <Card className="border border-slate-200 shadow-none hover:border-primary/40 transition-colors h-full flex flex-col rounded-md bg-white">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {branch.branch_name}
                    </h3>
                    <p className="text-[11px] font-bold text-slate-400 mt-1.5 uppercase tracking-wider">{branch.city}</p>
                  </div>
                  <Building2 className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors shrink-0" />
                </div>
                
                <div className="mt-auto space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex gap-2.5 items-start text-slate-600">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                    <p className="text-sm leading-snug">{branch.address}</p>
                  </div>
                  
                  {branch.phone && (
                    <div className="flex gap-2.5 items-center text-slate-600">
                      <Phone className="w-4 h-4 shrink-0 text-slate-400" />
                      <p className="text-sm font-medium">{branch.phone}</p>
                    </div>
                  )}
                  {branch.cell_phone && (
                    <div className="flex gap-2.5 items-center text-slate-600">
                      <Phone className="w-4 h-4 shrink-0 text-slate-400" aria-hidden />
                      <div className="text-sm">
                        <span className="text-slate-500 font-normal">Cell: </span>
                        <a href={`tel:${String(branch.cell_phone).replace(/\s/g, '')}`} className="font-medium text-[#099546] hover:underline">
                          {branch.cell_phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
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
