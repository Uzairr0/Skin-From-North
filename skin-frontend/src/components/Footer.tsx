import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Footer() {
  const shopLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Skin Type', href: '/#skin-type' },
    { label: 'Brands', href: '/#brands' },
  ]

  const careLinks = [
    { label: 'Contact Us', href: '/#contact' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Shipping Policy', href: '/shipping-policy' },
    { label: 'Return Policy', href: '/return-policy' },
  ]

  const navigate = useNavigate()
  const location = useLocation()

  const isHashHref = (href: string) => href.includes('#')

  const scrollToHash = (hash: string) => {
    const id = hash.replace(/^#/, '')
    if (!id) return
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleFooterLink = (href: string) => {
    if (!isHashHref(href)) return
    const hash = `#${href.split('#')[1] ?? ''}`
    if (!hash || hash === '#') return

    if (location.pathname !== '/') {
      navigate('/' + hash)
      requestAnimationFrame(() => scrollToHash(hash))
      return
    }

    navigate(hash)
    requestAnimationFrame(() => scrollToHash(hash))
  }

  return (
    <footer className="w-full bg-[#111] text-slate-200">
      <div className="mx-auto max-w-[1200px] px-4 pb-10 pt-14 sm:pb-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 */}
          <div>
            <div className="text-lg font-semibold tracking-widest text-white">
              Skin From North
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-400">
              Original imported skincare products from North America
            </p>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
                aria-label="Instagram"
              >
                <FaInstagram className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
                aria-label="Facebook"
              >
                <FaFacebookF className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://tiktok.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
                aria-label="TikTok"
              >
                <FaTiktok className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <div className="text-sm font-semibold tracking-wide text-white">Shop</div>
            <ul className="mt-3 space-y-2 text-sm">
              {shopLinks.map((l) => (
                <li key={l.label}>
                  {isHashHref(l.href) ? (
                    <button
                      type="button"
                      onClick={() => handleFooterLink(l.href)}
                      className="text-gray-400 transition-all duration-300 hover:text-white"
                    >
                      {l.label}
                    </button>
                  ) : (
                    <Link
                      to={l.href}
                      className="text-gray-400 transition-all duration-300 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <div className="text-sm font-semibold tracking-wide text-white">
              Customer Care
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {careLinks.map((l) => (
                <li key={l.label}>
                  {isHashHref(l.href) ? (
                    <button
                      type="button"
                      onClick={() => handleFooterLink(l.href)}
                      className="text-gray-400 transition-all duration-300 hover:text-white"
                    >
                      {l.label}
                    </button>
                  ) : (
                    <Link
                      to={l.href}
                      className="text-gray-400 transition-all duration-300 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <div className="text-sm font-semibold tracking-wide text-white">Contact</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li>
                <span className="text-gray-500">Email:</span>{' '}
                <a
                  href="mailto:help@skinfromnorth.com"
                  className="transition-all duration-300 hover:text-white"
                >
                  help@skinfromnorth.com
                </a>
              </li>
              <li>
                <span className="text-gray-500">Phone:</span>{' '}
                <a
                  href="tel:+923001234567"
                  className="transition-all duration-300 hover:text-white"
                >
                  +92 300 1234567
                </a>
              </li>
              <li>
                <span className="text-gray-500">WhatsApp:</span>{' '}
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-all duration-300 hover:text-white"
                >
                  Chat with us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-7 text-center text-xs text-gray-500">
          © 2026 Skin From North. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

