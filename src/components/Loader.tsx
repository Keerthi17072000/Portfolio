import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

// Full-screen counter. When it slides away it calls onDone so the page can start its intro.
export default function Loader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const [gone, setGone] = useState(false)

  useGSAP(() => {
    const num = root.current!.querySelector<HTMLElement>('.num')!
    const bar = root.current!.querySelector<HTMLElement>('.bar')!
    const o = { v: 0 }
    gsap.timeline({ onComplete: () => setGone(true) })
      .to(o, { v: 100, duration: 1.8, ease: 'power2.inOut',
        onUpdate: () => { num.textContent = String(Math.round(o.v)); bar.style.width = o.v + '%' } })
      .to('.loader__count, .loader__name', { opacity: 0, y: -40, duration: 0.5, ease: 'power2.in' })
      .to(root.current, { yPercent: -100, duration: 1, ease: 'expo.inOut' })
      .add(onDone, '-=0.6') // start the intro while the curtain is still lifting
  }, { scope: root })

  if (gone) return null
  return (
    <div className="loader" ref={root}>
      <div className="loader__count"><span className="num">0</span><small>%</small></div>
      <div className="loader__name">Keerthivasan R — Portfolio 2026</div>
      <div className="loader__bar"><i className="bar" /></div>
    </div>
  )
}
