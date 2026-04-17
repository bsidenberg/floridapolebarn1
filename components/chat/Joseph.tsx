'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { COMPANY } from '@/lib/constants'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface SessionContext {
  url: string
  utm: Record<string, string>
  referrer: string
}

const STORAGE_KEY = 'fpb-joseph-chat'
const GREETING = "Hey, I'm Joseph with Florida Pole Barn. What kind of project are you thinking about?"

function parseUTMFromURL(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
  const result: Record<string, string> = {}
  for (const key of keys) {
    const val = params.get(key)
    if (val) result[key] = val
  }
  return result
}

function getSessionContext(): SessionContext {
  return {
    url: typeof window !== 'undefined' ? window.location.href : '',
    utm: parseUTMFromURL(),
    referrer: typeof document !== 'undefined' ? document.referrer : '',
  }
}

// Inline SVGs
function IconChat() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function IconSend() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  )
}

export default function Joseph() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [leadCaptured, setLeadCaptured] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Restore from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as Message[]
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed)
          setHasOpened(true)
        }
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  // Persist messages to sessionStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
      } catch {
        // ignore storage errors
      }
    }
  }, [messages])

  // Show greeting on first open
  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true)
      setMessages([{ role: 'assistant', content: GREETING }])
    }
  }, [isOpen, hasOpened])

  // Scroll to bottom whenever messages change or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    const ta = e.target
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 96) + 'px' // max ~4 lines
  }

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg: Message = { role: 'user', content: text }
    const nextMessages = [...messages, userMsg]

    setMessages(nextMessages)
    setInput('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages,
          sessionContext: getSessionContext(),
        }),
      })

      if (!res.ok) throw new Error('API error')

      const data = await res.json()
      const assistantMsg: Message = { role: 'assistant', content: data.reply }
      setMessages(prev => [...prev, assistantMsg])

      if (data.lead_captured && !leadCaptured) {
        setLeadCaptured(true)
        // Clear storage after 5s so next session starts fresh
        setTimeout(() => {
          try { sessionStorage.removeItem(STORAGE_KEY) } catch { /* noop */ }
        }, 5000)
      }
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `Something went wrong — try again or call us directly at ${COMPANY.phone}.`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, messages, leadCaptured])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const toggleOpen = () => setIsOpen(prev => !prev)

  return (
    <>
      {/* Chat panel */}
      {isOpen && (
        <div
          className={`
            fixed z-[9999] bg-white shadow-xl flex flex-col
            sm:bottom-[90px] sm:right-5 sm:w-[380px] sm:h-[600px] sm:rounded-2xl
            inset-0 sm:inset-auto
          `}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 rounded-t-2xl sm:rounded-t-2xl"
            style={{ background: '#2b3a6b' }}
          >
            <div className="flex flex-col">
              <span className="text-white font-semibold text-sm leading-tight">
                Joseph from Florida Pole Barn
              </span>
              {leadCaptured ? (
                <span className="text-green-300 text-xs mt-0.5 font-medium">
                  ✓ We&apos;ll be in touch shortly
                </span>
              ) : (
                <span className="text-blue-200 text-xs mt-0.5">
                  Typically replies in seconds
                </span>
              )}
            </div>
            <button
              onClick={toggleOpen}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close chat"
            >
              <IconClose />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex mb-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-[75%] px-4 py-2.5 text-sm leading-relaxed
                    ${msg.role === 'user'
                      ? 'bg-gray-200 text-gray-900 rounded-2xl rounded-br-sm'
                      : 'bg-white border border-gray-200 text-gray-900 rounded-2xl rounded-bl-sm shadow-sm'
                    }
                  `}
                  style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-gray-200 px-3 py-3 bg-white rounded-b-2xl sm:rounded-b-2xl">
            <div className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="Type a message…"
                rows={1}
                className="
                  flex-1 resize-none rounded-xl border border-gray-300 px-3 py-2.5
                  text-sm text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-[#2b3a6b]/30 focus:border-[#2b3a6b]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors leading-snug
                "
                style={{ minHeight: '40px', maxHeight: '96px' }}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="
                  flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                  transition-all duration-150
                  disabled:opacity-40 disabled:cursor-not-allowed
                "
                style={{ background: '#c0272d' }}
                aria-label="Send message"
              >
                <IconSend />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating bubble */}
      <button
        onClick={toggleOpen}
        className="
          fixed bottom-5 right-5 z-[9999]
          w-[60px] h-[60px] rounded-full
          flex items-center justify-center
          shadow-lg hover:scale-110 active:scale-95
          transition-transform duration-200
        "
        style={{ background: '#c0272d' }}
        aria-label={isOpen ? 'Close chat' : 'Chat with Joseph'}
      >
        {isOpen ? <IconClose /> : <IconChat />}
      </button>
    </>
  )
}
