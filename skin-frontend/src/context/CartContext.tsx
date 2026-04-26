import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

export type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

type AddToCartProduct = Omit<CartItem, 'quantity'>

type CartContextValue = {
  items: CartItem[]
  addToCart: (product: AddToCartProduct, quantity?: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'skin.cart.v1'

function readStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed as CartItem[]
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStoredCart())

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore (storage full / blocked)
    }
  }, [items])

  const addToCart: CartContextValue['addToCart'] = (product, quantity = 1) => {
    const qty = Math.max(1, Math.floor(quantity))
    setItems((prev) => {
      const existing = prev.find((x) => x.id === product.id)
      if (!existing) return [...prev, { ...product, quantity: qty }]
      return prev.map((x) => (x.id === product.id ? { ...x, quantity: x.quantity + qty } : x))
    })
    toast.success(`${product.name} added to cart`, { duration: 2000 })
  }

  const removeFromCart: CartContextValue['removeFromCart'] = (id) => {
    const removed = items.find((x) => x.id === id)
    setItems((prev) => prev.filter((x) => x.id !== id))
    if (removed) toast.success(`${removed.name} removed from cart`, { duration: 2000 })
  }

  const clearCart: CartContextValue['clearCart'] = () => {
    setItems([])
  }

  const value = useMemo<CartContextValue>(
    () => ({ items, addToCart, removeFromCart, clearCart }),
    [items],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}

