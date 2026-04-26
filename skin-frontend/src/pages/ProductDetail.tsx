import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FiChevronLeft, FiShoppingBag } from 'react-icons/fi'
import { products } from '../data/product'
import { useCart } from '../context/CartContext'
import { useProductSearch } from '../context/SearchContext'
import Seo from '../components/Seo'
import { Button } from '../components/ui/Button'

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

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const { addToCart } = useCart()
  const { setQuery } = useProductSearch()

  const productId = Number(id)
  const product = useMemo(() => products.find((p) => p.id === productId), [productId])

  useEffect(() => {
    setQuery('')
  }, [setQuery])

  const decrement = () => setQty((v) => Math.max(1, v - 1))
  const increment = () => setQty((v) => Math.min(20, v + 1))
  const handleAddToCart = () => {
    if (isAdding) return
    if (!product) return
    setIsAdding(true)
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      qty,
    )
    window.setTimeout(() => setIsAdding(false), 800)
  }

  const handleCheckout = () => {
    if (isCheckingOut) return
    if (!product) return
    setIsCheckingOut(true)
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      qty,
    )
    navigate('/checkout')
    window.setTimeout(() => setIsCheckingOut(false), 600)
  }

  if (!id || Number.isNaN(productId) || !product) {
    return (
      <section className="w-full bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-16">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors duration-300 hover:text-slate-900"
          >
            <FiChevronLeft className="h-4 w-4" aria-hidden="true" />
            Back to Shop
          </Link>

          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <div className="text-sm font-semibold text-slate-900">Product not found</div>
            <div className="mt-2 text-sm text-slate-600">
              The product you’re looking for doesn’t exist or was removed.
            </div>
            <Link
              to="/shop"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-[#2f5d3a] px-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#264d30] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/25"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full bg-white">
      <Seo
        title={product.name}
        description={`Buy ${product.name} by ${product.brand}. Suitable for ${product.skinType.toLowerCase()} skin. Authentic imported skincare in Pakistan.`}
      />
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:py-16">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors duration-300 hover:text-slate-900"
        >
          <FiChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back to Shop
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Left: Product image */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
            <div className="relative overflow-hidden rounded-xl bg-white ring-1 ring-slate-200/60">
              <div className="absolute left-3 top-3 flex items-center gap-2">
                <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200/70 backdrop-blur">
                  {product.brand}
                </span>
                <span className="rounded-full bg-[#2f5d3a]/10 px-2.5 py-1 text-[11px] font-medium text-[#2f5d3a] ring-1 ring-[#2f5d3a]/15">
                  {product.skinType}
                </span>
              </div>

              <div className="aspect-square w-full bg-gradient-to-br from-slate-50 to-slate-100">
                {product.image ? (
                  <img
                    src={encodeURI(product.image)}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
            </div>
          </div>

          {/* Right: Product details */}
          <div className="min-w-0">
            <div className="text-xs font-semibold tracking-[0.22em] text-[#2f5d3a]">PRODUCT</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="text-2xl font-semibold tracking-tight text-slate-900">
                {formatPricePKR(product.price)}
              </div>
              <span className="rounded-full bg-[#2f5d3a]/10 px-3 py-1 text-xs font-semibold text-[#2f5d3a] ring-1 ring-[#2f5d3a]/15">
                {product.skinType === 'All Skin Types' ? 'Suitable for all skin types' : `For ${product.skinType} skin`}
              </span>
            </div>

            <p className="mt-5 max-w-prose text-sm leading-relaxed text-slate-600 sm:text-base">
              A gentle, daily essential crafted to support your skin barrier. Lightweight feel,
              non-greasy finish, and a routine-friendly formula that pairs well with actives.
            </p>

            {/* Quantity + Add to cart */}
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="inline-flex h-11 items-center rounded-lg border border-slate-200 bg-white">
                <button
                  type="button"
                  onClick={decrement}
                  className="grid h-11 w-11 place-items-center text-slate-700 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/20"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <div className="min-w-[56px] text-center text-sm font-semibold text-slate-900">
                  {qty}
                </div>
                <button
                  type="button"
                  onClick={increment}
                  className="grid h-11 w-11 place-items-center text-slate-700 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/20"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <Button
                type="button"
                onClick={handleAddToCart}
                isLoading={isAdding}
                loadingText="Adding…"
                leftIcon={<FiShoppingBag className="h-4 w-4" aria-hidden="true" />}
                variant="secondary"
                className="w-full sm:w-auto sm:px-4"
              >
                Add to Cart
              </Button>

              <Button
                type="button"
                onClick={handleCheckout}
                isLoading={isCheckingOut}
                loadingText="Opening…"
                className="w-full flex-1"
              >
                Checkout Now
              </Button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold tracking-wide text-slate-900">Brand</div>
                <div className="mt-1 text-sm text-slate-700">{product.brand}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold tracking-wide text-slate-900">Skin type</div>
                <div className="mt-1 text-sm text-slate-700">{product.skinType}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

