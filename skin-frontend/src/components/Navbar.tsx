import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { useProductSearch } from '../context/SearchContext'
import { products } from '../data/product'
import { Input } from './ui/Input'

type NavItem = { label: string; href: string }

export function Navbar({
  sticky = true,
  className = '',
}: {
  sticky?: boolean
  className?: string
}) {
  const navItems: NavItem[] = useMemo(
    () => [
      { label: 'Home', href: '/' },
      { label: 'Shop', href: '/shop' },
      { label: 'Skin Type', href: '/#skin-type' },
      { label: 'Brands', href: '/#brands' },
      { label: 'About Us', href: '/#about' },
      { label: 'Contact', href: '/#contact' },
    ],
    [],
  )

  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { items } = useCart()
  const { query, setQuery } = useProductSearch()
  const cartCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const searchWrapRef = useRef<HTMLDivElement | null>(null)

  const isHashHref = (href: string) => href.includes('#')

  const scrollToHash = (hash: string) => {
    const id = hash.replace(/^#/, '')
    if (!id) return

    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    // Fallback: some sections might be anchored via name attributes.
    const named = document.querySelector<HTMLElement>(`[name="${CSS.escape(id)}"]`)
    named?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const onNavItemClick = async (href: string) => {
    if (!isHashHref(href)) return

    // Supports '/#section' and '#section'
    const hash = href.includes('#') ? `#${href.split('#')[1] ?? ''}` : ''
    if (!hash || hash === '#') return

    // If we aren't on Home, go there first, then scroll.
    if (location.pathname !== '/') {
      navigate('/' + hash)
      // Wait for next paint so Home sections are mounted.
      requestAnimationFrame(() => scrollToHash(hash))
      return
    }

    // Already on Home: update hash + scroll.
    navigate(hash)
    requestAnimationFrame(() => scrollToHash(hash))
  }

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return products
      .filter((p) => {
        const hay = `${p.name} ${p.brand} ${p.skinType}`.toLowerCase()
        return hay.includes(q)
      })
      .slice(0, 6)
  }, [query])

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      const el = searchWrapRef.current
      if (!el) return
      if (e.target instanceof Node && el.contains(e.target)) return
      setSearchOpen(false)
      setActiveIndex(-1)
    }
    window.addEventListener('mousedown', onPointerDown)
    return () => window.removeEventListener('mousedown', onPointerDown)
  }, [])

  return (
    <header
      className={[
        // Full-width even though #root is centered & constrained.
        'w-full overflow-x-clip',
        sticky ? 'sticky top-0 z-40' : '',
        className,
      ].join(' ')}
    >
      <div className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-[0_1px_0_rgba(15,23,42,0.06),0_10px_35px_rgba(15,23,42,0.06)]">
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center gap-3 px-4 sm:gap-5">
          {/* Left: Logo */}
          <Link to="/" className="shrink-0 font-[ui-serif,Georgia,serif] leading-none text-[#0f3d37]">
            <span className="block text-[15px] font-bold tracking-widest sm:text-xl">
              Skin From North
            </span>
            <span className="mt-1 hidden text-[10px] font-semibold tracking-[0.22em] text-slate-600 sm:block">
              Imported Skincare
            </span>
          </Link>

          {/* Center: Nav links (desktop) */}
          <nav
            className={[
              'hidden min-w-0 flex-1 items-center justify-center text-[13px] font-medium tracking-wide text-slate-700 lg:flex',
              // If space is tight (e.g. lg-xl), keep one row and allow horizontal scroll instead of dropping below.
              'flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
              'gap-4 lg:gap-6 xl:gap-8',
            ].join(' ')}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                onClick={(e) => {
                  if (!isHashHref(item.href)) return
                  e.preventDefault()
                  void onNavItemClick(item.href)
                }}
                className={({ isActive }) =>
                  [
                    'relative whitespace-nowrap py-2 transition-all duration-300',
                    isActive ? 'text-slate-900' : 'hover:text-slate-900',
                  ].join(' ')
                }
                // NavLink "active" logic doesn't work for '/#...' reliably; we handle underline manually.
                end={item.href === '/'}
              >
                {({ isActive }) => {
                  const active =
                    isActive ||
                    (isHashHref(item.href) &&
                      location.pathname === '/' &&
                      location.hash === `#${item.href.split('#')[1] ?? ''}`)
                  return (
                    <>
                      {item.label}
                      <span
                        className={[
                          'pointer-events-none absolute inset-x-0 -bottom-1 mx-auto h-[2px] w-6 rounded-full bg-[#0f3d37] transition-opacity duration-200',
                          active ? 'opacity-100' : 'opacity-0',
                        ].join(' ')}
                        aria-hidden="true"
                      />
                    </>
                  )
                }}
              </NavLink>
            ))}
          </nav>

          {/* Right: icons + whatsapp */}
          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            {/* Desktop search */}
            <div
              ref={searchWrapRef}
              className="relative hidden lg:block w-[180px] lg:w-[220px] xl:w-[260px] 2xl:w-[320px]"
            >
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
              <Input
                type="search"
                placeholder="Search products, brands..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  if (location.pathname !== '/shop') navigate('/shop')
                  setSearchOpen(true)
                  setActiveIndex(-1)
                }}
                onFocus={() => {
                  if (query.trim()) setSearchOpen(true)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setSearchOpen(false)
                    setActiveIndex(-1)
                    return
                  }

                  if (!suggestions.length) {
                    if (e.key === 'Enter' && query.trim()) {
                      if (location.pathname !== '/shop') navigate('/shop')
                      setSearchOpen(false)
                    }
                    return
                  }

                  if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    setSearchOpen(true)
                    setActiveIndex((v) => Math.min(suggestions.length - 1, v + 1))
                    return
                  }
                  if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    setActiveIndex((v) => Math.max(-1, v - 1))
                    return
                  }
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    const chosen = suggestions[Math.max(0, activeIndex)] ?? suggestions[0]
                    if (!chosen) return
                    setQuery('')
                    setSearchOpen(false)
                    setActiveIndex(-1)
                    navigate(`/product/${chosen.id}`)
                  }
                }}
                className="pl-10 focus:ring-[#2f5d3a]/25 focus:border-[#2f5d3a]/30"
              />

              {searchOpen && suggestions.length ? (
                <div
                  role="listbox"
                  aria-label="Search suggestions"
                  className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.14)]"
                >
                  <div className="max-h-[360px] overflow-auto p-2">
                    {suggestions.map((p, idx) => {
                      const active = idx === activeIndex
                      return (
                        <button
                          key={p.id}
                          type="button"
                          role="option"
                          aria-selected={active}
                          onMouseEnter={() => setActiveIndex(idx)}
                          onClick={() => {
                            setQuery('')
                            setSearchOpen(false)
                            setActiveIndex(-1)
                            navigate(`/product/${p.id}`)
                          }}
                          className={[
                            'flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition-colors duration-150',
                            active ? 'bg-[#2f5d3a]/10' : 'hover:bg-slate-50',
                          ].join(' ')}
                        >
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-slate-900">{p.name}</div>
                            <div className="mt-0.5 flex items-center gap-2">
                              <span className="truncate text-xs text-slate-600">{p.brand}</span>
                              <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden="true" />
                              <span className="truncate text-xs text-slate-600">{p.skinType}</span>
                            </div>
                          </div>
                          <span className="shrink-0 text-xs font-semibold text-slate-700">Enter ↵</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : null}
            </div>

            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-lg text-slate-700 transition-all duration-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/25 md:hidden sm:h-10 sm:w-10"
              aria-label="Search"
            >
              <FiSearch className="h-[18px] w-[18px]" />
            </button>

            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-lg text-slate-700 transition-all duration-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/25 sm:h-10 sm:w-10"
              aria-label="Account"
            >
              <FiUser className="h-[18px] w-[18px]" />
            </button>

            <Link
              to="/cart"
              className="relative grid h-9 w-9 place-items-center rounded-lg text-slate-700 transition-all duration-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/25 sm:h-10 sm:w-10"
              aria-label="Cart"
            >
              <FiShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
              {cartCount > 0 ? (
                <span className="absolute right-1 top-1 grid h-[16px] min-w-[16px] place-items-center rounded-full bg-[#0f3d37] px-1 text-[10px] font-semibold leading-none text-white">
                  {cartCount}
                </span>
              ) : null}
            </Link>

            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-lg bg-[#2f5d3a] px-6 py-3 text-[13px] font-medium tracking-wide text-white transition-all duration-300 hover:bg-[#264d30] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/30 2xl:flex"
            >
              <FaWhatsapp className="h-4 w-4" />
              Order on WhatsApp
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-lg text-slate-800 transition-all duration-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/25 lg:hidden sm:h-10 sm:w-10"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <FiX className="h-[20px] w-[20px]" />
              ) : (
                <FiMenu className="h-[20px] w-[20px]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen ? (
          <div className="border-t border-slate-100 bg-white lg:hidden">
            <div className="mx-auto max-w-[1200px] px-4 py-3">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    end={item.href === '/'}
                    onClick={(e) => {
                      setMobileOpen(false)
                      if (!isHashHref(item.href)) return
                      e.preventDefault()
                      void onNavItemClick(item.href)
                    }}
                    className={({ isActive }) =>
                      [
                        'flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300',
                        isActive
                          ? 'bg-[#2f5d3a]/10 text-slate-900'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900',
                      ].join(' ')
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{item.label}</span>
                        {isActive ? (
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-[#2f5d3a]"
                            aria-hidden="true"
                          />
                        ) : null}
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-[#2f5d3a] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#264d30] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/30"
              >
                <FaWhatsapp className="h-4 w-4" />
                Order on WhatsApp
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}
