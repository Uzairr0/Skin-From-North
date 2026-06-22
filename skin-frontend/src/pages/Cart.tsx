import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Seo from '../components/Seo'
import { getWhatsAppUrl } from '../lib/whatsapp'
import { DeliveryInfoBanner, OrderTotalsSummary } from '../components/OrderTotalsSummary'
import { formatPricePKR } from '../lib/pricing'

export default function Cart() {

  return (
    <section className="w-full bg-white">
      <Seo title="Cart" description="Review your selected skincare items and proceed to checkout." />
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:py-16">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Your Cart
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Review your items and proceed to checkout.
            </p>
          </div>

          {items.length > 0 ? (
            <button
              type="button"
              onClick={clearCart}
              className="self-start text-xs font-medium text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline sm:self-auto"
            >
              Clear cart
            </button>
          ) : null}
        </div>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <div className="text-sm font-semibold text-slate-900">Your cart is empty</div>
            <div className="mt-2 text-sm text-slate-600">
              Browse the shop and add products to continue.
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/shop"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-[#2f5d3a] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#264d30] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/30"
              >
                Continue Shopping
              </Link>
              <Link
                to="/"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-all duration-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/20"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Items */}
            <div className="rounded-2xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 px-5 py-4">
                <div className="text-sm font-semibold text-slate-900">Items</div>
              </div>

              <ul className="divide-y divide-slate-200">
                {items.map((item) => (
                  <li key={item.id} className="p-5">
                    <div className="flex gap-4">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-200/70">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : null}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-slate-900">
                              {item.name}
                            </div>
                            <div className="mt-1 text-sm font-semibold text-slate-900">
                              {formatPricePKR(item.price)}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="shrink-0 text-xs font-medium text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                          <div className="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="grid h-9 w-9 place-items-center text-slate-700 transition-colors hover:bg-slate-50"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <div className="min-w-[40px] text-center text-sm font-semibold text-slate-900">
                              {item.quantity}
                            </div>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="grid h-9 w-9 place-items-center text-slate-700 transition-colors hover:bg-slate-50"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-sm font-semibold text-slate-900">
                            {formatPricePKR(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="text-sm font-semibold text-slate-900">Order summary</div>

                <div className="mt-5">
                  <OrderTotalsSummary items={items} />
                </div>

                <DeliveryInfoBanner className="mt-4" />

                <Link
                  to="/checkout"
                  className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#2f5d3a] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#264d30] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/30"
                >
                  Proceed to Checkout
                </Link>

                <div className="mt-3 text-center text-xs text-slate-600">
                  Prefer WhatsApp?{' '}
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-[#2f5d3a] underline-offset-2 hover:underline"
                  >
                    Place your order there
                  </a>
                  .
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}

