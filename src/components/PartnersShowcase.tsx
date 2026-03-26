import Image from 'next/image'

import { PARTNER_LOGOS } from '@/constants/partnerLogos'

type Props = {
  /** e.g. “Our partners” vs “Our valued partners” */
  title?: string
  subtitle?: string
  className?: string
}

/**
 * Static partner logo grid using assets in `public/partners/`.
 * Use on About and other marketing pages; footer uses `PartnersCarousel` for motion.
 */
export function PartnersShowcase({
  title = 'Our partners',
  subtitle = 'We work with trusted global brands to move money and exchange currency safely.',
  className = '',
}: Props) {
  return (
    <section
      className={`border-y border-slate-200 bg-slate-50/80 ${className}`}
    >
      <div className="container px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 text-slate-600 text-sm md:text-base">{subtitle}</p>
          ) : null}
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto list-none p-0 m-0">
          {PARTNER_LOGOS.map((p) => (
            <li
              key={p.name}
              className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-6 shadow-sm"
            >
              <Image
                src={p.src}
                alt={p.name}
                width={200}
                height={100}
                className="max-h-14 w-auto object-contain grayscale hover:grayscale-0 transition-[filter] duration-300"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
