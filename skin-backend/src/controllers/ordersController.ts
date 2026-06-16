import type { Request, Response } from 'express'
import mongoose from 'mongoose'
import { validateOrderItems } from '../data/catalog'
import { env } from '../config/env'
import { OrderModel } from '../models/Order'
import { sendEmail } from '../utils/sendEmail'
import { orderConfirmationEmail } from '../utils/orderConfirmationEmail'
import { adminNewOrderEmail } from '../utils/adminNewOrderEmail'

function formatOrderRef(id: string) {
  return `SFN-${id.slice(-8).toUpperCase()}`
}

async function sendOrderEmails(opts: {
  customer: Record<string, unknown>
  orderRef: string
  orderItems: Array<{ name: string; quantity: number; price: number }>
  total: number
  payment: 'cod' | 'card'
}) {
  const { customer: c, orderRef, orderItems, total, payment } = opts

  try {
    const html = orderConfirmationEmail({
      customerName: String(c?.name ?? 'Customer'),
      orderRef,
      items: orderItems,
      total,
      contactEmail: 'skinfromnorth@gmail.com',
      contactPhone: '+923184263597',
    })

    if (typeof c?.email === 'string' && c.email.trim()) {
      await sendEmail({
        to: c.email.trim(),
        subject: `Order Confirmation ${orderRef} — Skin From North`,
        html,
      })
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Order email failed:', e instanceof Error ? e.message : e)
  }

  try {
    const adminHtml = adminNewOrderEmail({
      orderRef,
      customerName: String(c?.name ?? 'Customer'),
      customerPhone: String(c?.phone ?? ''),
      customerCity: String(c?.city ?? ''),
      items: orderItems,
      total,
      paymentMethod: payment === 'cod' ? 'Cash on Delivery' : 'Card',
    })

    await sendEmail({
      to: env.adminNotifyEmail,
      subject: `New order ${orderRef} — Skin From North`,
      html: adminHtml,
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Admin order alert failed:', e instanceof Error ? e.message : e)
  }
}

export async function createOrder(req: Request, res: Response) {
  try {
    const { customer, items, paymentMethod } = req.body as {
      customer: unknown
      items: unknown
      paymentMethod?: unknown
      total?: unknown
    }

    if (!customer || typeof customer !== 'object') {
      return res.status(400).json({ ok: false, message: 'Invalid customer' })
    }

    const priced = validateOrderItems(items)
    if ('error' in priced) {
      return res.status(400).json({ ok: false, message: priced.error })
    }

    const payment =
      paymentMethod === 'card' || paymentMethod === 'cod' ? paymentMethod : 'cod'

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        ok: false,
        message:
          'Order service is temporarily unavailable (database). Please try again in a few minutes.',
      })
    }

    const created = await OrderModel.create({
      customer: customer as any,
      items: priced.items,
      total: priced.total,
      paymentMethod: payment,
    })

    const orderRef = formatOrderRef(String(created._id))
    const c = created.customer as any
    const orderItems = priced.items.map((i) => ({
      name: i.name,
      quantity: i.quantity,
      price: i.price,
    }))

    // Respond immediately — emails run in the background so checkout feels fast.
    void sendOrderEmails({
      customer: c as Record<string, unknown>,
      orderRef,
      orderItems,
      total: priced.total,
      payment,
    })

    return res.status(201).json({
      ok: true,
      orderRef,
      order: { total: priced.total },
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
