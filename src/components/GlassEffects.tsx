// 1) SVG filter used by `.glass--liquid`. feTurbulence makes smooth noise; feDisplacementMap
//    uses it to shift pixels, so whatever is *behind* the glass looks bent like thick liquid glass.
//    Only Chromium supports url() filters in backdrop-filter; other browsers get the plain blur.
export function GlassFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="liquid-glass" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.014" numOctaves="2" seed="4" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="34" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}

// 2) Slow-drifting colour blobs fixed behind the page. Glass needs something colourful behind it to look like glass.
export function Ambient() {
  return (
    <div className="ambient" aria-hidden="true">
      <i className="ambient__blob b1" /><i className="ambient__blob b2" /><i className="ambient__blob b3" />
    </div>
  )
}
