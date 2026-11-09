import { useEffect } from 'react'

// A soft specular highlight that follows the pointer across any `.glass` element.
//    One delegated listener sets --mx/--my CSS variables; CSS draws the highlight.
export function useGlassGlow() {
  useEffect(() => {
    if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return
    const move = (e: PointerEvent) => {
      const g = (e.target as Element).closest<HTMLElement>('.glass')
      if (!g) return
      const r = g.getBoundingClientRect()
      g.style.setProperty('--mx', `${e.clientX - r.left}px`)
      g.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    document.addEventListener('pointermove', move, { passive: true })
    return () => document.removeEventListener('pointermove', move)
  }, [])
}
