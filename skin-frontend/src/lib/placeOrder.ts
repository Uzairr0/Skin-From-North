import { API_URL } from '../config/api'

export type OrderPayload = {
  customer: {
    name: string
    email: string
    phone: string
    address: string
    city: string
  }
  items: Array<{
    productId: number
    name: string
    price: number
    quantity: number
    image: string
  }>
  paymentMethod: 'cod' | 'card'
  total: number
}

export type PlaceOrderResult = {
  orderRef: string
  total: number
}

export async function placeOrder(payload: OrderPayload): Promise<PlaceOrderResult> {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = (await res.json().catch(() => null)) as {
    orderRef?: string
    order?: { total?: number }
    message?: string
  } | null

  if (!res.ok) {
    const msg =
      (data && typeof data.message === 'string' && data.message) ||
      `Failed to place order (HTTP ${res.status})`
    throw new Error(msg)
  }

  return {
    orderRef: typeof data?.orderRef === 'string' ? data.orderRef : '',
    total: typeof data?.order?.total === 'number' ? data.order.total : payload.total,
  }
}
