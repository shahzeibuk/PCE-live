'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Loader2, MessageCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CurrencyFlag } from '@/components/currency/CurrencyFlag'
import { cn } from '@/utilities/ui'
import {
  computeConversion,
  defaultFromCode,
  defaultToCode,
  normalizeCurrencyOptions,
  type RateRow,
} from '@/utilities/currencyConversion'
import type { CurrencyRate } from '@/payload-types'

const WHATSAPP_URL = 'https://wa.me/923046668810'
const STEP_COUNT = 4

export type BookingBranch = {
  id: string | number
  branch_name: string
  city: string
}

type CurrencyBookingProps = {
  rates: CurrencyRate[]
  branches?: BookingBranch[]
  layout?: 'default' | 'sidebar'
}

function formatMoney(value: number): string {
  return value.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

function describeTransaction(from: string, to: string): string {
  if (from === 'PKR' && to !== 'PKR') return `Buy ${to}`
  if (to === 'PKR' && from !== 'PKR') return `Sell ${from}`
  return `${from} → ${to}`
}

function buildBookingMessage(data: {
  fromCode: string
  toCode: string
  fromName: string
  toName: string
  amount: number
  result: number
  name: string
  phone: string
  email: string
  branchLabel: string
  preferredDate: string
  notes: string
}): string {
  const lines = [
    `Currency booking — ${describeTransaction(data.fromCode, data.toCode)}`,
    `${formatMoney(data.amount)} ${data.fromCode} (${data.fromName}) → ${formatMoney(data.result)} ${data.toCode} (${data.toName})`,
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Branch: ${data.branchLabel}`,
    `Date: ${data.preferredDate || 'Flexible'}`,
  ]
  if (data.notes.trim()) lines.push(`Notes: ${data.notes.trim()}`)
  lines.push('Via pakistancurrency.com')
  return lines.join('\n')
}

function StepDots({ step }: { step: number }) {
  return (
    <div className="flex shrink-0 items-center gap-1" aria-label={`Step ${step + 1} of ${STEP_COUNT}`}>
      {Array.from({ length: STEP_COUNT }, (_, i) => (
        <span
          key={i}
          className={cn(
            'h-1.5 rounded-full transition-all',
            i === step ? 'w-4 bg-[#099546]' : i < step ? 'w-1.5 bg-[#099546]/50' : 'w-1.5 bg-slate-200',
          )}
          aria-hidden
        />
      ))}
    </div>
  )
}

export function CurrencyBooking({ rates, branches = [], layout = 'default' }: CurrencyBookingProps) {
  const isSidebar = layout === 'sidebar'

  const ratesKey = useMemo(
    () => (rates ?? []).map((r) => `${r.currency_code}:${r.buy_rate}:${r.sell_rate}`).join('|'),
    [rates],
  )

  const options = useMemo(() => normalizeCurrencyOptions((rates ?? []) as RateRow[]), [rates])
  const codes = useMemo(() => options.map((o) => o.currency_code), [options])

  const [step, setStep] = useState(0)
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('PKR')
  const [amount, setAmount] = useState(1000)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [branchId, setBranchId] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [notes, setNotes] = useState('')
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (codes.length === 0) return
    const set = new Set(codes)
    let nextFrom = set.has(fromCurrency) ? fromCurrency : defaultFromCode(codes)
    let nextTo = set.has(toCurrency) ? toCurrency : defaultToCode(codes, nextFrom)
    if (nextFrom === nextTo) {
      nextTo = codes.find((c) => c !== nextFrom) ?? nextTo
    }
    if (nextFrom !== fromCurrency) setFromCurrency(nextFrom)
    if (nextTo !== toCurrency) setToCurrency(nextTo)
  }, [ratesKey, codes, fromCurrency, toCurrency])

  useEffect(() => {
    if (branches.length > 0 && !branchId) {
      setBranchId(String(branches[0].id))
    }
  }, [branches, branchId])

  const labelFor = (code: string) =>
    options.find((o) => o.currency_code === code)?.currency_name ?? code

  const result = computeConversion(options, amount, fromCurrency, toCurrency)
  const transactionHint = describeTransaction(fromCurrency, toCurrency)

  const selectedBranch = branches.find((b) => String(b.id) === branchId)
  const branchLabel = selectedBranch ? `${selectedBranch.branch_name}, ${selectedBranch.city}` : 'Any branch'

  const minDate = new Date().toISOString().slice(0, 10)

  const canStep0 = amount > 0 && fromCurrency !== toCurrency
  const canStep1 = name.trim().length >= 2 && phone.trim().length >= 7 && /\S+@\S+\.\S+/.test(email)
  const canStep2 = branches.length === 0 || Boolean(branchId)

  const bookingPayload = useMemo(
    () =>
      buildBookingMessage({
        fromCode: fromCurrency,
        toCode: toCurrency,
        fromName: labelFor(fromCurrency),
        toName: labelFor(toCurrency),
        amount,
        result,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        branchLabel,
        preferredDate,
        notes,
      }),
    [
      fromCurrency,
      toCurrency,
      amount,
      result,
      name,
      phone,
      email,
      branchLabel,
      preferredDate,
      notes,
      options,
    ],
  )

  const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(bookingPayload)}`

  const handleSubmit = async () => {
    setSubmitState('loading')
    setSubmitError('')
    try {
      const res = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: bookingPayload,
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.errors?.[0]?.message || 'Could not submit. Try WhatsApp.')
      }
      setSubmitState('success')
    } catch (err) {
      setSubmitState('error')
      setSubmitError(err instanceof Error ? err.message : 'Submission failed')
    }
  }

  const goNext = () => setStep((s) => Math.min(s + 1, STEP_COUNT - 1))
  const goBack = () => setStep((s) => Math.max(s - 1, 0))

  const canGoNext =
    (step === 0 && canStep0) ||
    (step === 1 && canStep1) ||
    (step === 2 && canStep2) ||
    step === 3

  if (codes.length < 2) {
    return (
      <p className="text-center text-sm text-slate-600 py-4">
        Rates unavailable. Please contact a branch.
      </p>
    )
  }

  const fieldH = 'h-10'
  const selectTrigger = cn(
    fieldH,
    'min-w-0 rounded-md border-slate-200 text-xs font-semibold sm:text-sm',
  )
  /** Mobile: two field rows. Desktop: one field row. */
  const fieldRowClass = 'flex min-w-0 flex-nowrap items-center gap-1.5 sm:gap-2'
  const fieldsMobileClass = 'flex flex-col gap-2 md:hidden'
  const fieldsDesktopClass = 'hidden min-w-0 flex-nowrap items-center gap-2 md:flex'
  /** Line 3 on mobile, line 2 on desktop: dots + actions. */
  const navRowClass = 'mt-2 flex min-w-0 flex-nowrap items-center gap-1.5 sm:gap-2'

  const fieldLabelClass =
    'w-7 shrink-0 text-[9px] font-bold uppercase tracking-wide text-slate-500 sm:w-9 sm:text-[10px]'
  const amountInputClass = cn(
    fieldH,
    'shrink-0 rounded-md border border-slate-200 bg-white px-2 font-mono text-xs tabular-nums sm:text-sm',
    'w-[4.5rem] sm:w-24',
  )

  const summaryLine = `${formatMoney(amount)} ${fromCurrency} → ${formatMoney(result)} ${toCurrency}`

  const handleFromChange = (value: string) => {
    setFromCurrency(value)
    if (value === toCurrency) {
      const other = codes.find((c) => c !== value)
      if (other) setToCurrency(other)
    }
  }

  const handleToChange = (value: string) => {
    setToCurrency(value)
    if (value === fromCurrency) {
      const other = codes.find((c) => c !== value)
      if (other) setFromCurrency(other)
    }
  }

  const currencySelect = (value: string, onChange: (v: string) => void, id: string, label: string) => (
    <Select value={value} onValueChange={onChange}>
      <span id={`label-${id}`} className="sr-only">
        {label}
      </span>
      <SelectTrigger
        className={cn(
          selectTrigger,
          'w-0 min-w-[4.25rem] flex-1 sm:min-w-[5.5rem] md:max-w-[10rem] md:flex-initial',
          '[&_[data-slot=select-value]]:truncate',
        )}
        aria-labelledby={`label-${id}`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper" className="max-h-72">
        {options.map((r) => (
          <SelectItem key={`${id}-${r.currency_code}`} value={r.currency_code}>
            <span className="flex items-center gap-1.5">
              <CurrencyFlag currencyCode={r.currency_code} className="h-4 w-4 shrink-0" />
              {r.currency_code}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

  return (
    <div className={cn('mx-auto w-full', isSidebar ? 'max-w-none' : 'max-w-4xl')}>
      <div
        className={cn(
          'min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white px-2 py-3 shadow-sm sm:px-3',
          !isSidebar && 'md:px-4',
        )}
        aria-label={`Currency booking step ${step + 1} of ${STEP_COUNT}`}
      >
        {/* ── Step 0: Currency ── */}
        {step === 0 && (
          <>
            {/* Mobile: line 1 + line 2 fields */}
            <div className={fieldsMobileClass} role="group" aria-label="Amount and currencies">
              <div className={fieldRowClass}>
                <label htmlFor="booking-amount-mobile" className="sr-only">
                  Amount
                </label>
                <input
                  id="booking-amount-mobile"
                  type="number"
                  min={0}
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  className={amountInputClass}
                />
                <span className={fieldLabelClass}>From</span>
                {currencySelect(fromCurrency, handleFromChange, 'from-mobile', 'From currency')}
              </div>
              <div className={fieldRowClass}>
                <span className={fieldLabelClass}>To</span>
                {currencySelect(toCurrency, handleToChange, 'to-mobile', 'To currency')}
                <span className="shrink-0 text-sm text-slate-400" aria-hidden>
                  =
                </span>
                <output
                  className="min-w-0 flex-1 truncate text-right text-xs font-bold tabular-nums text-[#099546] sm:text-sm"
                  htmlFor="booking-amount-mobile"
                  aria-live="polite"
                >
                  {formatMoney(result)} {toCurrency}
                </output>
              </div>
            </div>

            {/* Desktop: single field row */}
            <div className={fieldsDesktopClass} role="group" aria-label="Amount and currencies">
              <label htmlFor="booking-amount" className="sr-only">
                Amount
              </label>
              <input
                id="booking-amount"
                type="number"
                min={0}
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className={amountInputClass}
              />
              <span className={fieldLabelClass}>From</span>
              {currencySelect(fromCurrency, handleFromChange, 'from', 'From currency')}
              <span className={fieldLabelClass}>To</span>
              {currencySelect(toCurrency, handleToChange, 'to', 'To currency')}
              <span className="shrink-0 text-sm text-slate-400" aria-hidden>
                =
              </span>
              <output
                className="min-w-0 flex-1 truncate text-right text-sm font-bold tabular-nums text-[#099546]"
                htmlFor="booking-amount"
                aria-live="polite"
              >
                {formatMoney(result)} {toCurrency}
              </output>
            </div>

            <div className={navRowClass}>
              <StepDots step={step} />
              <span className="hidden min-w-0 flex-1 truncate text-xs text-slate-500 md:inline">
                {transactionHint} (indicative)
              </span>
              <Button
                type="button"
                size="sm"
                onClick={goNext}
                disabled={!canGoNext}
                className={cn(fieldH, 'ml-auto shrink-0 bg-[#099546] px-3 text-white hover:bg-[#088040] sm:px-4')}
              >
                Next
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </>
        )}

        {/* ── Step 1: Contact ── */}
        {step === 1 && (
          <>
            <div className={fieldsMobileClass} role="group" aria-label="Your details">
              <div className={fieldRowClass}>
                <Input
                  id="booking-name-mobile"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  autoComplete="name"
                  className={cn(fieldH, 'min-w-0 w-0 flex-1 text-xs sm:text-sm')}
                />
                <Input
                  id="booking-phone-mobile"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="03XX XXXXXXX"
                  autoComplete="tel"
                  className={cn(fieldH, 'min-w-0 w-0 flex-1 text-xs sm:text-sm')}
                />
              </div>
              <div className={fieldRowClass}>
                <Input
                  id="booking-email-mobile"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  autoComplete="email"
                  className={cn(fieldH, 'w-full text-xs sm:text-sm')}
                />
              </div>
            </div>

            <div className={fieldsDesktopClass} role="group" aria-label="Your details">
              <Input
                id="booking-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                autoComplete="name"
                className={cn(fieldH, 'min-w-0 w-0 flex-1 text-sm')}
              />
              <Input
                id="booking-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                autoComplete="tel"
                className={cn(fieldH, 'min-w-0 w-0 flex-1 text-sm')}
              />
              <Input
                id="booking-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                autoComplete="email"
                className={cn(fieldH, 'min-w-0 w-0 flex-1 text-sm')}
              />
            </div>

            <div className={navRowClass}>
              <StepDots step={step} />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={goBack}
                className={cn(fieldH, 'shrink-0 px-2 sm:px-3')}
              >
                <ArrowLeft className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={goNext}
                disabled={!canGoNext}
                className={cn(fieldH, 'ml-auto shrink-0 bg-[#099546] px-3 text-white hover:bg-[#088040] sm:px-4')}
              >
                Next
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </>
        )}

        {/* ── Step 2: Branch & date ── */}
        {step === 2 && (
          <>
            <div className={fieldsMobileClass} role="group" aria-label="Visit details">
              <div className={fieldRowClass}>
                {branches.length > 0 ? (
                  <Select value={branchId} onValueChange={setBranchId}>
                    <SelectTrigger
                      className={cn(
                        fieldH,
                        'min-w-0 w-0 flex-1 text-xs sm:text-sm [&_[data-slot=select-value]]:truncate',
                      )}
                      aria-label="Branch"
                    >
                      <SelectValue placeholder="Branch" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {branches.map((b) => (
                        <SelectItem key={b.id} value={String(b.id)}>
                          {b.branch_name}, {b.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="min-w-0 flex-1 truncate text-xs text-slate-600 sm:text-sm">
                    Any branch
                  </span>
                )}
                <Input
                  id="booking-date-mobile"
                  type="date"
                  min={minDate}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className={cn(fieldH, 'w-[6.75rem] shrink-0 px-1.5 text-xs sm:w-[9.5rem] sm:px-3 sm:text-sm')}
                  aria-label="Preferred date"
                />
              </div>
              <div className={fieldRowClass}>
                <Input
                  id="booking-notes-mobile"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes (optional)"
                  className={cn(fieldH, 'w-full text-xs sm:text-sm')}
                />
              </div>
            </div>

            <div className={fieldsDesktopClass} role="group" aria-label="Visit details">
              {branches.length > 0 ? (
                <Select value={branchId} onValueChange={setBranchId}>
                  <SelectTrigger
                    className={cn(
                      fieldH,
                      'min-w-0 w-0 flex-1 text-sm [&_[data-slot=select-value]]:truncate md:max-w-[14rem] md:flex-initial',
                    )}
                    aria-label="Branch"
                  >
                    <SelectValue placeholder="Branch" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {branches.map((b) => (
                      <SelectItem key={b.id} value={String(b.id)}>
                        {b.branch_name}, {b.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <span className="min-w-0 flex-1 truncate text-sm text-slate-600">Any branch</span>
              )}
              <Input
                id="booking-date"
                type="date"
                min={minDate}
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className={cn(fieldH, 'w-[9.5rem] shrink-0 text-sm')}
                aria-label="Preferred date"
              />
              <Input
                id="booking-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes"
                className={cn(fieldH, 'min-w-0 w-0 flex-1 text-sm')}
              />
            </div>

            <div className={navRowClass}>
              <StepDots step={step} />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={goBack}
                className={cn(fieldH, 'shrink-0 px-2 sm:px-3')}
              >
                <ArrowLeft className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={goNext}
                disabled={!canGoNext}
                className={cn(fieldH, 'ml-auto shrink-0 bg-[#099546] px-3 text-white hover:bg-[#088040] sm:px-4')}
              >
                Review
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </>
        )}

        {/* ── Step 3: Confirm ── */}
        {step === 3 && (
          <>
            <div className={fieldsMobileClass} role="group" aria-label="Booking summary">
              <div className={fieldRowClass}>
                <p
                  className="min-w-0 w-full truncate text-xs font-medium text-slate-800 sm:text-sm"
                  title={summaryLine}
                >
                  {summaryLine}
                </p>
              </div>
              <div className={fieldRowClass}>
                <p
                  className="min-w-0 w-full truncate text-xs text-slate-600 sm:text-sm"
                  title={`${name} · ${branchLabel}`}
                >
                  {name} · {branchLabel}
                </p>
              </div>
            </div>

            <div className={fieldsDesktopClass} role="group" aria-label="Booking summary">
              <p
                className="min-w-0 flex-1 truncate text-sm font-medium text-slate-800"
                title={summaryLine}
              >
                {summaryLine}
              </p>
              <p
                className="min-w-0 max-w-[40%] truncate text-sm text-slate-600 md:max-w-none"
                title={`${name} · ${branchLabel}`}
              >
                {name} · {branchLabel}
              </p>
            </div>

            <div className={navRowClass}>
              <StepDots step={step} />
              {submitState !== 'success' ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={goBack}
                    disabled={submitState === 'loading'}
                    className={cn(fieldH, 'shrink-0 px-2 sm:px-3')}
                  >
                    <ArrowLeft className="h-4 w-4 sm:mr-1" />
                    <span className="hidden sm:inline">Back</span>
                  </Button>
                  <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      asChild
                      className={cn(fieldH, 'border-[#099546] px-2.5 text-[#099546] hover:bg-[#099546]/5 sm:px-3')}
                    >
                      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleSubmit}
                      disabled={submitState === 'loading'}
                      className={cn(fieldH, 'bg-[#099546] px-3 text-white hover:bg-[#088040] sm:px-4')}
                    >
                      {submitState === 'loading' ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Book'
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <p className="ml-auto flex min-w-0 items-center gap-1 truncate text-xs font-medium text-[#099546] sm:text-sm">
                  <Check className="h-4 w-4 shrink-0" />
                  <span className="truncate">Booking sent</span>
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {submitState === 'error' && (
        <p className="mt-2 text-center text-xs text-red-600" role="alert">
          {submitError}
        </p>
      )}
      <p className="mt-2 text-center text-[10px] text-slate-500">
        Indicative rates only. Confirm at your branch.
      </p>
    </div>
  )
}
