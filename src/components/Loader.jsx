import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/scroll'
import { photos } from '../data/images'

/** Full-screen loader with a real progress bar (fonts + page load + hero photo). */
export default function Loader({ onFinish }) {
  const [pct, setPct] = useState(0)
  const [gone, setGone] = useState(false)
  const root = useRef(null)

  useEffect(() => {
    let fonts = false, load = document.readyState === 'complete', photo = !photos.hero, min = false
    let target = 0, shown = 0, raf, finished = false
    const update = () => { target = (fonts ? 35 : 0) + (load ? 35 : 0) + (photo ? 15 : 0) + (min ? 15 : 0) }

    Promise.all([
      document.fonts.load('700 1em "Fraunces Variable"'),
      document.fonts.load('italic 400 1em "Fraunces Variable"'),
      document.fonts.load('400 1em "DM Sans Variable"'),
    ]).catch(() => {}).finally(() => { fonts = true; update() })
    if (!load) window.addEventListener('load', () => { load = true; update() }, { once: true })
    if (photos.hero) {
      const img = new Image()
      img.onload = img.onerror = () => { photo = true; update() }
      img.src = photos.hero
    }
    const t1 = setTimeout(() => { min = true; update() }, 1000)
    const t2 = setTimeout(() => { fonts = load = photo = min = true; update() }, 8000) // never hang

    const finish = () => {
      if (finished) return
      finished = true
      onFinish()
      gsap.to(root.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut', delay: 0.15, onComplete: () => setGone(true) })
    }
    const loop = () => {
      // ease toward real progress, with a gentle creep so it never looks frozen
      const goal = Math.max(target, Math.min(shown + 0.2, 90))
      shown += (Math.min(goal, 100) - shown) * 0.1
      if (target >= 100 && shown > 99.4) { shown = 100; setPct(100); finish(); return }
      setPct(Math.round(shown))
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2) }
  }, [onFinish])

  if (gone) return null
  return (
    <div ref={root} role="status" aria-live="polite" aria-label={`Loading ${pct}%`}
      className="fixed inset-0 z-[100] grid place-items-center bg-forest-deep px-6 text-cream">
      <div className="flex w-full max-w-xs flex-col items-center text-center">
        <svg viewBox="0 0 120 110" className="w-28 sm:w-32" aria-hidden="true">
          <defs>
            <clipPath id="ld"><path d="M22 40h66c0 30-15 48-33 48S22 70 22 40z" /></clipPath>
          </defs>
          <path d="M22 40h66c0 30-15 48-33 48S22 70 22 40z" fill="none" stroke="#F3E5CA" strokeWidth="3" />
          <path d="M88 46c18-2 18 22 0 24" fill="none" stroke="#F3E5CA" strokeWidth="3" strokeLinecap="round" />
          <g clipPath="url(#ld)"><rect x="0" y={92 - pct * 0.54} width="120" height="70" fill="#C8874C" /></g>
          <path d="M40 28c-4-6 4-8 0-16M55 28c-4-6 4-8 0-16M70 28c-4-6 4-8 0-16" stroke="#F3E5CA" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".7" className="animate-steam" />
        </svg>
        <p className="mt-6 font-serif text-3xl font-bold">Amaro Café</p>
        <p className="label mt-1 text-caramel">Brewing your table</p>
        <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-cream/15">
          <div className="h-full rounded-full bg-caramel" style={{ width: `${pct}%` }} />
        </div>
        <p className="label mt-3 tabular-nums text-cream/70">{pct}%</p>
      </div>
    </div>
  )
}
