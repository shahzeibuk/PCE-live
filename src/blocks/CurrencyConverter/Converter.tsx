'use client'

import { CurrencyBooking, type BookingBranch } from '@/components/currency/CurrencyBooking'
import type { CurrencyRate } from '@/payload-types'

export const Converter = ({
  rates,
  branches = [],
}: {
  rates: CurrencyRate[]
  branches?: BookingBranch[]
}) => {
  return <CurrencyBooking rates={rates} branches={branches} layout="default" />
}
