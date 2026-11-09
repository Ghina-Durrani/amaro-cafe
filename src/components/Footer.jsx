import { useState } from 'react'
import { Check } from 'lucide-react'
import { hours } from '../data/content'
import { Monogram, Stamp } from './Art'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    setDone(true); setEmail('')
    setTimeout(() => setDone(false), 3500)
  }
  return (
    <footer className="bg-forest-deep text-cream">
      <div className="wrap grid gap-10 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.3fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-3"><Monogram className="h-10 w-10" /><span className="font-serif text-2xl font-bold">Amaro Café</span></div>
          <p className="mt-4 font-serif text-lg italic text-caramel">Good Coffee. Old Soul.</p>
          <p className="mt-3 max-w-sm text-sm text-cream/70">Handcrafted slow roasts, analog rituals and mid-century Milanese coffee craft, preserved since 1974.</p>
          <div className="mt-6 flex items-center gap-4 text-cream/80">
            <div className="w-16"><Stamp id="ft" top="DOC" bottom="1974" middle="☕" spin={false} /></div>
            <span className="label max-w-[10rem] text-[0.58rem]">Certificato Torrefazione Artigianale</span>
          </div>
        </div>

        <div>
          <span className="label text-caramel">Opening Hours</span>
          <ul className="mt-4 text-sm">
            {[...hours.slice(0, 2).map(([d, t]) => [d.replace('Monday – Friday', 'Mon – Fri').replace('Saturday – Sunday', 'Sat – Sun'), t]), ['Aperitivo Hour', 'Daily from 5 PM']].map(([d, t]) => (
              <li key={d} className="flex justify-between gap-4 border-b border-dotted border-cream/25 py-2.5"><span>{d}</span><span className="text-cream/70">{t}</span></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 lg:col-span-1">
          <span className="label text-caramel">Gazette &amp; Rations</span>
          <p className="mt-4 text-sm text-cream/70">Seasonal small-batch releases, cellar reserves and the occasional essay — straight to your inbox.</p>
          <form onSubmit={submit} className="mt-5">
            <label htmlFor="email" className="label text-[0.6rem] text-cream/70">Email address</label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email"
                className="min-h-[48px] w-full rounded border border-cream/40 bg-forest px-4 text-base text-cream placeholder:text-cream/40 focus:border-caramel focus:outline-none" />
              <button type="submit" className="btn-primary shrink-0 !border-ink">{done ? <><Check size={16} />Subscribed</> : 'Subscribe'}</button>
            </div>
          </form>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <div className="wrap flex flex-col items-center justify-between gap-3 py-5 text-center text-xs text-cream/60 sm:flex-row sm:text-left">
          <p>© 1974–{new Date().getFullYear()} Amaro Café S.r.l. · Via dell’Orso 12, Milano.</p>
          <nav className="flex gap-5"><a href="#" className="hover:text-cream">Privacy</a><a href="#" className="hover:text-cream">Terms</a></nav>
        </div>
      </div>
    </footer>
  )
}
