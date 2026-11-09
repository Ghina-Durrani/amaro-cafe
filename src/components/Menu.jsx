import { useEffect, useRef, useState } from 'react'
import { Coffee, Heart, Cookie, Flame, Snowflake, Star, ArrowRight, Milk } from 'lucide-react'
import { menu, filters } from '../data/content'
import { gsap, prefersReducedMotion, scrollToId } from '../lib/scroll'
import { Section, Heading } from './ui'
import { DrinkArt } from './Art'

const icons = { Coffee, Heart, Cookie, Flame, Snowflake, Star }
const tint = { espresso: '#F1D9AE', cappuccino: '#F0C9B2', latte: '#F6DDB0', mocha: '#E6C9A6', coldbrew: '#DCE3C0', signature: '#E7D9AC' }

export default function Menu() {
  const [f, setF] = useState('all')
  const grid = useRef(null)
  const items = menu.filter((m) => f === 'all' || m.cat === f)

  useEffect(() => {
    if (prefersReducedMotion()) return
    gsap.fromTo(grid.current.children, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out', clearProps: 'transform' })
  }, [f])

  return (
    <Section id="menu" className="bg-cream">
      <div className="grain absolute inset-0" aria-hidden="true" />
      <div className="wrap relative">
        <Heading eyebrow="Il Nostro Listino" title={<span className="text-terracotta-dark">A Menu Worth Savoring</span>} sub="Made with love. Served with character." />

        <div role="group" aria-label="Filter menu" data-reveal className="mt-8 flex flex-wrap justify-center gap-2">
          {filters.map((x) => (
            <button key={x.id} onClick={() => setF(x.id)} aria-pressed={f === x.id}
              className={`label min-h-[40px] rounded-full border px-4 py-2 transition ${f === x.id ? 'border-ink bg-terracotta text-cream shadow-press-dark-sm' : 'border-caramel/60 bg-paper text-caramel hover:border-caramel hover:text-terracotta'}`}>
              {x.label}
            </button>
          ))}
        </div>

        <div ref={grid} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((m) => {
            const Icon = icons[m.icon] ?? Coffee
            return (
              <article key={m.id} className="group relative flex flex-col overflow-hidden rounded border border-espresso bg-paper transition-transform duration-300 hover:-translate-y-1 hover:shadow-press">
                <div className="relative grid aspect-[16/10] place-items-center overflow-hidden" style={{ background: tint[m.art] }}>
                  <div className="absolute aspect-square w-[62%] rounded-full bg-paper/60" aria-hidden="true" />
                  <DrinkArt kind={m.art} className="relative h-[82%] w-auto transition-transform duration-500 group-hover:scale-105" />
                  {m.featured && <span className="label absolute left-3 top-3 -rotate-3 rounded-sm bg-terracotta px-2.5 py-1 text-cream shadow-press-dark-sm">House Signature</span>}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="label text-[0.6rem] text-olive">{m.tag}</span>
                    <span className="shrink-0 font-serif text-xl font-bold text-terracotta-dark">Rs. {m.price}</span>
                  </div>
                  <h3 className="mt-2 text-card font-bold text-espresso">{m.name}</h3>
                  <p className="mt-2 flex-1 text-body text-espresso/80">{m.desc}</p>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-dotted border-espresso/40 px-5 py-3">
                  <span className="label text-[0.58rem] text-espresso/60">Cup {m.cup}</span>
                  <span className="label inline-flex items-center gap-1.5 text-[0.6rem] text-terracotta"><span className="hidden xs:inline">{m.note}</span><Icon size={15} /></span>
                </div>
              </article>
            )
          })}
        </div>

        <div data-reveal className="mt-8 flex flex-col items-center justify-between gap-5 rounded border border-dashed border-espresso/40 bg-paper/60 p-4 text-center sm:flex-row sm:p-5 sm:text-left">
          <p className="flex items-start gap-3 text-sm text-espresso/85"><Milk size={18} className="mt-0.5 shrink-0 text-terracotta" />All milk alternatives (organic oat, crushed almond, whole dairy) are steamed fresh at no extra charge.</p>
          <a href="#visit" onClick={(e) => { e.preventDefault(); scrollToId('visit') }} className="btn-secondary shrink-0">Order at the bar <ArrowRight size={16} /></a>
        </div>
      </div>
    </Section>
  )
}
