import { useEffect, useState } from 'react'
import { ScrollTrigger } from './lib/gsap'
import { scroller } from './lib/scroller'
import { useLenis } from './hooks/useLenis'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Cursor from './components/Cursor'
import { Ambient, GlassFilter } from './components/GlassEffects'
import { useGlassGlow } from './hooks/useGlassGlow'
import ProgressBar from './components/ProgressBar'
import Hero from './sections/Hero'
import Marquee from './sections/Marquee'
import About from './sections/About'
import Skills from './sections/Skills'
import Work from './sections/Work'
import Experience from './sections/Experience'
import Education from './sections/Education'
import Contact from './sections/Contact'

export default function App() {
  // `ready` flips to true when the loader finishes → children start their intro animations.
  const [ready, setReady] = useState(false)
  useLenis()
  useGlassGlow()

  // Lock scrolling while loading.
  useEffect(() => {
    document.body.classList.toggle('loading', !ready)
    if (ready) scroller.lenis?.start()
  }, [ready])

  // Fonts/images change layout height; tell ScrollTrigger to re-measure.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    addEventListener('load', refresh)
    return () => removeEventListener('load', refresh)
  }, [])

  return (
    <>
      <GlassFilter />
      <Ambient />
      <Loader onDone={() => setReady(true)} />
      <ProgressBar />
      <Cursor />
      <div className="grain" />
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Education />
      </main>
      <Contact />
    </>
  )
}
