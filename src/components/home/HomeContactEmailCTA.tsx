'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Props = {
  placeholder: string
  ctaLabel: string
  mailTo: string
}

export function HomeContactEmailCTA({ placeholder, ctaLabel, mailTo }: Props) {
  const [email, setEmail] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const body = encodeURIComponent(
      `Enquiry from pakistancurrency.com\n\nEmail: ${email.trim() || '(not provided)'}\n`,
    )
    const subject = encodeURIComponent('Website enquiry — Pakistan Currency Exchange')
    window.location.href = `mailto:${mailTo}?subject=${subject}&body=${body}`
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:mx-auto sm:mt-10 sm:flex-row sm:items-stretch"
    >
      <label htmlFor="home-contact-email" className="sr-only">
        {placeholder}
      </label>
      <Input
        id="home-contact-email"
        type="email"
        name="email"
        autoComplete="email"
        inputMode="email"
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 flex-1 rounded-full border-2 border-slate-200 bg-white px-5 text-base shadow-sm transition-colors placeholder:text-slate-400 focus-visible:border-[#099546] focus-visible:ring-[#099546]/25 md:text-sm"
      />
      <Button
        type="submit"
        className="group relative h-12 shrink-0 overflow-hidden rounded-full border-2 border-[#099546] bg-[#099546] px-8 font-semibold text-white transition-colors sm:px-10"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-[#088040] transition-transform duration-500 ease-out group-hover:scale-y-100"
        />
        <span className="relative z-10">{ctaLabel}</span>
      </Button>
    </form>
  )
}
