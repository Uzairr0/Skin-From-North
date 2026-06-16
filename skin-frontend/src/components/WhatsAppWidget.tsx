import { useLocation } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { getWhatsAppUrl } from '../lib/whatsapp'

const whatsappUrl = getWhatsAppUrl()

export default function WhatsAppWidget() {
  const { pathname } = useLocation()

  if (pathname.startsWith('/admin')) return null

  return (
    <>
      {/* Mobile sticky bottom CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/95 px-4 py-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-md lg:hidden">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className={[
            'flex h-11 w-full items-center justify-center gap-2.5',
            'rounded-xl bg-[#25D366] px-4 text-sm font-semibold text-white',
            'shadow-sm transition-all duration-200',
            'hover:bg-[#1fb855] active:scale-[0.99]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/40',
          ].join(' ')}
        >
          <FaWhatsapp className="h-5 w-5 shrink-0" aria-hidden="true" />
          Need help? Chat with us
        </a>
      </div>

      {/* Desktop floating button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={[
          'fixed bottom-6 right-6 z-40 hidden lg:flex',
          'h-14 w-14 items-center justify-center rounded-full',
          'bg-[#25D366] text-white',
          'shadow-[0_8px_24px_rgba(37,211,102,0.35)]',
          'ring-4 ring-white/90',
          'transition-all duration-300',
          'hover:scale-105 hover:bg-[#1fb855] hover:shadow-[0_12px_28px_rgba(37,211,102,0.4)]',
          'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/30',
        ].join(' ')}
      >
        <FaWhatsapp className="h-7 w-7" aria-hidden="true" />
      </a>
    </>
  )
}
