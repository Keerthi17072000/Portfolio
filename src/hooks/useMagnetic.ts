import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

// Element drifts toward the cursor while hovered, springs back on leave.
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useGSAP(() => {
    const el = ref.current
    if (!el || !matchMedia('(hover:hover) and (pointer:fine)').matches) return
    const mx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'elastic.out(1,.5)' })
    const my = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'elastic.out(1,.5)' })
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      mx((e.clientX - r.left - r.width / 2) * 0.3)
      my((e.clientY - r.top - r.height / 2) * 0.3)
    }
    const leave = () => { mx(0); my(0) }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [])
  return ref
}
