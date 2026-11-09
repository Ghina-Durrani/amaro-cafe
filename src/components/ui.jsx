import { useEffect, useRef } from 'react'
import { revealOnScroll } from '../lib/scroll'

/** Wraps a section and gives children with data-reveal a gentle scroll-in. */
export function Section({ id, className = '', children }) {
  const ref = useRef(null)
  useEffect(() => revealOnScroll(ref.current), [])
  return <section id={id} ref={ref} className={`relative section ${className}`}>{children}</section>
}

export function Heading({ eyebrow, title, sub, align = 'center', tone = 'dark' }) {
  const c = align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start'
  return (
    <div className={`flex max-w-2xl flex-col ${c}`}>
      {eyebrow && <span data-reveal className={`label ${tone === 'light' ? 'text-caramel' : 'text-terracotta'}`}>{eyebrow}</span>}
      <h2 data-reveal className="mt-3 text-h2 font-bold">{title}</h2>
      {sub && <p data-reveal className="mt-4 font-serif text-lead italic opacity-80">{sub}</p>}
    </div>
  )
}
