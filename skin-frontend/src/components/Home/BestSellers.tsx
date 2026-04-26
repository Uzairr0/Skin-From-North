import { Link } from 'react-router-dom'
import { FaStar, FaRegStar } from 'react-icons/fa'
import { useMemo, useState } from 'react'
import { products } from '../../data/product'
import { useCart } from '../../context/CartContext'
import { Button } from '../ui/Button'

function formatPkr(value: number) {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(value)
}

function Stars({ rating }: { rating: number }) {
  const full = Math.max(0, Math.min(5, Math.round(rating)))
  return (
    <div className="flex items-center gap-1 text-amber-500" aria-label={`${full} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) =>
        i < full ? (
          <FaStar key={i} className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <FaRegStar key={i} className="h-3.5 w-3.5" aria-hidden="true" />
        ),
      )}
    </div>
  )
}

export default function BestSellers({ withAnchors = true }: { withAnchors?: boolean }) {
  const { addToCart } = useCart()
  const [addingId, setAddingId] = useState<number | null>(null)

  const bestSellers = useMemo(() => products.slice(0, 4), [])

  const ratingFor = (brand: string) => {
    switch (brand) {
      case 'CeraVe':
        return 5
      case 'The Ordinary':
        return 5
      default:
        return 4
    }
  }

  return (
    <section id={withAnchors ? 'shop' : undefined} className="w-full bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-16">
        {withAnchors ? <div id="products" /> : null}
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-4">
          <div className="h-px flex-1 bg-[#e5e5e5]" aria-hidden="true" />
          <h2 className="text-center text-2xl font-semibold tracking-wide text-slate-900 sm:text-3xl">
            Best Sellers
          </h2>
          <div className="h-px flex-1 bg-[#e5e5e5]" aria-hidden="true" />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <div
              key={p.id}
              className={[
                'group overflow-hidden rounded-xl bg-white',
                'border border-gray-100',
                'shadow-sm transition-all duration-300 ease-out',
                'hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-lg hover:shadow-slate-900/5',
              ].join(' ')}
            >
              <Link
                to={`/product/${p.id}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/25"
                aria-label={`View details for ${p.name}`}
              >
                <div className="flex h-48 items-center justify-center bg-gray-50 p-6">
                  {p.image ? (
                    <img
                      src={encodeURI(p.image)}
                      alt={p.name}
                      className="h-28 w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.06]"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="h-24 w-full rounded-lg bg-white ring-1 ring-slate-200/70" />
                  )}
                </div>
              </Link>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      to={`/product/${p.id}`}
                      className="block truncate text-[15px] font-semibold text-slate-900 transition-colors duration-300 hover:text-[#2f5d3a]"
                    >
                      {p.name}
                    </Link>
                    <div className="mt-2">
                      <span className="inline-flex items-center rounded-full bg-slate-900/5 px-2.5 py-1 text-[11px] font-medium tracking-wide text-slate-700">
                        {p.skinType}
                      </span>
                    </div>
                  </div>
                  <Stars rating={ratingFor(p.brand)} />
                </div>

                <div className="mt-4 text-[15px] font-semibold text-slate-900">
                  {formatPkr(p.price)}
                </div>

                <Button
                  type="button"
                  className="mt-4 w-full"
                  isLoading={addingId === p.id}
                  loadingText="Adding…"
                  onClick={() => {
                    if (addingId === p.id) return
                    setAddingId(p.id)
                    addToCart({
                      id: p.id,
                      name: p.name,
                      price: p.price,
                      image: p.image,
                    })
                    window.setTimeout(() => {
                      setAddingId((v) => (v === p.id ? null : v))
                    }, 800)
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

