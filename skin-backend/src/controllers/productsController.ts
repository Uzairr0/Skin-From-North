import type { Request, Response } from 'express'
import { ProductModel } from '../models/Product'

export async function listProducts(_req: Request, res: Response) {
  try {
    const products = await ProductModel.find().sort({ createdAt: -1 }).lean()
    return res.status(200).json({ ok: true, products })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch products'
    return res.status(500).json({ ok: false, message })
  }
}

