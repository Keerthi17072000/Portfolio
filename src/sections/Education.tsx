import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { education } from '../data/portfolio'

export default function Education() {
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.sec-label', { x: -30, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.sec-label', start: 'top 90%' } })
    gsap.from('.edu__card', { y: 100, opacity: 0, scale: 0.94, duration: 1.2, stagger: 0.18, ease: 'expo.out', scrollTrigger: { trigger: '.edu__grid', start: 'top 85%' } })
  }, { scope: root })

  return (
    <section className="edu" id="education" ref={root}>
      <div className="sec-label mono"><span>05</span> Education</div>
      <div className="edu__grid">
        {education.map((e) => (
          <article className="card edu__card" key={e.title}>
            <span className="mono">{e.period}</span>
            <h3>{e.title}</h3>
            <p>{e.institute}</p>
            <div className="cgpa"><b>{e.badge}</b><span className="mono">{e.badgeLabel}</span></div>
          </article>
        ))}
      </div>
    </section>
  )
}
