# Learn: how this portfolio works

A study guide for the React + TypeScript + GSAP portfolio. Read it top to bottom once, then do the exercises at the end.

---

## 1. Run it

```bash
npm install        # download dependencies into node_modules
npm run dev        # dev server at http://localhost:5173 (hot reload)
npm run build      # type-check + production bundle into dist/
npm run lint       # ESLint
npm run preview    # serve the built dist/ locally
```

## 2. The tools and why each exists

| Tool | Job |
|---|---|
| **React** | Builds the UI from small reusable *components*. |
| **TypeScript** | JavaScript + types; catches mistakes (typos, missing props) before the browser runs. |
| **Vite** | Dev server + bundler. Turns `.tsx` into plain JS the browser understands. |
| **GSAP** | The animation engine (tweens, timelines). |
| **ScrollTrigger** | GSAP plugin: starts/scrubs/pins animations based on scroll position. |
| **@gsap/react (`useGSAP`)** | Makes GSAP behave properly inside React (automatic cleanup). |
| **Lenis** | Smooth, inertial scrolling. |

## 3. The flow, from page load to pixels

```
index.html              <div id="root"></div> + <script src="/src/main.tsx">
   │
src/main.tsx            registers GSAP plugins, loads CSS, mounts <App/> into #root
   │
src/App.tsx             owns `ready` state, starts Lenis, renders every piece in order
   ├─ Loader            counts 0→100%, lifts away, calls onDone() → App sets ready = true
   ├─ ProgressBar, Cursor, grain overlay, Nav
   └─ sections: Hero → Marquee → About → Skills → Work → Experience → Education → Contact
                    ▲
        all text comes from src/data/portfolio.ts (typed by src/types.ts)
```

Timeline of what you see:
1. Page loads. Body is locked (`loading` class) and Lenis is stopped.
2. `Loader` runs its GSAP timeline. Near the end it calls `onDone`.
3. `App` sets `ready = true` → `Hero` and `Nav` see the new prop and play their intros; Lenis starts, so you can scroll.
4. As you scroll, each section's ScrollTriggers fire (reveals, scrubs, the pinned horizontal row).

## 4. Folder map

```
src/
  main.tsx          entry point
  App.tsx           page composition + global state (ready)
  types.ts          TypeScript interfaces (Project, SkillGroup…)
  data/portfolio.ts all resume content  ← edit text here
  lib/
    gsap.ts         registers plugins, re-exports gsap/ScrollTrigger/useGSAP
    scroller.ts     shared Lenis instance + scrollToTarget()
  hooks/
    useLenis.ts     smooth scrolling setup
    useMagnetic.ts  magnetic-hover behaviour
  components/       small reusable pieces (Loader, Nav, Cursor, Counter, SplitText…)
  sections/         one file per page section
  styles/index.css  all styling (design tokens at the top in :root)
legacy-static/      the original plain HTML/CSS/JS version, kept for comparison
```

## 5. React concepts, as used here

**Component** — a function that returns JSX (HTML-like syntax). `function Hero() { return <section>…</section> }`. Components are used like tags: `<Hero />`.

**Props** — inputs to a component. `<Hero ready={ready} />` passes `ready`; inside, `function Hero({ ready }: { ready: boolean })`. TypeScript checks the type.

**State** — memory that, when changed, re-renders the component. In `App`: `const [ready, setReady] = useState(false)`. Calling `setReady(true)` re-renders `App` and passes the new `ready` down.

**Lists with `.map()` and `key`** — `skills.map(g => <article key={g.title}>…</article>)`. The `key` lets React track each item. This is why content lives in `data/portfolio.ts` instead of being copy-pasted into HTML.

**Refs (`useRef`)** — a handle to a real DOM element: `const root = useRef(null)` then `<section ref={root}>`. GSAP needs real elements, so refs are how React hands them over.

**Effects (`useEffect`)** — code that runs *after* render, for things outside React (timers, listeners, Lenis). Return a function to clean up. See `useLenis.ts`.

**Custom hooks** — your own functions starting with `use` that bundle logic: `useLenis()`, `useMagnetic()`. They keep components short.

**Rules of hooks** — only call hooks at the top level of a component/hook, never inside `if` or loops.

