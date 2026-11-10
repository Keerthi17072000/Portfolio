// The chatbot's "brain". Pure functions (no React, no network): it matches the visitor's text
// against keywords and answers from src/data/portfolio.ts, so editing that file updates the bot too.
// It never uses pronouns for Keerthivasan; the name is used instead.
import { education, experience, profile, projects, skills } from '../data/portfolio'

export interface Action { label: string; say?: string; href?: string }
export interface Reply { text: string; actions?: Action[] }

export const STARTERS: Action[] = [
  { label: 'Who is Keerthivasan?', say: 'Who is Keerthivasan?' },
  { label: 'Skills & stack', say: 'What are the skills?' },
  { label: 'Experience', say: 'Tell me about the experience' },
  { label: 'Projects', say: 'Show the projects' },
  { label: 'Education', say: 'Tell me about the education' },
  { label: 'Contact details', say: 'How can I contact Keerthivasan?' },
  { label: '✉ Send a mail', say: 'Send a mail' },
]

const has = (q: string, re: RegExp) => re.test(q)

// ---------- Q&A ----------
export function answer(input: string): Reply {
  const q = input.toLowerCase().trim()

  if (has(q, /^(hi|hello|hey|yo|hola|good (morning|afternoon|evening))\b/)) {
    return { text: `Hi! I'm the portfolio assistant for ${profile.name}. Ask me anything, or pick a topic below.`, actions: STARTERS }
  }
  if (has(q, /\b(thanks|thank you|thx)\b/)) return { text: "You're welcome! Anything else you'd like to know?", actions: STARTERS.slice(0, 4) }

  // A specific project by name.
  const proj = projects.find((p) => q.includes(p.name.toLowerCase()))
  if (proj) {
    return { text: `${proj.name} — ${proj.subtitle} (${proj.period})\n${proj.description}\nTech: ${proj.tags.join(', ')}.`, actions: [{ label: 'All projects', say: 'Show the projects' }] }
  }

  if (has(q, /educat|college|degree|cgpa|certif|universit|study|studied|graduat/)) {
    return { text: education.map((e) => `• ${e.title} — ${e.institute} (${e.period}) · ${e.badgeLabel}: ${e.badge}`).join('\n') }
  }
  if (has(q, /skill|stack|tech|tool|language|framework|library|know|react|typescript|javascript|redux|css/)) {
    return { text: skills.map((s) => `${s.title}: ${s.items.join(', ')}`).join('\n') }
  }
  if (has(q, /experience|work|job|company|employer|navabrind|role|career|years/)) {
    return {
      text: `${experience.role} at ${experience.company} (${experience.period}).\n` + experience.points.map((p) => `• ${p}`).join('\n'),
      actions: [{ label: 'Projects', say: 'Show the projects' }],
    }
  }
  if (has(q, /project|built|build|portfolio|product|app\b/)) {
    return {
      text: projects.map((p) => `• ${p.name} — ${p.subtitle}`).join('\n') + '\n\nAsk about any of them by name for details.',
      actions: projects.slice(0, 4).map((p) => ({ label: p.name, say: p.name })),
    }
  }
  if (has(q, /where|location|based|live|city|country/)) return { text: `${profile.name} is based in ${profile.location.replace(' — IN', ', India')}.` }
  if (has(q, /contact|reach|email|mail id|linkedin|hire|hiring|available|availability|connect/)) {
    return {
      text: `You can reach ${profile.name} at ${profile.email}, or on LinkedIn. I can also draft and open an email for you right now.`,
      actions: [
        { label: '✉ Send a mail', say: 'Send a mail' },
        { label: 'LinkedIn', href: profile.linkedin },
      ],
    }
  }
  if (has(q, /who|about|yourself|introduc|summary|tell me|bio|profile/)) {
    return { text: `${profile.name} — ${profile.role}, based in ${profile.location.replace(' — IN', ', India')}.\n${profile.about}`, actions: STARTERS.slice(1, 5) }
  }

  return { text: "I can answer questions about skills, experience, projects, education and contact details, or help you send a mail. Try one of these:", actions: STARTERS }
}

// ---------- Mail flow ----------
// A tiny state machine. The component keeps the MailDraft; each user message calls mailStep().
export type MailStep = 'from' | 'to' | 'how' | 'body' | 'context' | 'confirm'
export interface MailDraft { step: MailStep; from?: string; to?: string; body?: string; subject?: string }

const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/

export const isMailIntent = (input: string) =>
  has(input.toLowerCase(), /(send|write|compose|draft|shoot|drop).{0,20}(mail|email|message)|\b(mail|email) (me|him|her|them|keerthi)|^(mail|email)\b/)

export function startMail(): { draft: MailDraft; reply: Reply } {
  return {
    draft: { step: 'from' },
    reply: { text: "Sure, let's set up a mail. First: what's your email address (the From)?\n(You can say “cancel” at any time.)" },
  }
}

