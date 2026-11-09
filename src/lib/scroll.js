import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

let lenis = null

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Smooth scrolling that stays in sync with GSAP ScrollTrigger. */
export function initSmoothScroll() {
  if (prefersReducedMotion() || lenis) return () => {}
  lenis = new Lenis({ duration: 1.1, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (t) => lenis && lenis.raf(t * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

export function lockScroll(lock) {
  if (lenis) lock ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = lock ? 'hidden' : ''
}

export function scrollToId(id) {
  const el = id === 'top' ? null : document.getElementById(id)
  const offset = id === 'top' ? 0 : -72
  if (lenis) lenis.scrollTo(el ?? 0, { offset, duration: 1.2 })
  else if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

/** Subtle, staggered reveal for any element marked data-reveal inside `root`. */
export function revealOnScroll(root) {
  if (prefersReducedMotion()) return () => {}
  const ctx = gsap.context(() => {
    const items = root.querySelectorAll('[data-reveal]')
    gsap.set(items, { opacity: 0, y: 24 })
    ScrollTrigger.batch(items, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.09, overwrite: true }),
    })
  }, root)
  return () => ctx.revert()
}

export { gsap, ScrollTrigger }
