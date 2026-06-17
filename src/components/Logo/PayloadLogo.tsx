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
    <img
      src="/favicon.svg"
      alt="Pakistan Currency Exchange"
      width={28}
      height={28}
      className="block h-7 w-7 rounded-md object-contain"
    />
  )
}
