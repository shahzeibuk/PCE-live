import React from 'react'
import { Logo } from './Logo'

export const PayloadLogo = () => {
  return (
    <div className="flex items-center gap-2 py-2">
      <Logo className="h-12 w-auto" />
      <span className="font-bold tracking-tight text-[#099546] text-xl">PCE Admin</span>
    </div>
  )
}

export const PayloadIcon = () => {
  return (
    <div className="flex items-center justify-center p-1 bg-[#099546] rounded-md">
      <span className="font-bold text-white text-sm">PCE</span>
    </div>
  )
}
