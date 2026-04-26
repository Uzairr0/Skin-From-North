import { Link } from 'react-router-dom'

export type Product = {
  id: number
  name: string
  brand: string
  price: number
  skinType: string
  image?: string
}

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
}

export default function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className={[
        'group block overflow-hidden rounded-2xl border border-slate-200 bg-white',
        'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(15,23,42,0.10)] hover:border-slate-300/70',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/25',
        className ?? '',
      ].join(' ')}
    >
      <div className="relative aspect-[4/5] w-full bg-slate-50">
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
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200/70 backdrop-blur">
            {product.brand}
          </span>
          <span className="rounded-full bg-[#2f5d3a]/10 px-2.5 py-1 text-[11px] font-medium text-[#2f5d3a] ring-1 ring-[#2f5d3a]/15">
            {product.skinType}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900">
          {product.name}
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="text-sm font-semibold tracking-tight text-slate-900">
            {formatPricePKR(product.price)}
          </div>
          <div className="text-xs font-medium text-slate-600 transition-colors duration-200 group-hover:text-slate-800">
            View
          </div>
        </div>
      </div>
    </Link>
  )
}

