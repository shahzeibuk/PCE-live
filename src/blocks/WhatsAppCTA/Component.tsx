import React from 'react'
import { MessageCircle } from 'lucide-react'

import { FOOTER_COMPANY_BLURB } from '@/components/home/homeContent'

export type WhatsAppCTAProps = {
  title?: string
  body?: string
  buttonText?: string
  phoneNumber?: string
  disableInnerContainer?: boolean
}

export const WhatsAppCTABlock: React.FC<WhatsAppCTAProps> = ({
  body,
  buttonText,
  phoneNumber,
  disableInnerContainer = false,
}) => {
  const wa = phoneNumber?.replace(/[^0-9]/g, '') || '923046668810'

  const inner = (
    <div className="rounded-3xl bg-[#099546] px-6 py-10 md:px-10 md:py-12 shadow-lg shadow-[#099546]/20 ring-1 ring-black/5">
      <h2 className="text-2xl md:text-3xl text-center font-black text-white mb-8 md:mb-10 tracking-tight">
        Contact Us on{' '}
        <span className="underline decoration-white/35 decoration-2 underline-offset-[0.2em]">WhatsApp</span>
      </h2>
      <p className="text-white/90 text-center text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-8 md:mb-10">
        {body ||
          'Need the Best Exchange Rates? Chat with us on WhatsApp for fast instant updates!'}
      </p>
      <div className="flex justify-center">
        <a
          href={`https://wa.me/${wa}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white px-8 py-3.5 md:py-4 rounded-full font-semibold text-base md:text-lg shadow-md transition-colors w-full sm:w-auto min-w-[200px]"
        >
          <MessageCircle className="w-6 h-6 shrink-0" aria-hidden />
          {buttonText || 'WhatsApp Now'}
        </a>
      </div>
      <p className="mt-8 md:mt-10 text-center text-sm md:text-base text-white/85 leading-relaxed max-w-3xl mx-auto">
        {FOOTER_COMPANY_BLURB}
      </p>
    </div>
  )

  if (disableInnerContainer) {
    return <div className="container px-4">{inner}</div>
  }

  return <div className="container px-4 max-w-3xl mx-auto">{inner}</div>
}
