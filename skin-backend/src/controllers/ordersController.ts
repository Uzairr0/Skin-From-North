import type { Request, Response } from 'express'
import { OrderModel } from '../models/Order'
import { sendEmail } from '../utils/sendEmail'
import { orderConfirmationEmail } from '../utils/orderConfirmationEmail'

export async function createOrder(req: Request, res: Response) {
  try {
    const { customer, items, total } = req.body as {
      customer: unknown
      items: unknown
      total: unknown
    }

    // Minimal runtime validation (keeps it API-ready without adding a validation library yet)
    if (!customer || typeof customer !== 'object') {
      return res.status(400).json({ ok: false, message: 'Invalid customer' })
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ ok: false, message: 'Items are required' })
    }
    const totalNumber = Number(total)
    if (!Number.isFinite(totalNumber) || totalNumber < 0) {
      return res.status(400).json({ ok: false, message: 'Invalid total' })
    }

    const created = await OrderModel.create({
      customer: customer as any,
      items: items as any,
      total: totalNumber,
    })

    // Send order confirmation email (do not fail the order if email fails)
    try {
      const c = created.customer as any
      const orderItems = (created.items as any[]).map((i) => {
        const name = String(i?.name ?? '')
        const qty = Number(i?.quantity ?? 0)
        const price = Number(i?.price ?? 0)
        return { name, qty, price }
      })

      const html = orderConfirmationEmail({
        customerName: String(c?.name ?? 'Customer'),
        items: orderItems.map((i) => ({ name: i.name, quantity: i.qty, price: i.price })),
        total: totalNumber,
        contactEmail: 'admin@skinfromnorth.com',
      })

      if (typeof c?.email === 'string' && c.email.trim()) {
        await sendEmail({
          to: c.email.trim(),
          subject: 'Order Confirmation - Skin From North',
          html,
        })
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Order email failed:', e instanceof Error ? e.message : e)
    }

    return res.status(201).json({
      ok: true,
      order: created,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create order'
    return res.status(400).json({ ok: false, message })
  }
}

export async function listOrders(_req: Request, res: Response) {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 }).lean()
    return res.status(200).json({ ok: true, orders })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch orders'
    return res.status(500).json({ ok: false, message })
  }
}

export async function updateOrderStatus(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { status } = (req.body ?? {}) as { status?: unknown }
    const next = typeof status === 'string' ? status : ''

    if (!['Pending', 'Confirmed', 'Delivered'].includes(next)) {
      return res.status(400).json({ ok: false, message: 'Invalid status' })
    }

    const updated = await OrderModel.findByIdAndUpdate(
      id,
      { status: next },
      { new: true },
    ).lean()

    if (!updated) return res.status(404).json({ ok: false, message: 'Order not found' })
    return res.status(200).json({ ok: true, order: updated })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update order'
    return res.status(500).json({ ok: false, message })
  }
}

