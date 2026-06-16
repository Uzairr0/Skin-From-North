import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

const faqs = [
  {
    q: 'Are your products 100% original?',
    a: 'Yes. We source authentic imported skincare. Every product is checked before dispatch. We currently sell The Ordinary — CeraVe and Cetaphil are coming soon.',
  },
  {
    q: 'Which brands are available right now?',
    a: 'The Ordinary is in stock and ready to order. CeraVe and Cetaphil will be added in our next shipment — you can message us on WhatsApp to get notified.',
  },
  {
    q: 'How do I pay?',
    a: 'We offer Cash on Delivery (COD) across Pakistan. Pay when your order arrives at your doorstep. Online card payments are coming soon.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Orders are usually processed within 1–2 business days. Delivery typically takes 3–7 working days depending on your city (Lahore, Karachi, Islamabad, and other areas).',
  },
  {
    q: 'Which cities do you deliver to?',
    a: 'We deliver across Pakistan including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, and more. Enter your city at checkout.',
  },
  {
    q: 'Can you help me choose the right product?',
    a: 'Absolutely. Use the Skin Type Finder on our homepage or message us on WhatsApp. Tell us your skin type and concerns — we’ll recommend what suits you.',
  },
  {
    q: 'What if I receive a damaged product?',
    a: 'Contact us on WhatsApp or email within 48 hours of delivery with photos. We’ll resolve genuine issues on a case-by-case basis.',
  },
  {
    q: 'How do I track my order?',
    a: 'After placing your order, save your order number from the confirmation page. We’ll contact you by phone or WhatsApp to confirm dispatch and delivery.',
  },
]

export default function Faqs() {
  return (
    <section className="w-full bg-white">
      <Seo title="FAQs" description="Answers about authenticity, delivery, COD, and ordering skincare in Pakistan." />
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
          Common questions about ordering authentic imported skincare in Pakistan.
        </p>

        <div className="mt-10 space-y-4">
          {faqs.map((item) => (
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
