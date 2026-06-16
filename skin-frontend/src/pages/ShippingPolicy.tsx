import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function ShippingPolicy() {
  return (
    <section className="w-full bg-white">
      <Seo title="Shipping Policy" description="Delivery timelines, cities covered, and shipping information for Pakistan." />
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
          How we deliver your order across Pakistan.
        </p>

        <div className="mt-10 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">Processing time</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Orders are confirmed by phone or WhatsApp, then packed and dispatched within 1–2
              business days (Monday–Saturday, excluding public holidays).
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">Delivery time</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Most orders arrive within 3–7 working days after dispatch, depending on your city
              and courier coverage. Major cities (Lahore, Karachi, Islamabad, Rawalpindi) are
              usually faster.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">Shipping cost</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Standard delivery is currently <strong>free</strong> on all orders. If this changes,
              the cost will be shown clearly at checkout before you place your order.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">Cash on Delivery (COD)</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Pay the full amount in cash when your parcel arrives. Please keep exact change ready
              if possible. Our team may call to confirm your address and phone number before
              dispatch.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">Order updates</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Save your order number from the confirmation page. For delivery updates, contact us
              on WhatsApp at +92 318 4263597 or email skinfromnorth@gmail.com.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