// Writes a short, polite draft from a one-line context.
function writeDraft(context: string, from: string, toName: string): { subject: string; body: string } {
  const c = context.trim().replace(/[.\s]+$/, '')
  const lc = c.toLowerCase()
  let subject: string
  let middle: string
  if (/hire|hiring|job|position|opening|opportunit|role|recruit|interview/.test(lc)) {
    subject = 'Opportunity for a Frontend Developer role'
    middle = `I came across your portfolio and would like to talk about an opportunity: ${c}. Your React and TypeScript experience looks like a strong fit. Could we find a time to connect?`
  } else if (/collab|freelance|project|website|build|app|work together|contract/.test(lc)) {
    subject = 'Project collaboration'
    middle = `I'd like to discuss a project with you: ${c}. Please let me know if you're available and how you'd like to proceed.`
  } else {
    subject = 'Hello from your portfolio'
    middle = `I'm getting in touch about the following: ${c}. I'd be glad to hear your thoughts.`
  }
  return { subject, body: `Hi ${toName},\n\n${middle}\n\nThanks and regards,\n${from}` }
}

function confirmReply(d: MailDraft): Reply {
  const tail = `\n\n— Sent via the portfolio chatbot. Reply to: ${d.from}`
  const body = `${d.body}${tail}`
  const q = `to=${encodeURIComponent(d.to ?? '')}&su=${encodeURIComponent(d.subject ?? '')}&body=${encodeURIComponent(body)}`
  return {
    text: `Here's your draft:\n\nFrom: ${d.from}\nTo: ${d.to}\nSubject: ${d.subject}\n\n${d.body}\n\nOpen it in Gmail or your mail app, review it, and press Send.`,
    actions: [
      { label: 'Open in Gmail', href: `https://mail.google.com/mail/?view=cm&${q}` },
      { label: 'Open mail app', href: `mailto:${d.to}?subject=${encodeURIComponent(d.subject ?? '')}&body=${encodeURIComponent(body)}` },
      { label: 'Change message', say: 'Change message' },
    ],
  }
}

// Returns the next draft (null = flow finished/cancelled) and what the bot says.
export function mailStep(d: MailDraft, input: string): { draft: MailDraft | null; reply: Reply } {
  const text = input.trim()
  if (has(text.toLowerCase(), /^(cancel|stop|exit|quit|never ?mind|no thanks)\b/)) {
    return { draft: null, reply: { text: 'No problem, mail cancelled. Anything else I can help with?', actions: STARTERS.slice(0, 4) } }
  }

  switch (d.step) {
    case 'from':
      if (!EMAIL.test(text)) return { draft: d, reply: { text: "That doesn't look like an email address. Please enter yours, e.g. name@example.com." } }
      return {
        draft: { ...d, from: text, step: 'to' },
        reply: { text: `Got it. Who should it go to? Choose below, or type another email address.`, actions: [{ label: `${profile.name} (me)`, say: 'me' }] },
      }

    case 'to': {
      const toMe = has(text.toLowerCase(), /^(me|keerthi|keerthivasan|him|her|them|you)\b/)
      if (!toMe && !EMAIL.test(text)) return { draft: d, reply: { text: `Please type a valid email address, or choose “${profile.name} (me)”.` } }
      return {
        draft: { ...d, to: toMe ? profile.email : text, step: 'how' },
        reply: {
          text: 'Do you want to write the message yourself, or should I write it for you?',
          actions: [
            { label: "I'll write it", say: "I'll write it myself" },
            { label: 'Write it for me', say: 'Write it for me' },
          ],
        },
      }
    }

    case 'how':
      if (has(text.toLowerCase(), /for me|you write|you draft|draft it|compose it/) && !has(text.toLowerCase(), /myself/)) {
        return { draft: { ...d, step: 'context' }, reply: { text: 'Happy to. What is the mail about? Give me a line of context (e.g. “I want to discuss a React job opening”).' } }
      }
      return { draft: { ...d, step: 'body' }, reply: { text: 'Okay, type your message and I’ll prepare it.' } }

    case 'context': {
      const toName = d.to === profile.email ? profile.name.split(' ')[0] : 'there'
      const { subject, body } = writeDraft(text, d.from ?? '', toName)
      const next: MailDraft = { ...d, subject, body, step: 'confirm' }
      return { draft: next, reply: confirmReply(next) }
    }

    case 'body': {
      const next: MailDraft = { ...d, subject: 'Message from your portfolio', body: text, step: 'confirm' }
      return { draft: next, reply: confirmReply(next) }
    }

    case 'confirm':
      return {
        draft: { ...d, step: 'how' },
        reply: {
          text: 'Sure, let’s redo the message. Write it yourself, or should I write it?',
          actions: [
            { label: "I'll write it", say: "I'll write it myself" },
            { label: 'Write it for me', say: 'Write it for me' },
          ],
        },
      }
  }
}
