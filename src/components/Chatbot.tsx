import { useEffect, useRef, useState } from 'react'
import { STARTERS, answer, isMailIntent, mailStep, startMail } from '../lib/chatbot'
import type { Action, MailDraft, Reply } from '../lib/chatbot'
import { profile } from '../data/portfolio'

interface Msg { id: number; who: 'bot' | 'me'; text: string; actions?: Action[] }

const GREETING: Reply = {
  text: `Hi! I'm the assistant for ${profile.name}'s portfolio. Ask me about skills, experience, projects or education, or I can help you send a mail.`,
  actions: STARTERS,
}

// Floating chat widget. All answers come from src/lib/chatbot.ts (no network, no API keys).
// `draft` holds the state of the "send a mail" flow; while it is set, input goes to that flow.
export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [typing, setTyping] = useState(false)
  const [text, setText] = useState('')
  const draft = useRef<MailDraft | null>(null)
  const nextId = useRef(1)
  const list = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)

  const push = (m: Omit<Msg, 'id'>) => setMsgs((prev) => [...prev, { ...m, id: nextId.current++ }])
  const botSay = (r: Reply) => push({ who: 'bot', ...r })

  // Greet the first time the panel opens.
  const toggle = () => {
    if (!open && nextId.current === 1) botSay(GREETING)
    setOpen(!open)
  }

  // Every open: focus the input. Esc closes.
  useEffect(() => {
    if (!open) return
    input.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => { list.current?.scrollTo({ top: list.current.scrollHeight, behavior: 'smooth' }) }, [msgs, typing])

  const send = (raw: string) => {
    const t = raw.trim()
    if (!t || typing) return
    push({ who: 'me', text: t })
    setText('')
    setTyping(true)
    // A short pause so replies feel conversational.
    setTimeout(() => {
      let reply: Reply
      if (draft.current) {
        const r = mailStep(draft.current, t)
        draft.current = r.draft
        reply = r.reply
      } else if (isMailIntent(t)) {
        const r = startMail()
        draft.current = r.draft
        reply = r.reply
      } else {
        reply = answer(t)
      }
      setTyping(false)
      botSay(reply)
    }, 450)
  }

  return (
    <div className="chat">
      {open && (
        <section className="chat__panel glass" role="dialog" aria-label="Chat with the portfolio assistant">
          <header className="chat__head">
            <span className="chat__avatar">KR</span>
            <div><b>Ask about {profile.name.split(' ')[0]}</b><small className="mono">Portfolio assistant</small></div>
            <button className="chat__x" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </header>
          {/* data-lenis-prevent: let this box scroll natively instead of the page's smooth scroller. */}
          <div className="chat__list" ref={list} data-lenis-prevent aria-live="polite">
            {msgs.map((m) => (
              <div key={m.id} className={`chat__msg chat__msg--${m.who}`}>
                <p>{m.text}</p>
                {m.actions && (
                  <div className="chat__actions">
                    {m.actions.map((a) =>
                      a.href ? (
                        <a key={a.label} className="chat__chip" href={a.href} target={a.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">{a.label} ↗</a>
                      ) : (
                        <button key={a.label} className="chat__chip" onClick={() => send(a.say ?? a.label)}>{a.label}</button>
                      ),
                    )}
                  </div>
                )}
              </div>
            ))}
            {typing && <div className="chat__msg chat__msg--bot"><p className="chat__dots" aria-label="Typing"><i /><i /><i /></p></div>}
          </div>
          <form className="chat__form" onSubmit={(e) => { e.preventDefault(); send(text) }}>
            <input ref={input} value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask something…" aria-label="Your message" autoComplete="off" />
            <button type="submit" aria-label="Send" disabled={!text.trim() || typing}>↑</button>
          </form>
        </section>
      )}
      <button className="chat__fab glass glass--liquid" onClick={toggle} aria-expanded={open} aria-label={open ? 'Close chat' : 'Open chat'}>
        {open ? '×' : '✦'}
        {!open && <span>Ask me</span>}
      </button>
    </div>
  )
}
