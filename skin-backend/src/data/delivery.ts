export const DELIVERY_FEE = 250
export const FREE_DELIVERY_MIN_SUBTOTAL = 8000
export const FREE_DELIVERY_MIN_PRODUCTS = 2
export const LAHORE_ONLY_MESSAGE = 'Sorry, we currently only deliver in Lahore.'

export function isLahore(city: string) {
  return city.trim().toLowerCase() === 'lahore'
}

export function calculateDelivery(subtotal: number, itemCount: number) {
  const qualifiesFree =
    itemCount >= FREE_DELIVERY_MIN_PRODUCTS && subtotal >= FREE_DELIVERY_MIN_SUBTOTAL
  const deliveryFee = qualifiesFree ? 0 : DELIVERY_FEE
  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    qualifiesFree,
  }
}
