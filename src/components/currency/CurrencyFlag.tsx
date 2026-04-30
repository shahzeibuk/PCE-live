'use client'

import React, { useMemo, useState } from 'react'

import { currencyFlagCountryCode, currencyFlagEmoji } from '@/utilities/currencyFlags'

type CurrencyFlagProps = {
  currencyCode: string
  className?: string
}

export function CurrencyFlag({ currencyCode, className }: CurrencyFlagProps) {
  const [imgFailed, setImgFailed] = useState(false)
  const emoji = useMemo(() => currencyFlagEmoji(currencyCode), [currencyCode])
  const country = useMemo(() => currencyFlagCountryCode(currencyCode), [currencyCode])

  if (!country || imgFailed) {
    return (
      <span className={className} aria-hidden>
        {emoji}
      </span>
    )
  }

  return (
    <img
      src={`https://flagcdn.com/w40/${country}.png`}
      alt=""
      aria-hidden
      loading="lazy"
      decoding="async"
      className={className}
      onError={() => setImgFailed(true)}
    />
  )
}
