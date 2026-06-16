import { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import heroProductsImg from '../../assets/hero-products.png'
import { getWhatsAppUrl } from '../../lib/whatsapp'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  const whatsappUrl = getWhatsAppUrl()

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
              NOW DELIVERING ACROSS PAKISTAN
            </div>

            <h1 className="mt-3 text-4xl font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl">
              Original Canadian Skincare{' '}
              <span className="block text-[#0f3d37]">
                at Affordable Prices in Pakistan
              </span>
            </h1>

            <p className="mt-5 max-w-[54ch] text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-7">
              100% authentic imported skincare —{' '}
              <span className="font-medium text-slate-800">The Ordinary available now.</span>{' '}
              CeraVe &amp; Cetaphil coming soon. Delivered across Pakistan with cash on delivery.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="/#shop"
                onClick={(e) => {
                  const target = document.getElementById('shop')
                  if (!target) return
                  e.preventDefault()
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  window.history.replaceState(null, '', '/#shop')
                }}
                className={[
                  'inline-flex items-center justify-center',
                  'h-11 rounded-lg px-6 py-3 text-sm font-semibold',
                  'bg-[#2f5d3a] text-white',
                  'shadow-[0_10px_25px_rgba(47,93,58,0.22)]',
                  'transition-all duration-300',
                  'hover:bg-[#264d30] hover:shadow-md hover:scale-[1.02]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/40',
                ].join(' ')}
              >
                Shop Best Sellers
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className={[
                  'inline-flex items-center justify-center gap-2',
                  'h-11 rounded-lg px-6 py-3 text-sm font-medium',
                  'border border-slate-300/80 bg-white/40 text-slate-900',
                  'transition-all duration-300',
                  'hover:bg-white/70 hover:shadow-sm hover:scale-[1.02]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/25',
                ].join(' ')}
              >
                <FaWhatsapp className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
                Chat on WhatsApp
              </a>
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
