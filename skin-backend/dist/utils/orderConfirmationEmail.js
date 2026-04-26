"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderConfirmationEmail = orderConfirmationEmail;
function escapeHtml(input) {
    return input
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}
function orderConfirmationEmail(opts) {
    const accent = '#2f5d3a';
    const bg = '#f6f7f9';
    const card = '#ffffff';
    const text = '#0f172a';
    const muted = '#64748b';
    const border = '#e2e8f0';
    const safeName = escapeHtml(opts.customerName || 'Customer');
    const itemsRows = opts.items
        .map((i) => {
        const name = escapeHtml(i.name || '');
        const qty = Number.isFinite(i.quantity) ? i.quantity : 0;
        const price = Number.isFinite(i.price) ? i.price : 0;
        return `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid ${border};">
            <div style="font-weight:600;color:${text};">${name}</div>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid ${border};text-align:center;color:${muted};white-space:nowrap;">
            ×${qty}
          </td>
          <td style="padding:12px 0;border-bottom:1px solid ${border};text-align:right;color:${text};white-space:nowrap;">
            Rs ${price}
          </td>
        </tr>
      `;
    })
        .join('');
    const contactLine = [
        opts.contactEmail ? `Email: <a href="mailto:${escapeHtml(opts.contactEmail)}" style="color:${accent};text-decoration:none;">${escapeHtml(opts.contactEmail)}</a>` : '',
        opts.contactPhone ? `Phone: <a href="tel:${escapeHtml(opts.contactPhone)}" style="color:${accent};text-decoration:none;">${escapeHtml(opts.contactPhone)}</a>` : '',
    ]
        .filter(Boolean)
        .join(' • ');
    return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Order Confirmation</title>
  </head>
  <body style="margin:0;padding:0;background:${bg};color:${text};font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      Order confirmed — Skin From North
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${bg};padding:24px 0;">
      <tr>
        <td align="center" style="padding:0 16px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;">
            <tr>
              <td style="padding:0 0 14px;">
                <div style="font-size:18px;font-weight:800;letter-spacing:0.08em;color:${accent};">
                  SKIN FROM NORTH
                </div>
              </td>
            </tr>

            <tr>
              <td style="background:${card};border:1px solid ${border};border-radius:16px;overflow:hidden;">
                <div style="padding:22px 22px 10px;">
                  <div style="display:inline-block;background:${accent};color:#fff;font-size:12px;font-weight:700;letter-spacing:0.18em;padding:8px 12px;border-radius:999px;">
                    ORDER CONFIRMATION
                  </div>
                  <h1 style="margin:14px 0 6px;font-size:22px;line-height:1.25;">
                    Thank you for your order
                  </h1>
                  <p style="margin:0 0 14px;color:${muted};font-size:14px;line-height:1.6;">
                    Hi <b style="color:${text};">${safeName}</b>, we’ve received your order. We will contact you soon.
                  </p>
                </div>

                <div style="padding:0 22px 22px;">
                  <div style="border:1px solid ${border};border-radius:14px;padding:16px;">
                    <div style="font-size:14px;font-weight:700;margin:0 0 12px;color:${text};">
                      Order details
                    </div>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                      <thead>
                        <tr>
                          <th style="text-align:left;padding:0 0 10px;color:${muted};font-size:12px;letter-spacing:0.12em;text-transform:uppercase;border-bottom:1px solid ${border};">
                            Product
                          </th>
                          <th style="text-align:center;padding:0 0 10px;color:${muted};font-size:12px;letter-spacing:0.12em;text-transform:uppercase;border-bottom:1px solid ${border};white-space:nowrap;">
                            Qty
                          </th>
                          <th style="text-align:right;padding:0 0 10px;color:${muted};font-size:12px;letter-spacing:0.12em;text-transform:uppercase;border-bottom:1px solid ${border};white-space:nowrap;">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        ${itemsRows}
                      </tbody>
                    </table>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:14px;border-collapse:collapse;">
                      <tr>
                        <td style="padding-top:12px;border-top:1px solid ${border};color:${muted};font-size:14px;">
                          Total
                        </td>
                        <td style="padding-top:12px;border-top:1px solid ${border};text-align:right;font-size:16px;font-weight:800;color:${text};white-space:nowrap;">
                          Rs ${opts.total}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:14px 6px 0;color:${muted};font-size:12px;line-height:1.7;text-align:center;">
                ${contactLine ? `<div style="margin-bottom:6px;">${contactLine}</div>` : ''}
                <div>We will contact you soon.</div>
              </td>
            </tr>

            <tr>
              <td style="padding:10px 6px 0;color:${muted};font-size:11px;line-height:1.6;text-align:center;">
                © ${new Date().getFullYear()} Skin From North. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
