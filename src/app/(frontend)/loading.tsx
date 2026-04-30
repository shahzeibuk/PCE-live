'use client'

import React from 'react'

import { Logo } from '@/components/Logo/Logo'

export default function FrontendLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-5">
        <div className="relative">
          <div className="absolute inset-0 animate-ping bg-[#099546]/20" aria-hidden />
          <div className="relative border border-[#099546]/25 bg-white px-6 py-4 shadow-sm">
            <Logo className="h-auto w-full max-w-[300px] animate-pulse" loading="eager" priority="high" />
          </div>
        </div>
        <div className="h-1.5 w-44 overflow-hidden rounded-full bg-slate-200" aria-hidden>
          <div className="h-full w-1/2 animate-[loader-slide_1.05s_ease-in-out_infinite] rounded-full bg-[#099546]" />
        </div>
      </div>
    </div>
  )
}
