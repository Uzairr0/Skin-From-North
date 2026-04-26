import { connectDb } from '../config/db'
import { ProductModel } from '../models/Product'

async function seed() {
  await connectDb()

  const products = [
    {
      name: 'Niacinamide 10% Zinc',
      brand: 'The Ordinary',
      price: 2200,
      skinType: 'All Skin Types',
      image: 'niacinamide-10-zinc.png',
    },
    {
      name: 'Salicylic Acid 2%',
      brand: 'The Ordinary',
      price: 2900,
      skinType: 'Acne',
      image: 'salicylic-acid-2.png',
    },
    {
      name: 'Glycolic Acid 7% Toner',
      brand: 'The Ordinary',
      price: 3500,
      skinType: 'All Skin Types',
      image: 'glycolic-acid-7-toner.png',
    },
    {
      name: 'Alpha Arbutin 2% HA',
      brand: 'The Ordinary',
      price: 4900,
      skinType: 'Oily',
      image: 'alpha-arbutin-2-ha.png',
    },
  ]

  await ProductModel.deleteMany({})
  await ProductModel.insertMany(products)
  // eslint-disable-next-line no-console
  console.log(`Seeded ${products.length} products`)
  process.exit(0)
}

seed().catch((e) => {
  // eslint-disable-next-line no-console
  console.error('Seed failed:', e)
  process.exit(1)
})

