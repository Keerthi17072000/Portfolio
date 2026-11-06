import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

export default function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    // scrub: tween progress is tied to scroll position (0 → page end)
    gsap.to(ref.current, { scaleX: 1, ease: 'none', scrollTrigger: { scrub: 0.2, start: 0, end: 'max' } })
  }, [])
  return <div className="progress" ref={ref} />
}
