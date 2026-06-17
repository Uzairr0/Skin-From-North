export type ProductGuide = {
  whoShouldUse: string
  howToUse: string[]
  resultsTimeline: string
  keyBenefits: string[]
}

export type Product = {
  id: number
  name: string
  brand: 'CeraVe' | 'Cetaphil' | 'The Ordinary'
  price: number
  rating: number
  skinType: 'All Skin Types' | 'Oily' | 'Dry' | 'Acne' | 'Sensitive'
  benefit: string
  image: string
  usage: ProductGuide
}

export function skinTypeLabel(skinType: Product['skinType']): string {
  const labels: Record<Product['skinType'], string> = {
    'All Skin Types': 'All skin types',
    Oily: 'Oily skin',
    Dry: 'Dry skin',
    Acne: 'Acne prone',
    Sensitive: 'Sensitive skin',
  }
  return labels[skinType]
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
    rating: 4.8,
    skinType: 'All Skin Types',
    benefit: 'Reduces pores & balances oil',
    image: niacinamideZinc,
    usage: {
      whoShouldUse:
        'Best for oily, combination, or acne-prone skin. Also good if your skin gets shiny in Pakistan\'s heat or pores look large.',
      howToUse: [
        'Wash your face with a gentle cleanser and pat dry.',
        'Apply 2–3 drops to your full face (avoid the eye area).',
        'Use once daily — morning or night — before moisturizer.',
        'Always wear sunscreen in the morning.',
      ],
      resultsTimeline:
        '7–14 days for less oily shine. 4–6 weeks for smoother, clearer-looking skin.',
      keyBenefits: [
        'Controls excess oil',
        'Makes pores look smaller',
        'Helps fade acne marks',
        'Lightweight — easy for daily use',
      ],
    },
  },
  {
    id: 2,
    name: 'Salicylic Acid 2%',
    brand: 'The Ordinary',
    price: 2900,
    rating: 4.6,
    skinType: 'Acne',
    benefit: 'Fights acne & oil control',
    image: salicylicAcid,
    usage: {
      whoShouldUse:
        'Made for acne-prone and oily skin — especially if you get pimples, blackheads, or clogged pores.',
      howToUse: [
        'Cleanse your face and wait until skin is fully dry.',
        'Apply a thin layer on problem areas (or full face if needed).',
        'Start 2–3 nights per week, then slowly use more often.',
        'Use sunscreen every morning — this is very important.',
      ],
      resultsTimeline:
        '7–14 days for fewer new breakouts. 4–8 weeks for noticeably clearer skin.',
      keyBenefits: [
        'Unclogs pores',
        'Reduces pimples and blackheads',
        'Controls oil through the day',
        'Great for humid weather breakouts',
      ],
    },
  },
  {
    id: 3,
    name: 'Glycolic Acid 7% Toner',
    brand: 'The Ordinary',
    price: 3500,
    rating: 4.5,
    skinType: 'All Skin Types',
    benefit: 'Brightens skin & smooths texture',
    image: glycolicToner,
    usage: {
      whoShouldUse:
        'Good for dull skin, rough texture, or uneven tone. Not recommended for very sensitive or broken skin.',
      howToUse: [
        'Use only at night, after cleansing.',
        'Soak a cotton pad and gently wipe across your face (skip eyes).',
        'Do not rinse — apply moisturizer right after.',
        'Start 2–3 times per week. Always use sunscreen every morning.',
      ],
      resultsTimeline:
        '7–14 days for brighter, smoother-feeling skin. 4–6 weeks for more even-looking tone.',
      keyBenefits: [
        'Removes dead skin cells',
        'Brightens dull-looking skin',
        'Smooths rough patches',
        'Helps other products absorb better',
      ],
    },
  },
  {
    id: 4,
    name: 'Alpha Arbutin 2% HA',
    brand: 'The Ordinary',
    price: 4900,
    rating: 4.7,
    skinType: 'All Skin Types',
    benefit: 'Fades dark spots & evens tone',
    image: alphaArbutin,
    usage: {
      whoShouldUse:
        'Ideal for dark spots, acne marks, or uneven skin tone. Safe for most skin types, including beginners.',
      howToUse: [
        'Apply on clean, dry skin after washing your face.',
        'Use 2–3 drops on your face — dab extra on dark spots.',
        'Use once daily, morning or night, before moisturizer.',
        'Wear sunscreen every morning to protect results.',
      ],
      resultsTimeline:
        '2–4 weeks for early fading. 8–12 weeks for visible improvement on dark spots.',
      keyBenefits: [
        'Fades dark spots and acne marks',
        'Evens out skin tone',
        'Adds hydration with hyaluronic acid',
        'Gentle enough for everyday use',
      ],
    },
  },
]