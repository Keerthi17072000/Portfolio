import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import MagneticLink from '../components/MagneticLink'
import { profile } from '../data/portfolio'

export default function Contact() {
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.sec-label', { x: -30, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.sec-label', start: 'top 90%' } })
    gsap.from('.contact__title .line > span', { yPercent: 110, duration: 1.4, stagger: 0.15, ease: 'expo.out', scrollTrigger: { trigger: '.contact__title', start: 'top 85%' } })
    gsap.from('.btn', { y: 40, opacity: 0, duration: 1, stagger: 0.12, ease: 'expo.out', scrollTrigger: { trigger: '.contact__links', start: 'top 90%' } })
    gsap.from('.contact__ghost', { yPercent: 40, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true } })
    gsap.from(root.current, { borderTopLeftRadius: 0, borderTopRightRadius: 0, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 50%', scrub: true } })
  }, { scope: root })

  return (
    <footer className="contact" id="contact" ref={root}>
      <div className="sec-label mono"><span>06</span> Contact</div>
      <h2 className="contact__title">
        <span className="line"><span>Let’s build</span></span>
        <span className="line"><span>something <i>great.</i></span></span>
      </h2>
      <div className="contact__links">
        <MagneticLink href={`mailto:${profile.email}`} className="btn"><span>{profile.email}</span><i>↗</i></MagneticLink>
        <MagneticLink href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn--ghost"><span>LinkedIn</span><i>↗</i></MagneticLink>
      </div>
      <div className="contact__foot mono">
        <span>© 2026 {profile.name}</span>
        <span>{profile.location.replace(' — IN', ', India')}</span>
        <MagneticLink href="#hero">Back to top ↑</MagneticLink>
      </div>
      <div className="contact__ghost" aria-hidden="true">KEERTHI</div>
    </footer>
  )
}
