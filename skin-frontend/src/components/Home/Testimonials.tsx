import { FaStar } from 'react-icons/fa'

type Review = {
  text: string
  name: string
  city: string
  rating: number
}

const reviews: Review[] = [
  {
    text: 'Finally found original CeraVe in Pakistan. Highly recommended!',
    name: 'Ayesha',
    city: 'Lahore',
    rating: 5,
  },
  {
    text: 'Products are 100% authentic and delivery was fast.',
    name: 'Hassan',
    city: 'Karachi',
    rating: 5,
  },
  {
    text: 'My skin improved a lot after using these products.',
    name: 'Sara',
    city: 'Islamabad',
    rating: 5,
  },
]

function Stars({ rating }: { rating: number }) {
  const full = Math.max(0, Math.min(5, Math.round(rating)))
  return (
    <div className="flex items-center gap-1 text-amber-500" aria-label={`${full} out of 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <FaStar key={i} className="h-3.5 w-3.5" aria-hidden="true" />
      ))}
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

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <div
              key={`${r.name}-${r.city}`}
              className={[
                'rounded-xl bg-white p-6',
                'border border-gray-100 shadow-sm',
                'transition-all duration-300 ease-out hover:shadow-lg hover:shadow-slate-900/5',
              ].join(' ')}
            >
              <div className="flex items-center justify-between gap-4">
                <Stars rating={r.rating} />
                <div
                  className="h-10 w-10 rounded-full bg-slate-900/5 ring-1 ring-slate-200/70"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-600">
                “{r.text}”
              </p>

              <div className="mt-5">
                <div className="text-sm font-semibold text-slate-900">{r.name}</div>
                <div className="text-xs tracking-wide text-slate-500">{r.city}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

