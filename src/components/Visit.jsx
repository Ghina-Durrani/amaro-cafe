import { CircleCheck, MapPin, Mail } from 'lucide-react'
import { hours, perks } from '../data/content'
import { Section } from './ui'
import { Picture, BoothScene } from './Art'

export default function Visit() {
  return (
    <Section id="visit" className="bg-terracotta text-cream">
      <div className="grain absolute inset-0" aria-hidden="true" />
      <div className="wrap relative">
        <div className="grid items-end gap-5 lg:grid-cols-2 lg:gap-16">
          <div>
            <span data-reveal className="label text-caramel">Benvenuti a Casa</span>
            <h2 data-reveal className="mt-3 text-h2 font-bold">Your Table Is Waiting.</h2>
          </div>
          <p data-reveal className="max-w-lg text-lead text-cream/85">Walk in without pretense. Find a sunlit table beneath our archways, pick a vintage record and breathe easy.</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <figure data-reveal className="relative">
            <div className="relative aspect-[4/3] overflow-hidden border-2 border-ink bg-paper p-2 shadow-press-dark sm:p-3">
              <div className="h-full w-full overflow-hidden"><Picture name="booth" alt="Warm timber seating and archways inside Amaro Café"><BoothScene /></Picture></div>
              <div className="absolute right-4 top-4 rotate-3 border-2 border-dashed border-espresso bg-cream p-2 text-center text-espresso sm:right-6 sm:top-6">
                <span className="label block text-[0.5rem] sm:text-[0.6rem]">Milano Air Mail</span>
                <span className="block font-serif text-xl font-bold leading-none sm:text-2xl">20121</span>
                <span className="label block text-[0.5rem] sm:text-[0.6rem]">Centro Storico</span>
              </div>
            </div>
            <figcaption className="label mt-3 flex justify-between gap-4 text-[0.6rem] text-cream/80"><span>Fig. 12 — The Reading Booths</span><span>Architettura 1974</span></figcaption>
          </figure>

          <div data-reveal className="flex flex-col rounded border-2 border-ink bg-paper p-5 text-espresso shadow-press-dark sm:p-8">
            <span className="label text-olive">Physical Address</span>
            <p className="mt-2 flex items-start gap-2 font-serif text-3xl font-bold text-terracotta-dark"><MapPin className="mt-1.5 shrink-0" size={22} />42 Old Mill Lane</p>
            <p className="mt-1 pl-8 text-body">Heritage Quarter, Milan 20121</p>

            <span className="label mt-7 text-olive">Salon Schedule</span>
            <dl className="mt-2">
              {hours.map(([d, t]) => (
                <div key={d} className="flex flex-wrap justify-between gap-x-4 border-b border-dotted border-espresso/40 py-2.5 text-sm">
                  <dt className="font-bold">{d}</dt><dd className="text-espresso/80">{t}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 space-y-2.5">
              {perks.map((p) => <li key={p} className="flex items-start gap-2.5 text-sm"><CircleCheck size={18} className="mt-0.5 shrink-0 text-olive" />{p}</li>)}
            </ul>
            <a href="mailto:ciao@amarocafe.it" className="btn-primary mt-8 self-start"><Mail size={16} />Come say hello</a>
          </div>
        </div>
      </div>
    </Section>
  )
}
