import { useEffect, useLayoutEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, ArrowDown, Coffee, Sprout, BadgeCheck } from 'lucide-react'
import { gsap, prefersReducedMotion, scrollToId } from '../lib/scroll'
import { HeroCup, Picture, Stamp } from './Art'

export default function Hero({ ready }) {
  const root = useRef(null)
  const tl = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      gsap.set('[data-line] > span', { yPercent: 115 })
      gsap.set('[data-cup]', { scale: 0.86, opacity: 0, y: 40, rotate: -4 })
      gsap.set('[data-pop]', { scale: 0, opacity: 0 })
      gsap.set('[data-fade]', { opacity: 0, y: 16 })
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: 'power3.out' } })
        .to('[data-fade="1"]', { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 })
        .to('[data-line] > span', { yPercent: 0, duration: 1.1, stagger: 0.14 }, '-=0.5')
        .to('[data-cup]', { scale: 1, opacity: 1, y: 0, rotate: 0, duration: 1.3, ease: 'expo.out' }, '-=0.9')
        .to('[data-pop]', { scale: 1, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(2)' }, '-=0.7')
        .to('[data-fade="2"]', { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, '-=0.6')

      // gentle 3D tilt that follows the mouse (desktop with a real pointer only)
      const mm = gsap.matchMedia()
      mm.add('(pointer: fine) and (min-width: 1024px)', () => {
        const el = root.current.querySelector('[data-tilt]')
        gsap.set(el, { transformPerspective: 900 })
        const ry = gsap.quickTo(el, 'rotationY', { duration: 0.9, ease: 'power3' })
        const rx = gsap.quickTo(el, 'rotationX', { duration: 0.9, ease: 'power3' })
        const move = (e) => {
          const r = root.current.getBoundingClientRect()
          ry(((e.clientX - r.left) / r.width - 0.5) * 14)
          rx(-((e.clientY - r.top) / r.height - 0.5) * 10)
        }
        const leave = () => { ry(0); rx(0) }
        root.current.addEventListener('mousemove', move)
        root.current.addEventListener('mouseleave', leave)
        return () => { root.current?.removeEventListener('mousemove', move); root.current?.removeEventListener('mouseleave', leave) }
      })
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => { if (ready) tl.current?.play() }, [ready])

  return (
    <section id="top" ref={root} className="relative isolate overflow-hidden bg-forest text-cream">
      <div className="hero-glow absolute inset-0 -z-10" aria-hidden="true" />
      <div className="grain absolute inset-0 -z-10 opacity-60 mix-blend-overlay" aria-hidden="true" />

      <div className="wrap flex min-h-[100svh] flex-col justify-between gap-10 pb-8 pt-28 sm:pt-32 lg:pb-10 lg:pt-36">
        <div className="grid items-center gap-y-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-x-6">
          {/* ------- headline column ------- */}
          <div className="text-center lg:text-left">
            <div data-fade="1" className="label flex items-center justify-center gap-3 text-caramel lg:justify-start">
              <span className="rule max-w-12 lg:hidden" />A Little Moment of Magic<span className="rule max-w-12" />
            </div>
            <p data-fade="1" className="mt-3 font-serif text-xl font-semibold sm:text-2xl">Amaro Café</p>
            <p data-fade="1" className="mt-1 text-sm italic text-cream/75 sm:text-base">Crafted slowly. Enjoyed endlessly.</p>

            <h1 className="mt-7 font-bold uppercase text-hero lg:mt-10 lg:text-[clamp(3.4rem,6.3vw,6.25rem)]">
              <span data-line className="block overflow-hidden pb-[0.06em]"><span className="block">Good Coffee.</span></span>
              <span data-line className="block overflow-hidden pb-[0.1em]"><span className="block font-normal normal-case italic text-caramel">Old Soul.</span></span>
            </h1>

            <p data-fade="2" className="mx-auto mt-6 max-w-md text-body text-cream/80 lg:mx-0">
              Amaro creates warm, inspiring spaces where community, craftsmanship and quality coffee meet.
            </p>
          </div>

          {/* ------- cup column ------- */}
          <div className="relative mx-auto w-full max-w-[min(88vw,28rem)] lg:max-w-none lg:-ml-8">
            <div data-tilt className="relative">
              <div data-cup className="relative mx-auto w-[88%] max-w-[26rem] lg:w-full">
                <div className="animate-bob">
                  <Picture name="hero" alt="Terracotta cappuccino cup with rosetta latte art on a saucer" fit="contain" className="aspect-[480/440]">
                    <HeroCup className="block h-full w-full" />
                  </Picture>
                </div>
              </div>
              {/* stamps are anchored to the cup so they always stay aligned */}
              <div data-pop className="absolute -top-2 left-0 w-[24%] max-w-[6.5rem] text-cream sm:left-2 lg:-left-2 lg:top-2">
                <Stamp id="h1" top="TORREFAZIONE" bottom="MILANO DOC" middle="1974" />
              </div>
              <div data-pop className="absolute right-0 top-[6%] grid aspect-square w-[22%] max-w-[6rem] rotate-6 place-items-center rounded-full border-2 border-dashed border-cream/70 bg-terracotta p-2 text-center text-cream shadow-press-dark-sm sm:right-2">
                <span className="flex flex-col items-center gap-0.5 text-[0.5rem] font-bold uppercase leading-tight tracking-wider sm:text-[0.6rem]">
                  <BadgeCheck className="h-4 w-4 sm:h-5 sm:w-5" />Slow Roast<br />Certified
                </span>
              </div>
            </div>
            <div data-fade="2" className="mt-4 flex flex-wrap items-center justify-center gap-2 text-cream">
              <span className="label inline-flex items-center gap-1.5 rounded-full border border-cream/30 bg-forest-deep/60 px-3 py-1.5"><Coffee size={13} className="text-caramel" />House Roast No. 7 · Milano</span>
              <span className="label inline-flex items-center gap-1.5 rounded-full border border-cream/30 bg-forest-deep/60 px-3 py-1.5"><Sprout size={13} className="text-caramel" />Heirloom Typica</span>
            </div>
          </div>
        </div>

        {/* ------- bottom row ------- */}
        <div data-fade="2" className="grid items-end gap-6 text-center md:grid-cols-3 md:text-left">
          <div className="hidden items-center gap-3 md:flex">
            <button aria-label="Jump to The Ritual" onClick={() => scrollToId('ritual')} className="grid h-11 w-11 place-items-center rounded-full border border-cream/40 hover:bg-cream/10"><ArrowLeft size={18} /></button>
            <button aria-label="Jump to the Menu" onClick={() => scrollToId('menu')} className="grid h-11 w-11 place-items-center rounded-full border border-cream/40 hover:bg-cream/10"><ArrowRight size={18} /></button>
          </div>
          <div className="flex flex-col items-center gap-4">
            <a href="#menu" onClick={(e) => { e.preventDefault(); scrollToId('menu') }} className="btn-light">Explore Our Coffee</a>
            <a href="#ritual" onClick={(e) => { e.preventDefault(); scrollToId('ritual') }} className="label flex items-center gap-2 text-cream/70 hover:text-cream">
              Scroll to experience <ArrowDown size={14} className="animate-bounce" />
            </a>
          </div>
          <p className="font-serif text-base italic text-cream/80 md:text-right">Your cozy corner,<br />every single day.</p>
        </div>
      </div>
    </section>
  )
}
