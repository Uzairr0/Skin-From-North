export const DELIVERY_FEE = 250
export const FREE_DELIVERY_MIN_SUBTOTAL = 8000
export const LAHORE_ONLY_MESSAGE = 'We currently only deliver in Lahore only'

export type CartLine = { quantity: number; price: number }

export function formatPricePKR(value: number) {
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

export function getCartItemCount(items: Array<{ quantity: number }>) {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function getCartSubtotal(items: CartLine[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function isLahore(city: string) {
  return city.trim().toLowerCase() === 'lahore'
}

export function calculateDelivery(subtotal: number) {
  const qualifiesFree = subtotal >= FREE_DELIVERY_MIN_SUBTOTAL
  const deliveryFee = qualifiesFree ? 0 : DELIVERY_FEE
  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    qualifiesFree,
  }
}

export const FREE_DELIVERY_HINT = 'Free delivery on orders of Rs. 8,000 or above'

export const DELIVERY_NOTE = 'Delivery: Rs. 250 (Free above Rs. 8000)'
