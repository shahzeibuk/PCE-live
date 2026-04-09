import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Button } from '@/components/ui/button'
import { ServiceListingIcon } from '@/components/services/ServiceListingIcon'
import { ArrowRight } from 'lucide-react'

export type ServicesGridProps = {
  title?: string
  services?: any[]
  disableInnerContainer?: boolean
}

export const ServicesGridBlock: React.FC<ServicesGridProps> = async ({
  title,
  services: providedServices,
  disableInnerContainer = false,
}) => {
  let services = providedServices

  if (!services) {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'services',
      limit: 12,
      sort: 'title',
      depth: 1,
    })
    services = result.docs
  }

  const containerClasses = disableInnerContainer ? '' : 'container px-4 py-16 md:py-20'

  const list = (services ?? []).filter((s) => s?.id != null && s?.slug)

  return (
    <div className={containerClasses}>
      {!disableInnerContainer && (
        <div className="relative flex items-center justify-center mb-12">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative bg-background px-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#099546] text-center">
              {title || 'Our Services'}
            </h2>
          </div>
        </div>
      )}

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-stretch ${disableInnerContainer ? 'container px-4' : ''}`}
      >
        {list.map((service: any) => (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="group bg-slate-100 border border-slate-200 rounded-lg p-6 md:p-8 flex flex-col items-center text-center hover:border-[#099546]/60 hover:shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#099546] focus-visible:ring-offset-2 h-full min-h-[13rem]"
          >
            <div className="mb-4">
              <ServiceListingIcon service={service} className="mx-auto" />
            </div>
            <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 group-hover:text-[#099546] transition-colors">
              {service.title}
            </h3>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed line-clamp-3 flex-1 min-h-0 w-full">
              {service.short_description || service.description}
            </p>
            <span className="mt-5 inline-flex w-full max-w-[16rem] items-center justify-center gap-2 rounded-md border-2 border-[#099546] bg-white px-4 py-2.5 text-sm font-semibold text-[#099546] group-hover:bg-[#099546] group-hover:text-white transition-colors">
              Learn more
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </span>
          </Link>
        ))}

        {list.length === 0 && (
          <div className="col-span-full text-center py-14 px-4 border border-dashed border-slate-300 rounded bg-slate-50/80">
            <p className="text-slate-700 font-medium mb-2">No services to show yet</p>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              In the admin, go to <strong className="text-slate-700">Website → Services</strong>{' '}
              and publish entries. They appear here and on the <strong>/services</strong> page automatically.
            </p>
          </div>
        )}
      </div>

      {!disableInnerContainer && (
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4 px-1">
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-md border-2 border-[#099546] bg-white px-8 font-semibold text-[#099546] hover:bg-[#099546]/5"
          >
            <Link href="/services" className="inline-flex items-center justify-center gap-2">
              View all services
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
          <Button asChild className="h-11 rounded-md bg-[#099546] px-8 font-semibold text-white hover:bg-[#088040]">
            <Link href="/branches" className="inline-flex items-center justify-center gap-2">
              Find nearest branch
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
