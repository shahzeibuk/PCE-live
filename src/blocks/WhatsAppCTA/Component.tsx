import React from 'react'
import { MessageCircle } from 'lucide-react'

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
  const containerClasses = disableInnerContainer ? '' : 'container px-4 py-16 md:py-20'

  return (
    <div className={containerClasses}>
      {!disableInnerContainer && (
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200 dark:border-slate-700" />
          </div>
          <div className="relative bg-background px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              Contact Us on <span className="text-[#099546]">WhatsApp</span>
            </h2>
          </div>
        </div>
      )}

      <div
        className={`max-w-2xl mx-auto text-center border border-slate-200 dark:border-slate-800 rounded bg-slate-50 dark:bg-slate-900/30 p-8 md:p-10 ${disableInnerContainer ? 'container px-4' : ''}`}
      >
        <p className="text-slate-600 dark:text-slate-400 mb-8 text-base leading-relaxed">
          {body ||
            'Need the Best Exchange Rates? Chat with us on WhatsApp for fast instant updates!'}
        </p>
        <a
          href={`https://wa.me/${wa}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white px-8 py-4 rounded font-semibold text-lg w-full sm:w-auto min-w-[200px]"
        >
          <MessageCircle className="w-6 h-6" />
          {buttonText || 'WhatsApp Now'}
        </a>
      </div>
    </div>
  )
}
