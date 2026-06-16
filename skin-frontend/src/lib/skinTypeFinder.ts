import type { Product } from '../data/product'
import { products } from '../data/product'

export type FinderSkinType = 'Oily' | 'Dry' | 'Acne' | 'Sensitive'

export function isFinderSkinType(value: string | null): value is FinderSkinType {
  return value === 'Oily' || value === 'Dry' || value === 'Acne' || value === 'Sensitive'
}

const recommendations: Record<FinderSkinType, number[]> = {
  Oily: [1, 2, 3],
  Dry: [4, 1],
  Acne: [2, 1],
  Sensitive: [1, 4],
}

export function getRecommendedProducts(skinType: FinderSkinType): Product[] {
  return recommendations[skinType]
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p))
}

export const finderSkinTypes: {
  id: FinderSkinType
  label: string
  hint: string
}[] = [
  { id: 'Oily', label: 'Oily Skin', hint: 'Shiny T-zone, enlarged pores' },
  { id: 'Dry', label: 'Dry Skin', hint: 'Tight, flaky, or dull skin' },
  { id: 'Acne', label: 'Acne Prone', hint: 'Breakouts, blackheads, clogged pores' },
  { id: 'Sensitive', label: 'Sensitive Skin', hint: 'Easily irritated or reactive' },
]
