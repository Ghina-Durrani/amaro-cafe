import { Sprout, Timer, Hand, Disc3, ArrowUpRight } from 'lucide-react'
import { pillars } from '../data/content'
import { Section, Heading } from './ui'

const icons = { Sprout, Timer, Hand, Disc3 }

export default function WhyUs() {
  return (
    <Section id="why-us" className="bg-cream">
      <div className="grain absolute inset-0" aria-hidden="true" />
      <div className="wrap relative">
        <Heading eyebrow="I Quattro Valori" title={<span className="text-terracotta-dark">The Little Things Make It Special</span>} sub="Why our counter stays a second home to early-morning creators and evening philosophers." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {pillars.map((p) => {
            const Icon = icons[p.icon]
            return (
              <article key={p.n} data-reveal className="flex flex-col rounded border border-espresso/70 bg-paper transition hover:-translate-y-1 hover:shadow-press">
                <div className="flex-1 p-6">
                  <span className="font-serif text-5xl font-bold leading-none text-caramel/80">{p.n}</span>
                  <div className="label mt-4 flex items-center gap-2 text-olive"><Icon size={15} />{p.kicker}</div>
                  <h3 className="mt-3 text-card font-bold text-espresso">{p.title}</h3>
                  <p className="mt-2 text-body text-espresso/80">{p.desc}</p>
                </div>
                <div className="label flex items-center justify-between border-t border-dotted border-espresso/40 px-6 py-4 text-[0.6rem] text-terracotta">
                  {p.foot}<ArrowUpRight size={16} />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