**StrictMode** — in dev, React mounts components twice to expose cleanup bugs. That's why every animation must be cleaned up (next section).

## 6. GSAP + React: the one thing to understand

GSAP changes the DOM directly. React also manages the DOM. To avoid fights:

1. **Create animations after the element exists** — inside `useGSAP`, which runs after render.
2. **Scope selectors** — `useGSAP(() => {...}, { scope: root })` means `'.fact'` only matches elements *inside this section*.
3. **Clean up** — `useGSAP` reverts every tween and ScrollTrigger created inside when the component unmounts (or when dependencies change). Without it, StrictMode would create duplicates.
4. **Dependencies** — `useGSAP(fn, { dependencies: [ready] })` re-runs when `ready` changes. That's how `Hero` waits for the loader.
5. **Don't animate through React state** on scroll (it'd re-render 60×/second). GSAP writes styles directly; React just renders the structure once.

Core GSAP vocabulary:
- `gsap.to(el, {x: 100})` animate *to* values; `gsap.from(...)` *from* values to the current look; `gsap.set(...)` instantly apply.
- `stagger: 0.1` offsets each element's start.
- `ease` — acceleration curve (`expo.out` = fast start, soft landing).
- `gsap.timeline()` — sequence tweens; position parameter (`'-=0.6'`) overlaps them.
- `gsap.quickTo` — super-fast repeated updates (cursor, magnetic).

ScrollTrigger vocabulary:
- `trigger` the element watched; `start: 'top 80%'` = when trigger's top hits 80% down the viewport.
- `scrub: true` ties animation progress to scroll position (no fixed duration).
- `pin: true` holds an element in place while scrolling continues.
- `containerAnimation` lets triggers follow a *horizontal* tween.
- `gsap.matchMedia()` runs different animations per screen size and reverts on change.

Lenis ↔ ScrollTrigger: Lenis changes the scroll position smoothly, so in `useLenis.ts` we call `ScrollTrigger.update` on each Lenis scroll event and let GSAP's ticker drive Lenis (`gsap.ticker.add`).

## 7. Animation-by-animation walkthrough

| Where | What you see | How |
|---|---|---|
| `Loader.tsx` | Counter 0→100, curtain lifts | One timeline: tween a number → fade text → `yPercent: -100`; `onDone` fires mid-lift. |
| `Hero.tsx` | Name letters rise in | `SplitChars` renders one `<span class="char">` per letter; they start at `yPercent:120` (set on mount) and tween to 0 when `ready`. The `.line` wrapper has `overflow:hidden` = the mask. |
| `Hero.tsx` | Title fades/shrinks on scroll, glowing orbs drift | `scrub: true` tweens from `top top` to `bottom top` of the hero. |
| `Marquee.tsx` | Endless text strip reacting to scroll speed | Looping `xPercent:-50` tween over a doubled list; ScrollTrigger's `getVelocity()` changes `timeScale`. |
| `About.tsx` | Paragraph lights up word by word | Words start at `opacity:.14` (CSS); scrubbed tween to 1 with `stagger`. |
| `Counter.tsx` | Numbers count up | Tween a plain object `{v}` and write `Math.round(v)` into the element each update. |
| `Skills.tsx` | Cards tilt/slide up | `from` with `rotateX`, `stagger`, triggered once at `top 85%`. |
| `Work.tsx` | Projects slide sideways while page is pinned | `pin` the wrapper, tween the track's `x` by `-(trackWidth - viewport)`, `end` = same distance, so scroll distance ≈ travel distance. Per-card effects use `containerAnimation`. Mobile gets a simple reveal via `matchMedia`. |
| `Experience.tsx` | Green rail grows; lines go grey→white | Scrubbed `scaleY` and scrubbed `color` fromTo. |
| `Contact.tsx` | Huge ghost text parallax, rounded top corners flatten | Scrubbed `yPercent` and `borderRadius`. |
| `Nav.tsx` | Hides on scroll down, returns on scroll up | `ScrollTrigger.onUpdate` checks `direction`, tweens `yPercent`. |
| `Cursor.tsx`, `useMagnetic.ts` | Custom dot, magnetic buttons | `quickTo` follows the mouse; `mouseover` delegation grows the dot over links/cards. |

### Parallax (depth on scroll)

