import type { AnchorHTMLAttributes } from 'react'
import { useMagnetic } from '../hooks/useMagnetic'
import { scrollToTarget } from '../lib/scroller'

// An <a> that is magnetic and, for "#section" hrefs, scrolls smoothly via Lenis.
export default function MagneticLink({ href = '', onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useMagnetic<HTMLAnchorElement>()
  return (
    <a
      ref={ref}
      href={href}
      onClick={(e) => {
        if (href.startsWith('#')) { e.preventDefault(); scrollToTarget(href) }
        onClick?.(e)
      }}
      {...rest}
    />
  )
}
