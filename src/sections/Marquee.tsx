import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { marqueeItems } from '../data/portfolio'

export default function Marquee() {
  const track = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // The list is rendered twice, so sliding -50% loops seamlessly.
    const loop = gsap.to(track.current, { xPercent: -50, repeat: -1, duration: 28, ease: 'none' })
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (s) => {
        // Faster when you scroll fast, and it reverses with the scroll direction.
        const boost = 1 + Math.min(Math.abs(s.getVelocity()) / 300, 6)
        const dir = s.direction === 1 ? 1 : -1
        gsap.to(loop, { timeScale: dir * boost, duration: 0.3, overwrite: true })
        gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.3 })
      },
    })
  }, [])

  const items = [...marqueeItems, ...marqueeItems]
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee__track" ref={track}>
        {items.map((t, i) => (
          <span key={i} className="marquee__item"><span>{t}</span><i>✦</i></span>
        ))}
      </div>
    </section>
  )
}
