import { useEffect, useState } from 'react'
import { Menu, X, Search, ShoppingBag } from 'lucide-react'
import { nav } from '../data/content'
import { scrollToId, lockScroll } from '../lib/scroll'
import { Monogram } from './Art'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    const seen = new Set()
    const watch = () => nav.forEach(({ id }) => { const el = document.getElementById(id); if (el && !seen.has(id)) { seen.add(id); io.observe(el) } })
    watch(); const t = setInterval(watch, 600); setTimeout(() => clearInterval(t), 6000)
    return () => { io.disconnect(); clearInterval(t) }
  }, [])

  useEffect(() => { lockScroll(open); return () => lockScroll(false) }, [open])
  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    const wide = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', esc); window.addEventListener('resize', wide)
    return () => { window.removeEventListener('keydown', esc); window.removeEventListener('resize', wide) }
  }, [])

  const go = (id) => (e) => { e.preventDefault(); setOpen(false); setTimeout(() => scrollToId(id), open ? 250 : 0) }

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${scrolled || open ? 'border-cream/20 bg-forest-deep/95 shadow-lg backdrop-blur-sm' : 'border-transparent bg-forest/70'}`}>
      <div className="wrap flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <a href="#top" onClick={go('top')} className="flex items-center gap-3 text-cream" aria-label="Amaro Café — back to top">
          <Monogram className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
          <span className="leading-none">
            <span className="block whitespace-nowrap font-serif text-lg font-bold sm:text-xl">Amaro Café</span>
            <span className="label mt-1 hidden text-[0.58rem] text-caramel xs:block">Torrefazione 1974 · Milano</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden rounded-full border border-cream/20 bg-forest/60 p-1 lg:flex">
          {nav.map(({ id, label }) => (
            <a key={id} href={`#${id}`} onClick={go(id)} aria-current={active === id ? 'true' : undefined}
              className={`rounded-full px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] transition-colors xl:px-5 ${active === id ? 'bg-cream text-forest' : 'text-cream/85 hover:text-cream'}`}>
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button aria-label="Search" className="hidden h-10 w-10 place-items-center rounded-full text-cream/80 hover:bg-cream/10 hover:text-cream xl:grid"><Search size={18} /></button>
          <button aria-label="Bag" className="relative hidden h-10 w-10 place-items-center rounded-full text-cream/80 hover:bg-cream/10 hover:text-cream xl:grid"><ShoppingBag size={18} /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-caramel" /></button>
          <a href="#visit" onClick={go('visit')} className="btn-primary whitespace-nowrap !min-h-[42px] !border-ink !px-4 !py-2.5 !text-[0.68rem] sm:!px-5 sm:!text-[0.72rem]"><span>Reserve<span className="hidden xs:inline"> a Cup</span></span></a>
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center rounded text-cream hover:bg-cream/10 lg:hidden">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`overflow-hidden transition-[max-height] duration-500 ease-out lg:hidden ${open ? 'max-h-[26rem]' : 'max-h-0'}`}>
        <nav aria-label="Mobile" className="wrap flex flex-col pb-6 pt-2">
          {nav.map(({ id, label }, i) => (
            <a key={id} href={`#${id}`} onClick={go(id)} tabIndex={open ? 0 : -1}
              className="flex items-baseline justify-between border-b border-dotted border-cream/25 py-4 font-serif text-2xl text-cream">
              {label}<span className="label text-caramel">0{i + 1}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
