import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiShield, FiTruck } from 'react-icons/fi'
import { FaGlobeAmericas } from 'react-icons/fa'
import heroProductsImg from '../../assets/hero-products.png'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 40)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <section
      id="home"
      className="w-full bg-gradient-to-r from-[#fbf7ef] via-[#fbf6ee] to-[#f5efe6]"
    >
      <div className="mx-auto max-w-[1200px] px-4 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left */}
          <div
            className={[
              'max-w-xl text-left',
              'transition-all duration-700 ease-out',
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
            ].join(' ')}
          >
            <div className="text-[11px] font-bold tracking-[0.18em] text-[#0f3d37]">
              100% ORIGINAL SKINCARE
            </div>

            <h1 className="mt-3 text-4xl font-semibold leading-[1.03] tracking-tight text-slate-900 sm:text-5xl">
              Imported from{' '}
              <span className="block text-[#0f3d37]">North America</span>
            </h1>

            <p className="mt-5 max-w-[52ch] text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-7">
              CeraVe, Cetaphil &amp; The Ordinary – trusted by millions worldwide.
              Now available in Pakistan.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className={[
                  'inline-flex items-center justify-center',
                  'h-11 rounded-lg px-6 py-3 text-sm font-medium',
                  'bg-[#2f5d3a] text-white',
                  'shadow-[0_10px_25px_rgba(47,93,58,0.22)]',
                  'transition-all duration-300',
                  'hover:bg-[#264d30] hover:shadow-md hover:scale-[1.02]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/40',
                ].join(' ')}
              >
                Shop Now
              </Link>

              <Link
                to="/shop"
                className={[
                  'inline-flex items-center justify-center',
                  'h-11 rounded-lg px-6 py-3 text-sm font-medium',
                  'border border-slate-300/80 bg-white/40 text-slate-900',
                  'transition-all duration-300',
                  'hover:bg-white/70 hover:shadow-sm hover:scale-[1.02]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/25',
                ].join(' ')}
              >
                View Products
              </Link>
            </div>

            {/* Trust points */}
            <div className="mt-7 grid gap-3 sm:grid-cols-3 sm:gap-4">
              <div className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 ring-1 ring-slate-200/70">
                <FiShield className="h-4 w-4 text-[#0f3d37]" aria-hidden="true" />
                <span className="text-xs font-medium text-slate-700">
                  100% Authentic Products
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 ring-1 ring-slate-200/70">
                <FaGlobeAmericas
                  className="h-4 w-4 text-[#0f3d37]"
                  aria-hidden="true"
                />
                <span className="text-xs font-medium text-slate-700">
                  Imported from Canada &amp; USA
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 ring-1 ring-slate-200/70">
                <FiTruck className="h-4 w-4 text-[#0f3d37]" aria-hidden="true" />
                <span className="text-xs font-medium text-slate-700">
                  Fast Delivery Across Pakistan
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div
            className={[
              'relative',
              'transition-all duration-700 ease-out delay-100',
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
            ].join(' ')}
          >
            <div className="relative w-full overflow-hidden lg:min-h-[420px] sm:min-h-[320px] min-h-[260px] drop-shadow-xl">
              <img
                src={heroProductsImg}
                alt="CeraVe, Cetaphil and The Ordinary products"
                className={[
                  'absolute inset-0 h-full w-full object-cover',
                  // soft blend into hero background (no "separate picture" edges)
                  '[mask-image:radial-gradient(closest-side,rgba(0,0,0,1)_72%,rgba(0,0,0,0)_100%)]',
                ].join(' ')}
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#fbf7ef]/60 via-transparent to-[#f5efe6]/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
