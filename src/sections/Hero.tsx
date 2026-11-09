import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { SplitChars } from '../components/SplitText'
import Counter from '../components/Counter'
import { profile } from '../data/portfolio'

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)

  // 1) On mount: park everything off-screen (hidden behind the loader).
  // 2) Scroll effects that don't depend on the loader.
  useGSAP(() => {
    gsap.set('.hero__title .char', { yPercent: 120, rotate: 8 })
    gsap.set('.hero__meta > *, .hero__role, .hero__scroll, .hero__stat', { y: 30, opacity: 0 })

    const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
    gsap.to('.hero__title', { yPercent: -18, scale: 0.94, opacity: 0.2, ease: 'none', scrollTrigger: st })
    gsap.to('.orb1', { y: 200, x: -80, ease: 'none', scrollTrigger: st })
    gsap.to('.orb2', { y: -160, ease: 'none', scrollTrigger: st })
  }, { scope: root })

  // 3) When the loader finishes (`ready` becomes true) play the intro.
  useGSAP(() => {
    if (!ready) return
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .to('.hero__title .char', { yPercent: 0, rotate: 0, duration: 1.4, stagger: 0.04 })
      .to('.hero__meta > *', { y: 0, opacity: 1, duration: 1, stagger: 0.12 }, 0.2)
      .to('.hero__role, .hero__scroll, .hero__stat', { y: 0, opacity: 1, duration: 1.1, stagger: 0.1 }, 0.5)
  }, { scope: root, dependencies: [ready] })

  return (
    <section className="hero" id="hero" ref={root}>
      <div className="hero__orb orb1" />
      <div className="hero__orb orb2" />
      <div className="hero__meta">
        <span className="tag"><i className="dot" /> Available for new opportunities</span>
        <span className="mono">{profile.location}</span>
      </div>
      <h1 className="hero__title" aria-label={profile.name}>
        <span className="line"><SplitChars text="Keerthi" /></span>
        <span className="line"><SplitChars text="vasan" /><em className="char">.</em></span>
      </h1>
      <div className="hero__bottom">
        <p className="hero__role">
          <span className="mono">( {profile.role} )</span><br />
          React.js · TypeScript · Interfaces that feel <i>alive</i>.
        </p>
        <div className="hero__scroll mono"><span>Scroll</span><i className="hero__line" /></div>
        <div className="hero__stat">
          <Counter end={3} suffix="+" play={ready} />
          <span className="mono">Years<br />Experience</span>
        </div>
      </div>
    </section>
  )
}
