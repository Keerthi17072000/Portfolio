// Splitting text in JSX (instead of editing the DOM by hand) keeps React in control.
// Each letter/word becomes its own span that GSAP can animate.
import type { ReactNode } from 'react'

export function SplitChars({ text }: { text: string }) {
  return <>{[...text].map((c, i) => <span key={i} className="char">{c}</span>)}</>
}

export function SplitWords({ text }: { text: string }) {
  return <>{text.trim().split(/\s+/).map((w, i) => <span key={i} className="w">{w}</span>)}</>
}

// Headline whose text slides up from behind a mask when scrolled into view.
export function RevealHeading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`big reveal-lines ${className}`}>
      <span className="line"><span className="rl">{children}</span></span>
    </h2>
  )
}
