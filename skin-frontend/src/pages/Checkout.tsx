import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Seo from '../components/Seo'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import {
  DeliveryInfoBanner,
  OrderTotalsSummary,
  useOrderTotals,
} from '../components/OrderTotalsSummary'
import type { OrderPayload } from '../lib/placeOrder'
import { formatPricePKR, isLahore, LAHORE_ONLY_MESSAGE } from '../lib/pricing'

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
  const { items } = useCart()
  const [payment, setPayment] = useState<'cod' | 'card'>('cod')
  const [form, setForm] = useState<FormState>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: 'Lahore',
    phone: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const { subtotal, deliveryFee, total } = useOrderTotals(items)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const nextErrors: Partial<Record<keyof FormState, string>> = {}
    const required: Array<keyof FormState> = ['email', 'firstName', 'lastName', 'address', 'city', 'phone']

    for (const key of required) {
      if (!form[key].trim()) nextErrors[key] = 'This field is required.'
    }

    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (form.city.trim() && !isLahore(form.city)) {
      nextErrors.city = LAHORE_ONLY_MESSAGE
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    const payload: OrderPayload = {
      customer: {
        name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
      },
      items: items.map((i) => ({
        productId: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
      })),
      paymentMethod: payment,
      subtotal,
      deliveryFee,
      total,
    }

    navigate('/thank-you', {
      replace: true,
      state: {
        pending: true,
        placementId: crypto.randomUUID(),
        orderPayload: payload,
        total,
      },
    })
  }

  const deliveryLabel = useMemo(
    () => (deliveryFee === 0 ? 'Free' : formatPricePKR(deliveryFee)),
    [deliveryFee],
  )

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
              Enter your details to place the order. Delivery in Lahore only.
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
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7"
            >
              <div className="text-sm font-semibold text-slate-900">Contact & shipping</div>

              <DeliveryInfoBanner className="mt-4" />

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

                <div>
                  <label className="block">
                    <div className="text-xs font-medium text-slate-700">City</div>
                    <select
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.city)}
                      className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2f5d3a]/20"
                    >
                      <option value="Lahore">Lahore</option>
                    </select>
                    {errors.city ? (
                      <div className="mt-1 text-xs font-medium text-red-600">{errors.city}</div>
                    ) : (
                      <p className="mt-1.5 text-xs text-slate-500">We currently deliver in Lahore only.</p>
                    )}
                  </label>
                </div>

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

              <div className="mt-7">
                <div className="text-sm font-semibold text-slate-900">Delivery</div>
                <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Lahore delivery</div>
                      <div className="mt-1 text-sm text-slate-600">
                        Delivered in a few working days within Lahore.
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">{deliveryLabel}</div>
                  </div>
                </div>
              </div>

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

              <Button type="submit" className="mt-8 w-full">
                Place Order
              </Button>
            </form>

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
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <OrderTotalsSummary items={items} />
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}
