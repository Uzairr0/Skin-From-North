import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function ThankYou() {
  return (
    <section className="w-full bg-white">
      <Seo title="Thank You" description="Your order has been placed successfully." />
      <div className="mx-auto max-w-[900px] px-4 py-14 sm:py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <div className="text-sm font-semibold tracking-wide text-[#2f5d3a]">ORDER CONFIRMED</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Thank you! Your order has been placed.
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            We’ll contact you shortly to confirm delivery details.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/shop"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#2f5d3a] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#264d30] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/30"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-all duration-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/20"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

