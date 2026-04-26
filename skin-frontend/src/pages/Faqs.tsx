import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function Faqs() {
  return (
    <section className="w-full bg-white">
      <Seo title="FAQs" description="Answers to common questions about authenticity, delivery, and ordering." />
      <div className="mx-auto max-w-[900px] px-4 py-14 sm:py-16">
        <Link
          to="/"
          className="text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-slate-900"
        >
          ← Back to Home
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          FAQs
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          Quick answers to common questions. (Placeholder content — customize anytime.)
        </p>

        <div className="mt-10 space-y-4">
          {[
            {
              q: 'Are your products original?',
              a: 'Yes — we focus on authentic imported skincare. We recommend checking packaging and batch details on delivery.',
            },
            {
              q: 'How long does delivery take?',
              a: 'Delivery times vary by city. Orders are usually dispatched quickly and delivered within a few working days.',
            },
            {
              q: 'Can I get help choosing a product?',
              a: 'Absolutely. Use the WhatsApp button in the Contact section to get personalized guidance.',
            },
          ].map((item) => (
            <div key={item.q} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-sm font-semibold text-slate-900">{item.q}</div>
              <div className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

