import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { SplitWords } from '../components/SplitText'
import Counter from '../components/Counter'
import { facts, profile } from '../data/portfolio'

export default function About() {
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.sec-label', { x: -30, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.sec-label', start: 'top 90%' } })
    // Scrubbed: each word fades in as you scroll — no time duration, scroll IS the timeline.
    gsap.to('.about__text .w', {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: '.about__text', start: 'top 80%', end: 'bottom 45%', scrub: true },
    })
    gsap.from('.fact', {
      y: 60, opacity: 0, duration: 1, stagger: 0.12, ease: 'expo.out',
      scrollTrigger: { trigger: '.about__facts', start: 'top 85%' },
    })
  }, { scope: root })

  return (
    <section className="about" id="about" ref={root}>
      <div className="sec-label mono"><span>01</span> About</div>
      <p className="about__text"><SplitWords text={profile.about} /></p>
      <div className="about__facts">
        {facts.map((f) => (
          <div className="fact" key={f.label}>
            {f.value !== undefined ? <Counter end={f.value} suffix={f.suffix} /> : <b>{f.text}</b>}
            <span>{f.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
