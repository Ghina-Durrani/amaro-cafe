import { BookOpen } from 'lucide-react'
import { Section } from './ui'
import { Picture, InteriorScene, BaristaScene, Stamp } from './Art'
import { scrollToId } from '../lib/scroll'

export default function Story() {
  return (
    <Section id="our-story" className="overflow-hidden bg-terracotta text-cream">
      <div className="grain absolute inset-0" aria-hidden="true" />
      <div className="wrap relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <span data-reveal className="label inline-flex items-center gap-2 rounded-full border border-cream/40 px-3 py-1.5"><BookOpen size={13} />Our Heritage</span>
          <h2 data-reveal className="mt-4 text-h2 font-bold">More Than Just<br /><span className="font-normal italic text-caramel">A Daily Cup.</span></h2>
          <p data-reveal className="mx-auto mt-5 max-w-xl text-lead text-cream/90 lg:mx-0">
            Founded in 1974 on a simple belief: coffee isn’t hurried fuel, it’s a small ritual of contemplation and connection. When Marco and Claudia Amaro opened their modest roastery, they set out to keep analog temperature extraction and quiet hospitality alive.
          </p>
          <p data-reveal className="mx-auto mt-4 max-w-xl text-body text-cream/80 lg:mx-0">
            Five decades later we still follow the same slow, wood-fired drum roast, hand-thrown clay cups and conversations that stretch across warm wooden booths well past sundown.
          </p>
          <div data-reveal className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:justify-center lg:justify-start">
            <div className="w-24 shrink-0 text-cream"><Stamp id="st2" top="MADE WITH LOVE" bottom="SINCE 1974" middle="♥" /></div>
            <div className="text-center sm:text-left">
              <p className="font-serif text-2xl font-bold">50+ Years of Craft</p>
              <p className="mt-1 text-sm text-cream/75">Unchanged roasting parameters. Uncompromising soul.</p>
            </div>
          </div>
          <div data-reveal className="mt-8">
            <a href="#visit" onClick={(e) => { e.preventDefault(); scrollToId('visit') }} className="btn-light">Discover Our Story</a>
          </div>
        </div>

        {/* layered pictures: everything is sized in % so the overlap never breaks */}
        <div data-reveal className="relative mx-auto aspect-[1/1.02] w-full max-w-xl sm:aspect-[4/3.4] lg:aspect-[1/1.02]">
          <figure className="absolute right-0 top-0 h-[72%] w-[80%] border-2 border-ink bg-paper p-1.5 shadow-press-dark sm:p-2">
            <div className="h-full w-full overflow-hidden"><Picture name="interior" alt="Warm wood-paneled 1970s interior with vintage booths and globe lamps"><InteriorScene /></Picture></div>
            <figcaption className="label absolute -bottom-3 right-3 z-20 rounded-sm bg-cream px-2 py-1 text-[0.55rem] text-espresso sm:right-4 sm:text-label">The Milan Parlour Salon · 1974</figcaption>
          </figure>
          <figure className="absolute bottom-0 left-0 h-[46%] w-[52%] -rotate-3 border-2 border-ink bg-paper p-1.5 shadow-press-dark sm:p-2">
            <div className="h-full w-full overflow-hidden"><Picture name="barista" alt="Barista pouring steamed milk into a terracotta cup"><BaristaScene /></Picture></div>
          </figure>
        </div>
      </div>
    </Section>
  )
}
