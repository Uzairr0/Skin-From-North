import { FaWhatsapp } from 'react-icons/fa'
import StarRating from '../StarRating'
import { getWhatsAppUrl } from '../../lib/whatsapp'

type Review = {
  quote: string
  name: string
  area: string
  product: string
  rating: number
  orderedVia: 'website' | 'whatsapp'
}

const reviews: Review[] = [
  {
    quote:
      'Niacinamide order kiya tha — seal intact thi aur batch code check kar liya. Oily T-zone pe 10 din mein farq feel hua.',
    name: 'Ayesha K.',
    area: 'Gulberg, Lahore',
    product: 'Niacinamide 10% Zinc',
    rating: 5,
    orderedVia: 'website',
  },
  {
    quote:
      'Salicylic acid genuine laga, COD smooth tha. Delivery 2 din late hui lekin product bilkul theek tha. Breakouts kam hue ab.',
    name: 'Hassan R.',
    area: 'DHA Phase 5, Lahore',
    product: 'Salicylic Acid 2%',
    rating: 4.5,
    orderedVia: 'whatsapp',
  },
  {
    quote:
      'Glycolic toner skin texture smooth kar raha hai. Pehli dafa imported The Ordinary try kiya — packaging simple thi magar original.',
    name: 'Sara A.',
    area: 'Johar Town, Lahore',
    product: 'Glycolic Acid 7% Toner',
    rating: 4.5,
    orderedVia: 'website',
  },
]

function initials(name: string) {
  return name
    .replace('.', '')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)] sm:p-6">
      <StarRating rating={review.rating} />

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
        &ldquo;{review.quote}&rdquo;
      </blockquote>

      <div className="mt-4 rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-slate-200/70">
        <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
          Purchased
        </div>
        <div className="mt-0.5 text-sm font-semibold text-[#2f5d3a]">{review.product}</div>
      </div>

      <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#2f5d3a]/10 text-xs font-semibold text-[#2f5d3a] ring-1 ring-[#2f5d3a]/15">
          {initials(review.name)}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-900">{review.name}</div>
          <div className="text-xs text-slate-500">{review.area}</div>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-slate-400">
        Ordered via {review.orderedVia === 'whatsapp' ? 'WhatsApp' : 'website'}
      </div>
    </article>
  )
}

export default function Testimonials() {
  return (
    <section className="w-full bg-[#f9fafb]">
      <div className="mx-auto max-w-[1200px] px-4 py-16">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-4">
          <div className="h-px flex-1 bg-[#e5e5e5]" aria-hidden="true" />
          <h2 className="text-center text-2xl font-semibold tracking-wide text-slate-900 sm:text-3xl">
            What Our Customers Say
          </h2>
          <div className="h-px flex-1 bg-[#e5e5e5]" aria-hidden="true" />
        </div>

        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-slate-600 sm:text-base">
          Feedback from Lahore buyers who ordered The Ordinary through our shop or WhatsApp.
          Every review is based on real order conversations — shared with permission.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-[#2f5d3a]/15 bg-white px-5 py-5 text-center shadow-sm sm:px-6">
          <p className="text-sm leading-relaxed text-slate-600">
            We deliver in Lahore only. After your order arrives, message us on WhatsApp — happy
            customers often become our best reviews.
          </p>
          <a
            href={getWhatsAppUrl('Hi, I want to order The Ordinary skincare in Lahore')}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1fb855] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/40"
          >
            <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
            Order on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
