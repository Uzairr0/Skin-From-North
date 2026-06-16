import ceraveLogo from '../assets/CeraVe_logo.png'
import cetaphilLogo from '../assets/Cetaphil_logo.png'
import ordinaryLogo from '../assets/The Ordinary_logo.png'
import type { Product } from './product'
import { products } from './product'

export type BrandId = Product['brand']

export type BrandDefinition = {
  id: BrandId
  name: string
  logo: string
  status: 'available' | 'coming_soon'
}

export const brands: BrandDefinition[] = [
  {
    id: 'The Ordinary',
    name: 'The Ordinary',
    logo: ordinaryLogo,
    status: 'available',
  },
  {
    id: 'CeraVe',
    name: 'CeraVe',
    logo: ceraveLogo,
    status: 'coming_soon',
  },
  {
    id: 'Cetaphil',
    name: 'Cetaphil',
    logo: cetaphilLogo,
    status: 'coming_soon',
  },
]

export function getAvailableBrandIds(): BrandId[] {
  return [...new Set(products.map((p) => p.brand))]
}

export function isBrandAvailable(brandId: BrandId): boolean {
  return getAvailableBrandIds().includes(brandId)
}
