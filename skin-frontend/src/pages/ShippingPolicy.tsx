import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function ShippingPolicy() {
  return (
    <section className="w-full bg-white">
      <Seo title="Shipping Policy" description="Shipping details, delivery timelines, and courier information." />
      <div className="mx-auto max-w-[900px] px-4 py-14 sm:py-16">
        <Link
          to="/"
          className="text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-slate-900"
        >
          ← Back to Home
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Shipping Policy
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          Shipping details and delivery timeline. (Placeholder content — customize anytime.)
        </p>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
          <ul className="space-y-3 text-sm leading-relaxed text-slate-700">
            <li>Orders are processed and dispatched as quickly as possible.</li>
            <li>Delivery time depends on your city and courier availability.</li>
            <li>Shipping charges (if any) are calculated at checkout/confirmation.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

