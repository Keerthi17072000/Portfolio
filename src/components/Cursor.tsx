import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

// Custom cursor dot; grows over interactive things. Uses event delegation on document
// so we don't attach listeners to every link/card.
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return
    const el = ref.current!
    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' })
    const move = (e: MouseEvent) => { xTo(e.clientX); yTo(e.clientY) }
    const over = (e: MouseEvent) =>
      el.classList.toggle('is-hover', !!(e.target as HTMLElement).closest('a,.card,.proj'))
    addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    return () => { removeEventListener('mousemove', move); document.removeEventListener('mouseover', over) }
  }, [])
  return <div className="cursor" ref={ref}><span /></div>
}
