import type { RefObject } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

// Parallax: elements marked data-parallax="N" drift from -N to +N (% of their own height)
// while they cross the viewport, so they move at a different speed than the page.
// `scrub: true` ties progress to scroll position; only `transform` is animated.
export function useParallax(scope: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const mm = gsap.matchMedia()
    // Skip for reduced motion; halve the travel on phones to keep it subtle and cheap.
    mm.add(
      { full: '(prefers-reduced-motion: no-preference) and (min-width: 768px)', small: '(prefers-reduced-motion: no-preference) and (max-width: 767px)' },
      (ctx) => {
        const k = ctx.conditions?.full ? 1 : 0.5
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          const d = Number(el.dataset.parallax) * k
          gsap.fromTo(el, { yPercent: -d }, {
            yPercent: d, ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          })
        })
      },
    )
  }, { scope })
}
