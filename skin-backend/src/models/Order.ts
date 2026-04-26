import { Schema, model } from 'mongoose'

export type OrderCustomer = {
  name: string
  email: string
  phone: string
  address: string
  city: string
}

export type OrderItem = {
  name: string
  price: number
  quantity: number
  image: string
}

export type OrderDoc = {
  customer: OrderCustomer
  items: OrderItem[]
  total: number
  status: 'Pending' | 'Confirmed' | 'Delivered'
  createdAt: Date
  updatedAt: Date
}

const customerSchema = new Schema<OrderCustomer>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
  },
  { _id: false },
)

const itemSchema = new Schema<OrderItem>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String, required: true, trim: true },
  },
  { _id: false },
)

const orderSchema = new Schema<OrderDoc>(
  {
    customer: { type: customerSchema, required: true },
    items: { type: [itemSchema], required: true },
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Confirmed', 'Delivered'],
      default: 'Pending',
    },
  },
  { timestamps: true },
)

export const OrderModel = model<OrderDoc>('Order', orderSchema)

