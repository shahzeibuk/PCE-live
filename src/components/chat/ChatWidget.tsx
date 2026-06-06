'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Bot, Loader2, Send, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

function messageText(parts: { type: string; text?: string }[]): string {
  return parts
    .filter((part) => part.type === 'text' && part.text)
    .map((part) => part.text)
    .join('')
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  })

  const isBusy = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    if (!open || !scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, open, status])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || isBusy) return
    sendMessage({ text })
    setInput('')
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-[45] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {open ? (
        <div
          id="pce-chat-panel"
          role="dialog"
          aria-label="Pakistan Currency Exchange assistant"
          aria-modal="false"
          className={cn(
            'flex w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-2xl border border-slate-200',
            'bg-white shadow-2xl shadow-slate-900/15 sm:w-[24rem]',
            'animate-in fade-in-0 slide-in-from-bottom-4 duration-200',
          )}
        >
          <header className="flex items-center gap-3 border-b border-slate-200 bg-[#099546] px-4 py-3 text-white">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
              <Bot className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold leading-tight">PCE Assistant</p>
              <p className="text-[11px] text-white/85">Rates, branches & booking help</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 text-white/90 transition-colors hover:bg-white/15"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div
            ref={scrollRef}
            className="flex max-h-[min(50vh,20rem)] min-h-[12rem] flex-col gap-3 overflow-y-auto px-3 py-4 sm:max-h-[22rem]"
          >
            {messages.length === 0 ? (
              <div className="rounded-lg bg-slate-50 px-3 py-2.5 text-sm leading-relaxed text-slate-600">
                Hi! Ask about exchange rates, branches, remittance, or how to book currency.
              </div>
            ) : null}

            {messages.map((message) => {
              const text = messageText(message.parts)
              if (!text) return null
              const isUser = message.role === 'user'
              return (
                <div
                  key={message.id}
                  className={cn('flex', isUser ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed',
                      isUser
                        ? 'rounded-br-md bg-[#099546] text-white'
                        : 'rounded-bl-md border border-slate-200 bg-slate-50 text-slate-800',
                    )}
                  >
                    {text}
                  </div>
                </div>
              )
            })}

            {isBusy ? (
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[#099546]" aria-hidden />
                Thinking…
              </div>
            ) : null}

            {error ? (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                Something went wrong. Try again or WhatsApp us at +92 304 6668810.
              </p>
            ) : null}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 border-t border-slate-200 bg-white p-3"
          >
            <label htmlFor="pce-chat-input" className="sr-only">
              Message
            </label>
            <textarea
              id="pce-chat-input"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
              placeholder="Ask a question…"
              disabled={isBusy}
              className="max-h-24 min-h-10 flex-1 resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#099546]/40"
            />
            <Button
              type="submit"
              size="icon"
              disabled={isBusy || !input.trim()}
              className="h-10 w-10 shrink-0 rounded-xl bg-[#099546] text-white hover:bg-[#088040]"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform',
          'bg-[#099546] text-white hover:bg-[#088040] hover:scale-105',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#099546] focus-visible:ring-offset-2',
          open && 'rotate-0',
        )}
        aria-expanded={open}
        aria-controls="pce-chat-panel"
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>
    </div>
  )
}
