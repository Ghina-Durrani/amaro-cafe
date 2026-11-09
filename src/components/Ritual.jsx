import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Flame, SlidersHorizontal } from 'lucide-react'
import { stages } from '../data/content'
import { gsap, prefersReducedMotion } from '../lib/scroll'
import { Section } from './ui'
import { Picture, BeansScene, GrindScene, PourScene, CupScene } from './Art'

const scenes = { beans: BeansScene, grind: GrindScene, pour: PourScene, cup: CupScene }
const STAGE_MS = 6

export default function Ritual() {
  const [i, setI] = useState(0)
  const [inView, setInView] = useState(false)
  const [paused, setPaused] = useState(false)
  const root = useRef(null), bar = useRef(null), text = useRef(null), tween = useRef(null)
  const s = stages[i]
  const next = () => setI((v) => (v + 1) % stages.length)
  const prev = () => setI((v) => (v - 1 + stages.length) % stages.length)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 })
    io.observe(root.current); return () => io.disconnect()
  }, [])

  // auto-advance with a visible progress bar (pauses on hover/focus, off-screen, reduced motion)
  useEffect(() => {
    if (prefersReducedMotion()) return
    gsap.set(bar.current, { scaleX: 0, transformOrigin: 'left' })
    tween.current = gsap.to(bar.current, { scaleX: 1, duration: STAGE_MS, ease: 'none', onComplete: next, paused: !inView || paused })
    return () => tween.current?.kill()
  }, [i]) // eslint-disable-line
  useEffect(() => { tween.current?.paused(!inView || paused) }, [inView, paused])

  useEffect(() => {
    if (prefersReducedMotion()) return
    gsap.fromTo(text.current.children, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out' })
  }, [i])

  return (
    <div ref={root}>
      <Section id="ritual" className="bg-terracotta text-cream">
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="wrap relative">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
            <div>
              <span data-reveal className="label inline-flex items-center gap-2 rounded-full border border-cream/40 px-3 py-1.5 text-cream"><SlidersHorizontal size={13} />The Ritual</span>
              <h2 data-reveal className="mt-4 text-h2 font-bold">Four Chapters of Every Cup</h2>
            </div>
            <div data-reveal>
              <p className="max-w-xl text-lead text-cream/85">True espresso extraction is an acoustic and tactile craft. Step through the stages that shape every pour at Amaro.</p>
              <div className="mt-5 h-1 overflow-hidden rounded-full bg-cream/20" aria-hidden="true"><div ref={bar} className="h-full origin-left bg-caramel" /></div>
            </div>
          </div>

          <div role="tablist" aria-label="Brewing stages" data-reveal className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stages.map((st, n) => (
              <button key={st.tab} role="tab" aria-selected={n === i} onClick={() => setI(n)}
                className={`rounded border p-3 text-left shadow-press-dark-sm transition sm:p-4 ${n === i ? 'border-caramel bg-terracotta-dark' : 'border-transparent bg-terracotta-deep/50 hover:bg-terracotta-dark/80'}`}>
                <span className="label block text-[0.6rem] text-cream/60">Stage 0{n + 1}</span>
                <span className="mt-1 block font-serif text-base font-semibold sm:text-lg">{st.tab}</span>
              </button>
            ))}
          </div>

          <div data-reveal onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
            className="mt-6 grid overflow-hidden rounded border-2 border-ink bg-paper text-espresso shadow-press-dark lg:mt-8 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden bg-parchment lg:aspect-auto lg:min-h-[28rem]">
              {stages.map((st, n) => {
                const Sc = scenes[st.scene]
                return (
                  <div key={st.scene} aria-hidden={n !== i} className={`absolute inset-0 transition-opacity duration-700 ${n === i ? 'opacity-100' : 'opacity-0'}`}>
                    <Picture name={st.scene} alt={st.title}><Sc /></Picture>
                  </div>
                )
              })}
              <span className="label absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-sm border border-espresso/40 bg-paper/95 px-2.5 py-1.5 text-espresso sm:left-4 sm:top-4"><Flame size={13} className="text-terracotta" />{s.chip}</span>
              <span className="label absolute bottom-3 left-3 rounded-sm bg-terracotta px-2.5 py-1.5 text-cream shadow-press-dark-sm sm:bottom-4 sm:left-4">{s.temp}</span>
            </div>

            <div className="flex flex-col p-5 sm:p-8 lg:p-10">
              <div ref={text} className="flex flex-1 flex-col">
                <div className="label flex items-center gap-3 text-terracotta"><span>{s.chapter}</span><span className="rule" /></div>
                <h3 className="mt-3 text-h3 font-bold text-terracotta-dark">{s.title}</h3>
                <p className="mt-3 text-body text-espresso/90">{s.desc}</p>
                <div className="mt-6 grid grid-cols-1 gap-3 xs:grid-cols-3">
                  {s.metrics.map(([k, v, w]) => (
                    <div key={k} className="rounded border border-espresso/25 bg-cream/60 p-3">
                      <span className="label block text-[0.58rem] text-espresso/70">{k}</span>
                      <span className="mt-1 block font-serif text-lg font-bold leading-tight text-terracotta-dark">{v}</span>
                      <div className="mt-2 h-1.5 rounded-full bg-espresso/15"><div className="h-full rounded-full bg-terracotta transition-[width] duration-1000" style={{ width: `${w}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between gap-3 border-t border-dotted border-espresso/40 pt-5">
                <button onClick={prev} className="btn-secondary !px-4"><ArrowLeft size={16} /><span className="hidden xs:inline">Previous</span></button>
                <span className="label text-espresso/60">{i + 1} / {stages.length}</span>
                <button onClick={next} className="btn-primary !px-4"><span className="hidden xs:inline">Next Step</span><ArrowRight size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
