import { escapeHtml } from './orderConfirmationEmail'

export function adminNewOrderEmail(opts: {
  orderRef: string
  customerName: string
  customerPhone: string
  customerCity: string
  items: Array<{ name: string; quantity: number; price: number }>
  total: number
  paymentMethod: string
}) {
  const itemsRows = opts.items
    .map(
      (i) =>
        `<li>${escapeHtml(i.name)} × ${i.quantity} — Rs ${i.price * i.quantity}</li>`,
    )
    .join('')

  return `<!doctype html>
<html><body style="font-family:Arial,sans-serif;color:#0f172a;">
  <h2 style="color:#2f5d3a;">New order — ${escapeHtml(opts.orderRef)}</h2>
  <p><strong>Customer:</strong> ${escapeHtml(opts.customerName)}</p>
  <p><strong>Phone:</strong> ${escapeHtml(opts.customerPhone)}</p>
  <p><strong>City:</strong> ${escapeHtml(opts.customerCity)}</p>
  <p><strong>Payment:</strong> ${escapeHtml(opts.paymentMethod)}</p>
  <ul>${itemsRows}</ul>
  <p><strong>Total:</strong> Rs ${opts.total}</p>
  <p style="color:#64748b;font-size:13px;">Log in to the admin panel to confirm this order.</p>
</body></html>`
}
