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
  title, 
  body, 
  buttonText, 
  phoneNumber,
  disableInnerContainer = false
}) => {
  const containerClasses = disableInnerContainer ? "" : "container py-24"
  return (
    <div className={containerClasses}>
      {!disableInnerContainer && (
        <div className="relative flex items-center justify-center mb-16">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-border/80"></div>
          </div>
          <div className="relative bg-background px-8">
            <h2 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter">
              {title || 'Contact Us on WhatsApp'}
            </h2>
          </div>
        </div>
      )}

      <div className={`max-w-4xl mx-auto bg-linear-to-br from-[#25D366]/10 to-transparent p-12 rounded-4xl border border-[#25D366]/20 text-center shadow-2xl shadow-[#25D366]/5 relative group overflow-hidden ${disableInnerContainer ? "container" : ""}`}>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#25D366]/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" aria-hidden="true" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#25D366]/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" aria-hidden="true" />
        
        <div className="relative z-10">
          <div className="bg-[#25D366]/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-[#25D366]/20 group-hover:rotate-6 transition-transform duration-500">
            <MessageCircle className="w-12 h-12 text-[#25D366] fill-[#25D366]" />
          </div>
          
          <h3 className="text-3xl md:text-4xl font-black text-foreground mb-4 tracking-tighter">
            {title || 'Need the Best Exchange Rates?'}
          </h3>
          
          <p className="text-muted-foreground text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            {body || 'Chat with us on WhatsApp for instant updates and personalized quotes!'}
          </p>
          
          <a 
            href={`https://wa.me/${phoneNumber?.replace(/[^0-9]/g, '') || '920000000000'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-[#25D366] hover:bg-[#20ba59] text-white px-12 py-6 rounded-2xl font-black text-2xl shadow-xl hover:shadow-[#25D366]/30 hover:-translate-y-2 transition-all active:scale-95 group/btn"
          >
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
            </span>
            {buttonText || 'WhatsApp Now'}
          </a>
        </div>
      </div>
    </div>
  )
}
