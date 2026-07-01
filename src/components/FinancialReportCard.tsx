import { Download, FileText } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { HOME_INDEX_HEADING_CLASS } from '@/components/home/homeContent'
import { resolveMediaResourceUrl } from '@/utilities/normalizeStoredMediaPath'

export type FinancialReportCardData = {
  id: number | string
  title: string
  description?: string | null
  report_file?: { url?: string | null; filename?: string | null } | number | null
}

type Props = {
  report: FinancialReportCardData
  variant?: 'grid' | 'list'
}

export function FinancialReportCard({ report, variant = 'grid' }: Props) {
  const media = typeof report.report_file === 'object' ? report.report_file : null
  const fileUrl = resolveMediaResourceUrl(media)
  const downloadName = media?.filename || `${report.title}.pdf`

  const iconBox = (
    <div
      className={
        variant === 'grid'
          ? 'mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl border border-[#099546]/20 bg-[#099546]/10 shadow-sm'
          : 'flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#099546]/20 bg-[#099546]/10 shadow-sm'
      }
      aria-hidden
    >
      <FileText className="h-8 w-8 text-[#099546]" strokeWidth={1.75} />
    </div>
  )

  const downloadButton = fileUrl ? (
    <Button
      asChild
      className="group relative w-full overflow-hidden rounded-full border-2 border-[#099546] bg-white text-[#099546] hover:text-white"
      variant="outline"
    >
      <a href={fileUrl} target="_blank" rel="noopener noreferrer" download={downloadName}>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-[#099546] transition-transform duration-500 ease-out group-hover:scale-y-100"
        />
        <span className="relative z-10 inline-flex items-center justify-center gap-2 font-semibold">
          <Download className="h-4 w-4 shrink-0" aria-hidden />
          Download PDF
        </span>
      </a>
    </Button>
  ) : (
    <Button disabled className="w-full rounded-full" variant="outline">
      PDF unavailable
    </Button>
  )

  if (variant === 'list') {
    return (
      <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-100/80 sm:flex-row sm:items-stretch sm:gap-6">
        <div className="flex shrink-0 items-start sm:items-center">{iconBox}</div>
        <div className="flex min-w-0 flex-1 flex-col">
          <h2 className={`text-lg leading-snug text-slate-900 md:text-xl ${HOME_INDEX_HEADING_CLASS}`}>
            {report.title}
          </h2>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 md:text-[15px]">
            {report.description?.trim() || 'Download the full financial report for detailed information.'}
          </p>
          <div className="mt-6 sm:max-w-xs">{downloadButton}</div>
        </div>
      </article>
    )
  }

  return (
    <article className="flex h-full flex-col items-center rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm ring-1 ring-slate-100/80 transition-shadow hover:shadow-md md:p-7">
      {iconBox}
      <h3 className={`mb-3 text-lg leading-snug text-slate-900 md:text-xl ${HOME_INDEX_HEADING_CLASS}`}>
        {report.title}
      </h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600 md:text-[15px]">
        {report.description?.trim() || 'Download the full financial report for detailed information.'}
      </p>
      <div className="mt-auto w-full">{downloadButton}</div>
    </article>
  )
}
