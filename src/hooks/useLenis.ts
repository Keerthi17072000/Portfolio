import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { scroller } from '../lib/scroller'

// Smooth scrolling. Lenis owns the scroll position; we tell ScrollTrigger on every
// scroll tick, and let GSAP's ticker drive Lenis' animation frame.
export function useLenis() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.09 })
    scroller.lenis = lenis
    lenis.stop() // locked until the loader finishes
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      scroller.lenis = null
    }
  }, [])
}
