import { useMemo } from 'react'
import { products } from '../../data/product'
import ProductCard from '../ProductCard'

export default function BestSellers({ withAnchors = true }: { withAnchors?: boolean }) {
  const bestSellers = useMemo(() => products.slice(0, 4), [])

  return (
    <section id="shop" className="w-full bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-16 scroll-mt-24">
        {withAnchors ? <div id="products" /> : null}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-[#e5e5e5]" aria-hidden="true" />
            <h2 className="text-2xl font-semibold tracking-wide text-slate-900 sm:text-3xl">
              Best Sellers
            </h2>
            <div className="h-px flex-1 bg-[#e5e5e5]" aria-hidden="true" />
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Our most popular The Ordinary products — available to order today.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} showAddToCart />
          ))}
        </div>
      </div>
    </section>
  )
}
