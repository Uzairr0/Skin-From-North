import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useGlobalError } from '../context/ErrorContext'
import Seo from '../components/Seo'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { API_URL } from '../config/api'

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

type FormState = {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  phone: string
}

export default function Checkout() {
  const navigate = useNavigate()
  const { items, clearCart } = useCart()
  const { reportError } = useGlobalError()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [payment, setPayment] = useState<'cod' | 'card'>('cod')
  const [form, setForm] = useState<FormState>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phone: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const submitTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (submitTimerRef.current !== null) window.clearTimeout(submitTimerRef.current)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      const key = name as keyof FormState
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    const nextErrors: Partial<Record<keyof FormState, string>> = {}
    const required: Array<keyof FormState> = ['email', 'firstName', 'lastName', 'address', 'city', 'phone']

    for (const key of required) {
      if (!form[key].trim()) nextErrors[key] = 'This field is required.'
    }

    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        customer: {
          name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
        },
        items: items.map((i) => ({
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
        })),
        total,
      }

      const res = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = (await res.json().catch(() => null)) as any
      if (!res.ok) {
        const msg =
          (data && typeof data.message === 'string' && data.message) ||
          `Failed to place order (HTTP ${res.status})`
        throw new Error(msg)
      }

      clearCart()
      navigate('/thank-you')
    } catch (err) {
      reportError(err, { action: 'place order' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  )

  const total = subtotal // standard delivery free

  return (
    <section className="w-full bg-white">
      <Seo title="Checkout" description="Enter your details to place your order securely." />
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:py-16">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Checkout
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Enter your details to place the order.
            </p>
          </div>
          <Link
            to="/cart"
            className="text-sm font-medium text-slate-700 underline-offset-4 hover:text-slate-900 hover:underline"
          >
            Back to cart
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <div className="text-sm font-semibold text-slate-900">Your cart is empty</div>
            <div className="mt-2 text-sm text-slate-600">Add items before checking out.</div>
            <Link
              to="/shop"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-[#2f5d3a] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#264d30] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/30"
            >
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left: form */}
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7"
            >
              <div className="text-sm font-semibold text-slate-900">Contact & shipping</div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Input
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="you@example.com"
                    error={errors.email}
                  />
                </div>

                <Input
                  label="First name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  type="text"
                  placeholder="First name"
                  error={errors.firstName}
                />

                <Input
                  label="Last name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Last name"
                  error={errors.lastName}
                />

                <div className="sm:col-span-2">
                  <Input
                    label="Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    type="text"
                    placeholder="House no, street, area"
                    error={errors.address}
                  />
                </div>

                <Input
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  type="text"
                  placeholder="City"
                  error={errors.city}
                />

                <Input
                  label="Phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="+92 3xx xxx xxxx"
                  error={errors.phone}
                />
              </div>

              {/* Shipping */}
              <div className="mt-7">
                <div className="text-sm font-semibold text-slate-900">Shipping</div>
                <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Standard delivery</div>
                      <div className="mt-1 text-sm text-slate-600">Delivered in a few working days.</div>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">Free</div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="mt-7">
                <div className="text-sm font-semibold text-slate-900">Payment</div>
                <div className="mt-3 space-y-3">
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={payment === 'cod'}
                      onChange={() => setPayment('cod')}
                      className="mt-1 h-4 w-4 text-[#2f5d3a] focus:ring-[#2f5d3a]/20"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900">Cash on Delivery</div>
                      <div className="mt-1 text-sm text-slate-600">Pay when you receive your order.</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 opacity-70">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      disabled
                      checked={payment === 'card'}
                      onChange={() => setPayment('card')}
                      className="mt-1 h-4 w-4 text-[#2f5d3a] focus:ring-[#2f5d3a]/20"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900">
                        Card (coming soon)
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        Online payments will be available shortly.
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="mt-8 w-full"
                isLoading={isSubmitting}
                loadingText="Placing order..."
              >
                Place Order
              </Button>
            </form>

            {/* Right: summary */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="text-sm font-semibold text-slate-900">Order summary</div>

                <ul className="mt-5 space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-start gap-3">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-200/70">
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
                        <div className="truncate text-sm font-semibold text-slate-900">{item.name}</div>
                        <div className="mt-1 text-sm text-slate-600">
                          Qty {item.quantity} • {formatPricePKR(item.price)}
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-slate-900">
                        {formatPricePKR(item.price * item.quantity)}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between text-sm text-slate-700">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">{formatPricePKR(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-700">
                    <span>Shipping</span>
                    <span className="font-semibold text-slate-900">Free</span>
                  </div>
                  <div className="h-px w-full bg-slate-200" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-900">Total</span>
                    <span className="text-lg font-semibold text-slate-900">{formatPricePKR(total)}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}

