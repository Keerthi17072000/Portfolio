import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

// 1) SVG filter used by `.glass--liquid`. feTurbulence makes smooth noise; feDisplacementMap
//    uses it to shift pixels, so whatever is *behind* the glass looks bent like thick liquid glass.
//    Only Chromium supports url() filters in backdrop-filter; other browsers get the plain blur.
export function GlassFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="liquid-glass" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.014" numOctaves="2" seed="4" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="34" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}

// 2) Slow-drifting colour blobs fixed behind the page. Glass needs something colourful behind it to look like glass.
// Each blob sits in a layer that GSAP moves on scroll (parallax); the blob inside keeps its own
// CSS drift animation, so the two transforms never fight over the same element.
export function Ambient() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // vh travel per blob: different distances = different speeds = depth.
      const travel: Record<string, number> = { '.l1': -35, '.l2': -60, '.l3': -20 }
      Object.entries(travel).forEach(([sel, y]) => {
        gsap.to(sel, { y: `${y}vh`, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1 } })
      })
    })
  }, { scope: root })

  return (
    <div className="ambient" aria-hidden="true" ref={root}>
      <div className="ambient__layer l1"><i className="ambient__blob b1" /></div>
      <div className="ambient__layer l2"><i className="ambient__blob b2" /></div>
      <div className="ambient__layer l3"><i className="ambient__blob b3" /></div>
    </div>
  )
}
