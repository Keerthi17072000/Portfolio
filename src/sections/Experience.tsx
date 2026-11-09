import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { RevealHeading } from '../components/SplitText'
import { experience } from '../data/portfolio'

export default function Experience() {
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.sec-label', { x: -30, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.sec-label', start: 'top 90%' } })
    gsap.from('.rl', { yPercent: 115, rotate: 3, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.rl', start: 'top 90%' } })
    // The green rail grows as you scroll through the section.
    gsap.to('.exp__rail i', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.exp__wrap', start: 'top 60%', end: 'bottom 70%', scrub: true } })
    gsap.from('.exp__meta', { x: -40, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.exp__meta', start: 'top 85%' } })
    gsap.utils.toArray<HTMLElement>('.exp__list li').forEach((li) => {
      gsap.from(li, { y: 50, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: li, start: 'top 88%' } })
      // Grey → white as each line reaches the reading position.
      gsap.fromTo(li, { color: '#6b6b70' }, { color: '#f2f0ea', ease: 'none', scrollTrigger: { trigger: li, start: 'top 85%', end: 'top 50%', scrub: true } })
    })
  }, { scope: root })

  return (
    <section className="exp" id="experience" ref={root}>
      <div className="sec-label mono"><span>04</span> Experience</div>
      <RevealHeading>Where I’ve <i>built</i></RevealHeading>
      <div className="exp__wrap">
        <div className="exp__rail"><i /></div>
        <div className="exp__body">
          <div className="exp__meta">
            <span className="mono">{experience.period}</span>
            <h3>{experience.role}</h3>
            <h4>{experience.company}</h4>
          </div>
          <ul className="exp__list">
            {experience.points.map((t, i) => (
              <li key={i}><span className="mono">0{i + 1}</span>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
