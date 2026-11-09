import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { initSmoothScroll, lockScroll, ScrollTrigger } from './lib/scroll'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

// Everything below the fold is code-split: the hero shows first, the rest streams in.
const Ritual = lazy(() => import('./components/Ritual'))
const Menu = lazy(() => import('./components/Menu'))
const Story = lazy(() => import('./components/Story'))
const WhyUs = lazy(() => import('./components/WhyUs'))
const Visit = lazy(() => import('./components/Visit'))
const Footer = lazy(() => import('./components/Footer'))

function Skeleton() {
  return (
    <div className="bg-cream py-20" role="status" aria-label="Loading more of the page">
      <div className="wrap space-y-4">
        <div className="skeleton mx-auto h-8 w-2/3 max-w-md animate-shimmer rounded" />
        <div className="skeleton mx-auto h-4 w-1/2 max-w-xs animate-shimmer rounded" />
        <div className="grid gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((n) => <div key={n} className="skeleton h-56 animate-shimmer rounded" />)}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)
  const onFinish = useCallback(() => { setReady(true); lockScroll(false) }, [])

  useEffect(() => {
    lockScroll(true)
    const stop = initSmoothScroll()
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    window.addEventListener('resize', refresh)
    return () => { stop(); window.removeEventListener('load', refresh); window.removeEventListener('resize', refresh) }
  }, [])

  return (
    <>
      <Loader onFinish={onFinish} />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <Suspense fallback={<Skeleton />}>
          <Ritual />
          <Menu />
          <Story />
          <WhyUs />
          <Visit />
        </Suspense>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
    </>
  )
}