Parallax = layers moving at different speeds, which our eyes read as depth.
- `useParallax(root)` (`hooks/useParallax.ts`) finds every `data-parallax="N"` element in a section and scrubs its `yPercent` from `-N` to `+N` while it crosses the viewport. Bigger N = faster drift. Add the attribute to any element to use it.
- The fixed colour blobs (`Ambient` in `GlassEffects.tsx`) each travel a different distance over the whole page. GSAP moves a *wrapper* layer because the blob inside already has a CSS `drift` animation on `transform`; two things writing the same property would fight.
- `gsap.matchMedia()` turns it off for `prefers-reduced-motion` and halves the travel on phones.

### Chatbot

- `lib/chatbot.ts` is the brain: plain functions, no React. `answer(text)` matches keywords (regex) and builds replies from `data/portfolio.ts`, so editing your data updates the bot. Add a new topic by adding one `if (has(q, /keyword/))` branch.
- The mail flow is a small **state machine**: `MailDraft.step` goes from → to → how → (context | body) → confirm. `mailStep(draft, input)` takes the current state plus the user's text and returns the next state plus the bot's reply. Mail is never sent silently: the bot opens a prefilled Gmail/`mailto:` draft and the visitor presses Send (a static site has no safe place to keep a mail/API key).
- `components/Chatbot.tsx` is the UI. `useRef` holds the draft (changing it shouldn't re-render); `useState` holds what is on screen. `data-lenis-prevent` lets the message list scroll natively inside the smooth-scrolling page.

## 8. TypeScript crash course (what you see in the code)

- `interface Project { name: string; hue: number }` — shape of an object.
- `projects: Project[]` — an array of those.
- `{ ready }: { ready: boolean }` — destructured props with their type.
- `useRef<HTMLDivElement>(null)` — ref to a specific element type.
- `as CSSProperties` — used once to allow a custom CSS variable (`--h`) in `style`.
- If you see a red squiggle: hover it; it usually says exactly which field/type is wrong.

## 9. CSS ideas worth knowing

- **Design tokens**: colors/fonts in `:root` (`--acc`, `--bg`). Change `--acc` to re-theme the entire site.
- **`clamp(min, fluid, max)`** for fluid font sizes/padding with no media queries.
- **Mask reveal**: parent `overflow:hidden` + child translated down = text appears to rise from nowhere.
- **`mix-blend-mode: difference`** on the cursor makes it visible on any background.
- **Grain**: an inline SVG noise texture, animated with `steps()`.

## 10. Exercises (do these to learn)

1. In `data/portfolio.ts`, change a project name. Watch it update instantly (hot reload).
2. Add a 7th project object. Does the heading count `(07)` update? Why?
3. Change `--acc` in `index.css` to a new color.
4. In `Skills.tsx`, change `stagger: 0.12` to `0.3`. What changes?
5. In `About.tsx`, change `ease: 'none'` in the scrubbed tween to `'power2.out'`. Why does scrubbing usually want `none`?
6. Make the marquee slower (`duration: 28` → `60`).
7. Add a new section component `Certificates.tsx`, add it in `App.tsx`, give it a `sec-label` reveal.
8. Remove `{ scope: root }` from one section and observe what breaks (hint: selectors like `.sec-label` now match everywhere).
9. Break something on purpose: remove the cleanup in `useMagnetic` and watch listeners pile up in StrictMode.
10. Write a new custom hook `useReducedMotion()` that returns a boolean, and use it to skip animations.

## 11. Glossary

- **JSX** — HTML-like syntax inside JavaScript.
- **Render** — React calling your component to figure out what the UI should be.
- **Mount / unmount** — component appears in / is removed from the page.
- **Tween** — one animation from A to B.
- **Timeline** — a sequence of tweens.
- **Scrub** — animation progress follows scroll position.
- **Pin** — fix an element while scrolling continues.
- **Parallax** — layers moving at different speeds.
- **Bundler** — tool (Vite) that combines your many files into optimized ones for the browser.
- **Hot reload (HMR)** — browser updates without a full refresh when you save.

## 12. What to learn next

React docs (react.dev) → *Thinking in React*, *Managing State*; GSAP docs (gsap.com) → *ScrollTrigger*, *Timeline*; MDN for CSS; then try rebuilding one section from scratch without looking.
