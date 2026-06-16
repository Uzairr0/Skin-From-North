import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function ReturnPolicy() {
  return (
    <section className="w-full bg-white">
      <Seo title="Return Policy" description="Returns, exchanges, and damaged item policy for skincare orders." />
      <div className="mx-auto max-w-[900px] px-4 py-14 sm:py-16">
        <Link
          to="/"
          className="text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-slate-900"
        >
          ← Back to Home
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Return Policy
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          We want you to shop with confidence. Please read our policy below.
        </p>

        <div className="mt-10 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">Authenticity guarantee</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              We sell 100% original imported products. If you believe an item is not authentic,
              contact us within 48 hours of delivery with your order number and photos.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">Damaged or wrong items</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              If your order arrives damaged, leaked, or incorrect, message us on WhatsApp within
              48 hours with unboxing photos. We will review and offer a replacement or refund where
              appropriate.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">Opened or used products</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              For hygiene and safety reasons, opened, used, or tampered skincare products cannot
              be returned unless they arrived damaged or defective.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">Change of mind</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Due to the nature of skincare products, we do not accept returns for change of mind
              once the seal is broken. Please use our Skin Type Finder or WhatsApp support before
              ordering if you need help choosing.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">How to contact us</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              WhatsApp: +92 318 4263597 · Email: skinfromnorth@gmail.com. Include your order
              number and a clear description of the issue.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
