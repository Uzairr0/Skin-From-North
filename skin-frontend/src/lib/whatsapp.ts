export const WHATSAPP_PHONE = '923184263597'

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hi, I want help choosing skincare for my skin type'

export function getWhatsAppUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
}
