import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Seo from '../components/Seo'
import { useGlobalError } from '../context/ErrorContext'
import { ADMIN_TOKEN_STORAGE_KEY } from './AdminLogin'

type OrderStatus = 'Pending' | 'Confirmed' | 'Delivered'

type OrderItem = {
  name: string
  price: number
  quantity: number
  image: string
}

type OrderCustomer = {
  name: string
  email: string
  phone: string
  address: string
  city: string
}

type Order = {
  _id: string
  customer: OrderCustomer
  items: OrderItem[]
  total: number
  status?: OrderStatus
  createdAt: string
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

function formatDate(value: string) {
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleString()
}

function formatOrderNo(index: number) {
  return new Intl.NumberFormat('en', { minimumIntegerDigits: 4 }).format(index + 1)
}

function statusPillClass(status: OrderStatus) {
  switch (status) {
    case 'Delivered':
      return 'bg-emerald-50 text-emerald-800 ring-emerald-200'
    case 'Confirmed':
      return 'bg-blue-50 text-blue-800 ring-blue-200'
    default:
      return 'bg-amber-50 text-amber-900 ring-amber-200'
  }
}

export default function AdminOrders() {
  const navigate = useNavigate()
  const { reportError } = useGlobalError()
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setIsLoading(true)
      try {
        const token = localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY)
        if (!token) {
          navigate('/admin/login')
          return
        }

        const res = await fetch('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = (await res.json().catch(() => null)) as any
        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY)
            navigate('/admin/login')
            return
          }
          const msg =
            (data && typeof data.message === 'string' && data.message) ||
            `Failed to fetch orders (HTTP ${res.status})`
          throw new Error(msg)
        }

        const list = (data && Array.isArray(data.orders) ? data.orders : []) as Order[]
        if (!cancelled) setOrders(list)
      } catch (err) {
        reportError(err, { action: 'fetch orders' })
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [reportError, navigate])

  const rows = useMemo(() => {
    return orders.map((o, idx) => {
      const products = o.items
        .map((i) => `${i.name} ×${i.quantity}`)
        .join(', ')
      return { o, products, idx }
    })
  }, [orders])

  const updateStatus = async (orderId: string, next: OrderStatus) => {
    const token = localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY)
    if (!token) {
      navigate('/admin/login')
      return
    }
    if (updatingId) return
    setUpdatingId(orderId)
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: next }),
      })
      const data = (await res.json().catch(() => null)) as any
      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY)
          navigate('/admin/login')
          return
        }
        throw new Error((data && data.message) || `Failed to update status (HTTP ${res.status})`)
      }
      setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status: next } : o)))
    } catch (err) {
      reportError(err, { action: 'update order status' })
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <section className="w-full bg-white">
      <Seo title="Admin Orders" description="View all customer orders." />

      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:py-16">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-semibold tracking-[0.22em] text-[#2f5d3a]">ADMIN</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Orders
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              All orders placed from checkout. Make sure the backend is running on port 5000.
            </p>
          </div>

          <div className="text-sm text-slate-600">
            {isLoading ? 'Loading…' : (
              <>
                <span className="font-semibold text-slate-900">{orders.length}</span> orders
              </>
            )}
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  <th className="px-5 py-4">Order #</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Phone</th>
                  <th className="px-5 py-4">Address</th>
                  <th className="px-5 py-4">Products</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Order date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {isLoading ? (
                  <tr>
                    <td className="px-5 py-8 text-slate-600" colSpan={8}>
                      Loading orders…
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td className="px-5 py-8 text-slate-600" colSpan={8}>
                      No orders yet.
                    </td>
                  </tr>
                ) : (
                  rows.map(({ o, products, idx }) => {
                    const status: OrderStatus = o.status ?? 'Pending'
                    const isUpdating = updatingId === o._id
                    return (
                    <tr key={o._id} className="align-top">
                      <td className="px-5 py-4">
                        <div className="font-semibold tabular-nums text-slate-900">{formatOrderNo(idx)}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-900">{o.customer?.name ?? '—'}</div>
                        <div className="mt-1 text-xs text-slate-600">{o.customer?.email ?? ''}</div>
                      </td>
                      <td className="px-5 py-4 text-slate-700">{o.customer?.phone ?? '—'}</td>
                      <td className="px-5 py-4 text-slate-700">
                        <div className="max-w-[320px]">
                          <div className="truncate">{o.customer?.address ?? '—'}</div>
                          <div className="mt-1 text-xs text-slate-600">{o.customer?.city ?? ''}</div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-700">
                        <div className="max-w-[420px] whitespace-normal leading-relaxed">
                          {products || '—'}
                        </div>
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {formatPricePKR(Number(o.total ?? 0))}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={[
                              'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1',
                              statusPillClass(status),
                            ].join(' ')}
                          >
                            {status}
                          </span>

                          <div className="inline-flex overflow-hidden rounded-lg border border-slate-200 bg-white">
                            {(['Pending', 'Confirmed', 'Delivered'] as OrderStatus[]).map((s) => (
                              <button
                                key={s}
                                type="button"
                                disabled={isUpdating}
                                onClick={() => updateStatus(o._id, s)}
                                className={[
                                  'px-2.5 py-1 text-xs font-semibold transition-colors',
                                  s === status ? 'bg-slate-900/5 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                                  isUpdating ? 'opacity-60' : '',
                                ].join(' ')}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-700">{formatDate(o.createdAt)}</td>
                    </tr>
                  )})
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

