export type Product = {
  id: number
  name: string
  brand: 'CeraVe' | 'Cetaphil' | 'The Ordinary'
  price: number
  skinType: 'All Skin Types' | 'Oily' | 'Dry' | 'Acne' | 'Sensitive'
  image: string
}

import alphaArbutin from '../assets/alpha-arbutin-2-ha.png'
import glycolicToner from '../assets/glycolic-acid-7-toner.png'
import niacinamideZinc from '../assets/niacinamide-10-zinc.png'
import salicylicAcid from '../assets/salicylic-acid-2.png'

export const products: Product[] = [
  {
    id: 1,
    name: 'Niacinamide 10% Zinc',
    brand: 'The Ordinary',
    price: 2200,
    skinType: 'All Skin Types',
    image: niacinamideZinc,
  },
  {
    id: 2,
    name: 'Salicylic Acid 2%',
    brand: 'The Ordinary',
    price: 2900,
    skinType: 'Acne',
    image: salicylicAcid,
  },
  {
    id: 3,
    name: 'Glycolic Acid 7% Toner',
    brand: 'The Ordinary',
    price: 3500,
    skinType: 'All Skin Types',
    image: glycolicToner,
  },
  {
    id: 4,
    name: 'Alpha Arbutin 2% HA',
    brand: 'The Ordinary',
    price: 4900,
    skinType: 'All Skin Types',
    image: alphaArbutin,
  },
]