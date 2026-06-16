import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiEye } from 'react-icons/fi'
import type { Product } from '../data/product'
import { skinTypeLabel } from '../data/product'
import { useCart } from '../context/CartContext'
import { Button } from './ui/Button'

function formatPricePKR(value: number) {
  try {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(value)
  } catch {
    return `Rs ${value.toLocaleString()}`
  }
}

export type ProductCardProps = {
  product: Product
  className?: string
  showAddToCart?: boolean
}

export default function ProductCard({
  product,
  className,
  showAddToCart = false,
}: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const productUrl = `/product/${product.id}`

  const handleAddToCart = () => {
    if (isAdding) return
    setIsAdding(true)
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    window.setTimeout(() => setIsAdding(false), 800)
  }

  return (
    <article
      className={[
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white',
        'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(15,23,42,0.10)] hover:border-slate-300/70',
        className ?? '',
      ].join(' ')}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-50">
        <Link
          to={productUrl}
          className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2f5d3a]/25"
          aria-label={`View ${product.name}`}
        >
          {product.image ? (
            <img
              src={encodeURI(product.image)}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-slate-50 to-slate-100" />
          )}
        </Link>

        <div
          className={[
            'pointer-events-none absolute inset-0',
            'bg-slate-900/0 transition-colors duration-300',
            'group-hover:bg-slate-900/10',
          ].join(' ')}
          aria-hidden="true"
        />

        <Link
          to={productUrl}
          className={[
            'absolute inset-x-3 bottom-3 z-10',
            'inline-flex items-center justify-center gap-1.5',
            'rounded-lg bg-white/95 px-4 py-2.5 text-xs font-semibold text-slate-900',
            'shadow-md ring-1 ring-slate-200/80 backdrop-blur-sm',
            'transition-all duration-300',
            'opacity-100 translate-y-0',
            'sm:opacity-0 sm:translate-y-2 sm:pointer-events-none',
            'sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:group-hover:pointer-events-auto',
            'hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/30',
          ].join(' ')}
        >
          <FiEye className="h-3.5 w-3.5" aria-hidden="true" />
          Quick View
        </Link>

        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200/70 backdrop-blur">
          {product.brand}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <Link
          to={productUrl}
          className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900 transition-colors duration-200 hover:text-[#2f5d3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/25"
        >
          {product.name}
        </Link>

        <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-slate-500">
          {product.benefit}
        </p>

        <p className="mt-2.5 text-[11px] font-medium text-slate-600">
          <span className="text-slate-400">Who is this for:</span>{' '}
          <span className="text-slate-700">{skinTypeLabel(product.skinType)}</span>
        </p>

        <div className="mt-3 text-lg font-bold tracking-tight text-[#2f5d3a] sm:text-xl">
          {formatPricePKR(product.price)}
        </div>

        {showAddToCart ? (
          <Button
            type="button"
            className="mt-4 w-full"
            isLoading={isAdding}
            loadingText="Adding…"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        ) : null}
      </div>
    </article>
  )
}
