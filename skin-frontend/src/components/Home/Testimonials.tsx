import { FaStar, FaWhatsapp } from 'react-icons/fa'

type Review = {
  text: string
  result: string
  name: string
  city: 'Lahore' | 'Karachi' | 'Islamabad'
  rating: number
  time: string
}

const reviews: Review[] = [
  {
    text: 'Assalamualaikum! Just got my CeraVe cleanser today. Packaging was sealed & original 💯',
    result: 'Oily skin is less shiny after 1 week',
    name: 'Ayesha Khan',
    city: 'Lahore',
    rating: 5,
    time: '2:14 PM',
  },
  {
    text: 'Bhai product bilkul original hai. Salicylic acid order kiya tha, COD bhi easy tha 👍',
    result: 'Acne cleared up in about 2 weeks',
    name: 'Hassan R.',
    city: 'Karachi',
    rating: 5,
    time: '6:42 PM',
  },
  {
    text: 'Ordered The Ordinary niacinamide. Delivered to Islamabad in 3 days. Very happy!',
    result: 'Dark spots fading, skin feels smoother',
    name: 'Sara Ahmed',
    city: 'Islamabad',
    rating: 5,
    time: '11:08 AM',
  },
]

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function Stars({ rating }: { rating: number }) {
  const full = Math.max(0, Math.min(5, Math.round(rating)))
  return (
    <div className="flex items-center gap-0.5 text-amber-400" aria-label={`${full} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          className={['h-3 w-3', i < full ? 'opacity-100' : 'opacity-25'].join(' ')}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

function ChatBubble({ review }: { review: Review }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
      {/* WhatsApp-style chat header */}
      <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/20 text-xs font-semibold ring-1 ring-white/25">
          {initials(review.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold leading-tight">{review.name}</div>
          <div className="truncate text-[11px] text-white/75">{review.city}, Pakistan</div>
        </div>
        <FaWhatsapp className="h-5 w-5 shrink-0 text-white/80" aria-hidden="true" />
      </div>

      {/* Chat wallpaper area */}
      <div
        className="relative px-3 py-4 sm:px-4"
        style={{
          backgroundColor: '#e5ddd5',
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.35) 0 1px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.25) 0 1px, transparent 1px)',
          backgroundSize: '28px 28px, 36px 36px',
        }}
      >
        <div className="relative max-w-[92%]">
          {/* Bubble tail */}
          <div
            className="absolute -left-1.5 top-3 h-3 w-3 rotate-45 bg-white"
            aria-hidden="true"
          />

          <div className="relative rounded-xl rounded-tl-sm bg-white px-3 py-2.5 shadow-sm ring-1 ring-black/[0.04] sm:px-3.5 sm:py-3">
            <Stars rating={review.rating} />

            <p className="mt-2 text-[13px] leading-relaxed text-[#111b21] sm:text-sm">
              {review.text}
            </p>

            <p className="mt-2 text-[12px] font-medium leading-snug text-[#075e54] sm:text-[13px]">
              ✨ {review.result}
            </p>

            <div className="mt-1.5 flex items-end justify-end gap-1">
              <span className="text-[10px] text-[#667781]">{review.time}</span>
              <span className="text-[#53bdeb] text-[11px] leading-none" aria-hidden="true">
                ✓✓
              </span>
            </div>
          </div>
        </div>

        {/* Store reply bubble */}
        <div className="mt-3 flex justify-end">
          <div className="max-w-[78%] rounded-xl rounded-tr-sm bg-[#d9fdd3] px-3 py-2 shadow-sm ring-1 ring-black/[0.04] sm:px-3.5">
            <p className="text-[12px] leading-relaxed text-[#111b21] sm:text-[13px]">
              Thank you for trusting Skin From North! 🙏 Glad it&apos;s working for you.
            </p>
            <div className="mt-1 flex justify-end">
              <span className="text-[10px] text-[#667781]">2:16 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
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

        <p className="mt-4 w-full text-center text-sm text-slate-600 sm:text-base">
          Real WhatsApp messages from customers across Pakistan
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <ChatBubble key={`${r.name}-${r.city}`} review={r} />
          ))}
        </div>
      </div>
    </section>
  )
}
