import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { RevealHeading } from '../components/SplitText'
import { skills } from '../data/portfolio'

export default function Skills() {
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    const trigger = { trigger: '.skills__grid', start: 'top 85%' }
    gsap.from('.sec-label', { x: -30, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.sec-label', start: 'top 90%' } })
    gsap.from('.rl', { yPercent: 115, rotate: 3, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.rl', start: 'top 90%' } })
    gsap.from('.skill', { y: 120, opacity: 0, rotateX: -15, transformOrigin: '50% 100%', duration: 1.2, stagger: 0.12, ease: 'expo.out', scrollTrigger: trigger })
    gsap.from('.skill li', { x: -20, opacity: 0, duration: 0.8, stagger: 0.04, ease: 'power3.out', scrollTrigger: { trigger: '.skills__grid', start: 'top 70%' } })
  }, { scope: root })

  return (
    <section className="skills" id="skills" ref={root}>
      <div className="sec-label mono"><span>02</span> Toolkit</div>
      <RevealHeading>Skills &amp; <i>stack</i></RevealHeading>
      <div className="skills__grid">
        {skills.map((g, i) => (
          <article className="card skill glass" key={g.title}>
            <div className="mono card__n">/0{i + 1}</div>
            <h3>{g.title}</h3>
            <ul>{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  )
}
