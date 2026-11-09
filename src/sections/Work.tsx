import { useRef, type CSSProperties } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { projects } from '../data/portfolio'
import type { Project } from '../types'

function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <article className="proj glass" style={{ '--h': p.hue } as CSSProperties}>
      <div className="proj__top mono"><span>0{index + 1}</span><span>{p.period}</span></div>
      <div className="proj__visual"><b>{p.code}</b></div>
      <h3>{p.name}</h3>
      <h4>{p.subtitle}</h4>
      <p>{p.description}</p>
      <div className="chips">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
    </article>
  )
}

export default function Work() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.sec-label', { x: -30, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.sec-label', start: 'top 90%' } })

    // matchMedia = different animation per screen size. Desktop: pin + horizontal scroll. Mobile: simple reveal.
    const mm = gsap.matchMedia()

    mm.add('(min-width: 901px) and (min-height: 621px)', () => {
      const el = track.current!
      const dist = () => el.scrollWidth - innerWidth + 40
      // Moving the track sideways while the section is pinned = vertical scroll becomes horizontal movement.
      const h = gsap.to(el, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: '.work__pin', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true },
      })
      gsap.utils.toArray<HTMLElement>('.proj:not(.proj--end)').forEach((p) => {
        // containerAnimation lets an element's trigger follow the horizontal tween above.
        gsap.from(p.querySelector('.proj__visual b'), { xPercent: 40, rotate: 10, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: h, start: 'left 100%', end: 'right 30%', scrub: true } })
        gsap.from(p, { scale: 0.88, opacity: 0.4, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: h, start: 'left 110%', end: 'left 60%', scrub: true } })
      })
    })

    mm.add('(max-width: 900px), (max-height: 620px)', () => {
      gsap.utils.toArray<HTMLElement>('.proj').forEach((p) =>
        gsap.from(p, { y: 80, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: p, start: 'top 88%' } }))
    })

    return () => mm.revert()
  }, { scope: root })

  return (
    <section className="work" id="work" ref={root}>
      <div className="work__pin">
        <div className="work__head">
          <div className="sec-label mono"><span>03</span> Selected work</div>
          <h2 className="big">Projects<sup className="mono">(0{projects.length})</sup></h2>
          <p className="work__hint mono">Scroll → </p>
        </div>
        <div className="work__track" ref={track}>
          {projects.map((p, i) => <ProjectCard key={p.name} p={p} index={i} />)}
          <div className="proj proj--end"><h3>& more<br />in the works<span>.</span></h3></div>
        </div>
      </div>
    </section>
  )
}
