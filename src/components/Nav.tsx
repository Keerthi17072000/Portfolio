import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import MagneticLink from './MagneticLink'

const links = [['#about', 'About'], ['#skills', 'Skills'], ['#work', 'Work'], ['#experience', 'Experience']]

export default function Nav({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)

  // Hide under the loader, then drop in when `ready` flips to true.
  useGSAP(() => { gsap.set(ref.current, { yPercent: -100, opacity: 0 }) }, [])
  useGSAP(() => {
    if (ready) gsap.to(ref.current, { yPercent: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.3 })
  }, { dependencies: [ready] })

  // Scroll reactions use classList/tweens, not React state, to avoid re-rendering on every scroll tick.
  useGSAP(() => {
    let hidden = false
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (s) => {
        ref.current?.classList.toggle('is-solid', s.scroll() > 80)
        // Hide when scrolling down, show when scrolling up. GSAP owns the transform, so tween it (a CSS class would be overridden).
        const shouldHide = s.direction === 1 && s.scroll() > 400
        if (shouldHide !== hidden && s.scroll() > 0) {
          hidden = shouldHide
          gsap.to(ref.current, { yPercent: hidden ? -110 : 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
        }
      },
    })
  }, [])

  return (
    <header className="nav" ref={ref}>
      <MagneticLink href="#hero" className="nav__logo">KR<em>.</em></MagneticLink>
      <nav className="nav__links">
        {links.map(([href, label]) => <MagneticLink key={href} href={href}>{label}</MagneticLink>)}
        <MagneticLink href="#contact" className="nav__cta">Let’s talk</MagneticLink>
      </nav>
    </header>
  )
}
