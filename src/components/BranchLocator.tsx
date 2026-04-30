'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Phone, Building2, PhoneCall, Navigation } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function telHref(num: string) {
  return `tel:${String(num).replace(/\s/g, '')}`
}

function getDirectionsHref(branch: any) {
  const link = branch.google_map_link?.trim()
  if (link) return link
  const q = encodeURIComponent([branch.address, branch.city, 'Pakistan'].filter(Boolean).join(', '))
  return `https://www.google.com/maps/search/?api=1&query=${q}`
}

export function BranchLocator({ branches }: { branches: any[] }) {
  const cities = useMemo(() => {
    const uniqueCities = new Set(branches.map((b) => b.city).filter(Boolean))
    return Array.from(uniqueCities).sort()
  }, [branches])

  const [cityQuery, setCityQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState<string>('')

  const citiesFiltered = useMemo(() => {
    const q = cityQuery.trim().toLowerCase()
    if (!q) return cities
    return cities.filter((c) => String(c).toLowerCase().includes(q))
  }, [cities, cityQuery])

  useEffect(() => {
    if (cities.length && !selectedCity) {
      setSelectedCity(cities[0])
    }
  }, [cities, selectedCity])

  useEffect(() => {
    if (citiesFiltered.length === 0) return
    if (!citiesFiltered.includes(selectedCity)) {
      setSelectedCity(citiesFiltered[0])
    }
  }, [citiesFiltered, selectedCity])

  const filteredBranches = useMemo(() => {
    return branches.filter((b) => b.city === selectedCity)
  }, [branches, selectedCity])

  const primaryPhone = (branch: any) => branch.phone || branch.cell_phone

  return (
    <div className="space-y-8">
      <div className="max-w-md space-y-4 relative z-20">
        <div>
          <label htmlFor="branch-city-search" className="block text-xs font-semibold text-slate-500 mb-2">
            Search city
          </label>
          <Input
            id="branch-city-search"
            type="search"
            autoComplete="off"
            placeholder="Type a city name…"
            value={cityQuery}
            onChange={(e) => setCityQuery(e.target.value)}
            className="h-11 text-base rounded-md border-slate-200"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-2">Select city</label>
          <Select value={selectedCity} onValueChange={setSelectedCity} disabled={citiesFiltered.length === 0}>
            <SelectTrigger className="w-full h-11 text-base font-medium rounded-md border border-slate-200 focus:ring-1 focus:ring-primary bg-white">
              <SelectValue placeholder={citiesFiltered.length ? 'Select a city…' : 'No matching cities'} />
            </SelectTrigger>
            <SelectContent className="max-h-[60vh] rounded-md z-[100] border-slate-200">
              {citiesFiltered.map((city) => (
                <SelectItem key={city} value={city} className="text-sm py-2">
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
        {filteredBranches.map((branch, i) => {
          const phone = primaryPhone(branch)
          return (
            <Card
              key={branch.id || i}
              className="border border-slate-200 shadow-none hover:border-primary/40 transition-colors h-full flex flex-col rounded-md bg-white"
            >
              <CardContent className="p-5 flex flex-col h-full min-h-[16rem]">
                <div className="flex justify-between items-start mb-4">
                  <div className="min-w-0 pr-2">
                    <Link
                      href={`/branches/${branch.id}`}
                      className="group/title block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#099546] focus-visible:ring-offset-2 rounded-sm"
                    >
                      <h3 className="font-semibold text-lg text-slate-900 group-hover/title:text-primary transition-colors line-clamp-2 leading-tight">
                        {branch.branch_name}
                      </h3>
                    </Link>
                    <p className="text-[11px] font-bold text-slate-400 mt-1.5 uppercase tracking-wider">{branch.city}</p>
                  </div>
                  <Building2 className="w-5 h-5 text-slate-300 shrink-0" aria-hidden />
                </div>

                <div className="mt-auto space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex gap-2.5 items-start text-slate-600">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" aria-hidden />
                    <p className="text-sm leading-snug">{branch.address}</p>
                  </div>

                  <a
                    href={getDirectionsHref(branch)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 py-3 text-slate-800 font-semibold text-sm hover:bg-[#099546]/12 hover:text-[#099546] transition-colors min-h-12 border border-slate-200 hover:border-[#099546]/30"
                  >
                    <Navigation className="w-5 h-5 shrink-0" aria-hidden />
                    <span>Get directions</span>
                  </a>

                  {phone ? (
                    <a
                      href={telHref(phone)}
                      className="flex items-center justify-center gap-2 rounded-lg bg-[#099546]/12 px-3 py-3 text-[#099546] font-semibold text-sm hover:bg-[#099546]/20 transition-colors min-h-12 border border-[#099546]/20"
                    >
                      <PhoneCall className="w-5 h-5 shrink-0" aria-hidden />
                      <span>Call {phone}</span>
                    </a>
                  ) : null}

                  {branch.phone && branch.cell_phone && branch.phone !== branch.cell_phone ? (
                    <div className="flex gap-2.5 items-center text-slate-600 text-sm">
                      <Phone className="w-4 h-4 shrink-0 text-slate-400" aria-hidden />
                      <a href={telHref(branch.cell_phone)} className="font-medium text-[#099546] hover:underline">
                        Cell: {branch.cell_phone}
                      </a>
                    </div>
                  ) : null}

                  <Link
                    href={`/branches/${branch.id}`}
                    className="block text-center text-sm font-semibold text-slate-600 hover:text-[#099546] pt-1"
                  >
                    Branch details →
                  </Link>
                </div>
              </CardContent>
            </Card>
          )
        })}

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
