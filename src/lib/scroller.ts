// Tiny shared holder for the Lenis instance, so Nav/Contact links can call scrollTo
// without passing props through every component.
import type Lenis from 'lenis'

export const scroller: { lenis: Lenis | null } = { lenis: null }

export function scrollToTarget(hash: string) {
  const el = document.querySelector(hash)
  if (!el) return
  if (scroller.lenis) scroller.lenis.scrollTo(el as HTMLElement, { duration: 1.6 })
  else el.scrollIntoView({ behavior: 'smooth' })
}
