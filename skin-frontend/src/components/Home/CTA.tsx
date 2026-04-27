import { FaWhatsapp } from 'react-icons/fa'

export default function CTA() {
  // Replace with your real WhatsApp number in international format (no + or spaces)
  const phone = '923184263597'
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    'Hi! I need help choosing the right skincare product.',
  )}`

  return (
    <section id="contact" className="w-full bg-[#f9f7f4]">
      <div className="mx-auto max-w-[1200px] px-4 py-16">
        <div className="rounded-2xl bg-[#2f5d3a] px-6 py-12 text-center text-white sm:px-10">
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Need help choosing the right product?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            Chat with us on WhatsApp and get personalized skincare advice.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className={[
              'mx-auto mt-6 inline-flex items-center justify-center gap-2',
              'h-11 rounded-lg bg-white px-6 py-3 text-sm font-medium',
              'text-[#2f5d3a]',
              'shadow-sm transition-all duration-300 ease-out',
              'hover:scale-[1.02] hover:shadow-md',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
            ].join(' ')}
          >
            <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

