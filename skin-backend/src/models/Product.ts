import { Schema, model } from 'mongoose'

export type ProductDoc = {
  name: string
  brand: string
  price: number
  skinType: string
  image: string
  createdAt: Date
  updatedAt: Date
}

const productSchema = new Schema<ProductDoc>(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    skinType: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

export const ProductModel = model<ProductDoc>('Product', productSchema)

