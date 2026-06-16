import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import Seo from '../components/Seo'
import { getWhatsAppUrl } from '../lib/whatsapp'
import { readPlacement, writePlacement } from '../lib/orderPlacementStorage'
import { placeOrder, type OrderPayload } from '../lib/placeOrder'
import { useCart } from '../context/CartContext'

type ThankYouState = {
  orderRef?: string
  total?: number
  pending?: boolean
  placementId?: string
  orderPayload?: OrderPayload
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

export default function ThankYou() {
  const location = useLocation()
  const navigate = useNavigate()
  const { clearCart } = useCart()
  const state = (location.state ?? {}) as ThankYouState

  const [orderRef, setOrderRef] = useState(state.orderRef)
  const [total, setTotal] = useState(state.total)
  const [isPlacing, setIsPlacing] = useState(Boolean(state.pending && state.placementId))
  const [placeError, setPlaceError] = useState<string | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!state.pending || !state.placementId || !state.orderPayload) return
    if (startedRef.current) return
    startedRef.current = true

    const { placementId, orderPayload } = state
    const existing = readPlacement(placementId)

    if (existing?.status === 'done') {
      setOrderRef(existing.orderRef)
      setTotal(existing.total)
      setIsPlacing(false)
      clearCart()
      navigate(location.pathname, {
        replace: true,
        state: { orderRef: existing.orderRef, total: existing.total },
      })
      return
    }

    if (existing?.status === 'failed') {
      setPlaceError(existing.message)
      setIsPlacing(false)
      return
    }

    if (existing?.status === 'pending' && Date.now() - existing.startedAt < 45_000) {
      setIsPlacing(true)
      const interval = window.setInterval(() => {
        const latest = readPlacement(placementId)
        if (latest?.status === 'done') {
          window.clearInterval(interval)
          clearCart()
          setOrderRef(latest.orderRef)
          setTotal(latest.total)
          setIsPlacing(false)
          navigate(location.pathname, {
            replace: true,
            state: { orderRef: latest.orderRef, total: latest.total },
          })
        } else if (latest?.status === 'failed') {
          window.clearInterval(interval)
          setPlaceError(latest.message)
          setIsPlacing(false)
        }
      }, 500)
      return () => window.clearInterval(interval)
    }

    writePlacement(placementId, { status: 'pending', startedAt: Date.now() })
    setIsPlacing(true)
    setPlaceError(null)

    void placeOrder(orderPayload)
      .then((result) => {
        writePlacement(placementId, { status: 'done', ...result })
        clearCart()
        setOrderRef(result.orderRef)
        setTotal(result.total)
        setIsPlacing(false)
        navigate(location.pathname, {
          replace: true,
          state: { orderRef: result.orderRef, total: result.total },
        })
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : 'Failed to place order'
        writePlacement(placementId, { status: 'failed', message })
        setPlaceError(message)
        setIsPlacing(false)
      })
  }, [clearCart, location.pathname, navigate, state.orderPayload, state.pending, state.placementId])

  const whatsappUrl = orderRef
    ? getWhatsAppUrl(`Hi, I placed order ${orderRef}. Please confirm my delivery details.`)
    : getWhatsAppUrl()

  return (
    <section className="w-full bg-white">
      <Seo
        title="Thank You"
        description={
          isPlacing
            ? 'We are confirming your order.'
            : placeError
              ? 'There was a problem placing your order.'
              : 'Your order has been placed successfully.'
        }
      />
      <div className="mx-auto max-w-[900px] px-4 py-14 sm:py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center sm:p-10">
          {isPlacing ? (
            <>
              <div className="text-sm font-semibold tracking-wide text-[#2f5d3a]">PLEASE WAIT</div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Placing your order…
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                This usually takes a few seconds. Please keep this page open.
              </p>
              <div className="mx-auto mt-8 h-10 w-10 animate-spin rounded-full border-2 border-[#2f5d3a]/20 border-t-[#2f5d3a]" />
            </>
          ) : placeError ? (
            <>
              <div className="text-sm font-semibold tracking-wide text-red-600">ORDER NOT PLACED</div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                We couldn&apos;t save your order
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                {placeError}
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  to="/checkout"
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-[#2f5d3a] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#264d30]"
                >
                  Back to checkout
                </Link>
                <a
                  href={getWhatsAppUrl('Hi, I had trouble placing my order on the website. Can you help?')}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1fb855]"
                >
                  <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                  WhatsApp us
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="text-sm font-semibold tracking-wide text-[#2f5d3a]">ORDER CONFIRMED</div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Thank you! Your order has been placed.
              </h1>

              {orderRef ? (
                <div className="mx-auto mt-5 max-w-md rounded-xl border border-[#2f5d3a]/20 bg-[#2f5d3a]/[0.04] px-5 py-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Your order number
                  </div>
                  <div className="mt-1 text-2xl font-bold tracking-wide text-[#0f3d37]">{orderRef}</div>
                  {typeof total === 'number' ? (
                    <div className="mt-2 text-sm text-slate-600">
                      Total: <span className="font-semibold text-slate-900">{formatPricePKR(total)}</span>
                      {' '}— Cash on Delivery
                    </div>
                  ) : null}
                </div>
              ) : null}

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                We&apos;ll call or WhatsApp you shortly to confirm your delivery details.
                {orderRef ? ' Save your order number in case you need help.' : ''}
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1fb855] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/40"
                >
                  <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                  {orderRef ? 'Confirm on WhatsApp' : 'Chat on WhatsApp'}
                </a>
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
            </>
          )}
        </div>
      </div>
    </section>
  )
}
