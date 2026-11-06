import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'

interface Props { end: number; suffix?: string; play?: boolean }

// Counts 0 → end. If `play` is given, it starts when play becomes true (used by the hero
// after the loader). Otherwise it starts once when scrolled into view.
export default function Counter({ end, suffix = '', play }: Props) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    const el = ref.current!
    const o = { v: 0 }
    const run = () =>
      gsap.to(o, { v: end, duration: 1.6, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v) + suffix } })
    if (play === undefined) {
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: run })
    } else if (play) {
      run()
    }
  }, { dependencies: [play] })

  return <b ref={ref}>0{suffix}</b>
}
