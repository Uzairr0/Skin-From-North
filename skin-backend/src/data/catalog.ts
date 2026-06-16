export type CatalogProduct = {
  id: number
  name: string
  price: number
}

/** Authoritative product prices — keep in sync with skin-frontend/src/data/product.ts */
export const PRODUCT_CATALOG: Record<number, CatalogProduct> = {
  1: { id: 1, name: 'Niacinamide 10% Zinc', price: 2200 },
  2: { id: 2, name: 'Salicylic Acid 2%', price: 2900 },
  3: { id: 3, name: 'Glycolic Acid 7% Toner', price: 3500 },
  4: { id: 4, name: 'Alpha Arbutin 2% HA', price: 4900 },
}

export type IncomingOrderItem = {
  productId?: unknown
  name?: unknown
  price?: unknown
  quantity?: unknown
  image?: unknown
}

export type ValidatedOrderItem = {
  productId: number
  name: string
  price: number
  quantity: number
  image: string
}

export function validateOrderItems(
  items: unknown,
): { items: ValidatedOrderItem[]; total: number } | { error: string } {
  if (!Array.isArray(items) || items.length === 0) {
    return { error: 'Items are required' }
  }

  const validated: ValidatedOrderItem[] = []

  for (const raw of items) {
    if (!raw || typeof raw !== 'object') return { error: 'Invalid item in cart' }

    const item = raw as IncomingOrderItem
    const productId = Number(item.productId)
    const quantity = Math.floor(Number(item.quantity))

    if (!Number.isInteger(productId) || !PRODUCT_CATALOG[productId]) {
      return { error: 'One or more products are invalid or no longer available' }
    }
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > 20) {
      return { error: 'Invalid quantity for an item' }
    }

    const catalog = PRODUCT_CATALOG[productId]
    const image = typeof item.image === 'string' ? item.image.trim() : ''

    validated.push({
      productId,
      name: catalog.name,
      price: catalog.price,
      quantity,
      image,
    })
  }

  const total = validated.reduce((sum, i) => sum + i.price * i.quantity, 0)
  return { items: validated, total }
}
