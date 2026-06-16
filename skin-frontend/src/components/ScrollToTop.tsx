import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function scrollToHashWhenReady(hash: string, attempt = 0) {
  const id = hash.replace(/^#/, '')
  if (!id) return

  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }

  if (attempt < 15) {
    window.setTimeout(() => scrollToHashWhenReady(hash, attempt + 1), 50)
  }
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const prevPathnameRef = useRef(pathname)
  const prevHashRef = useRef(hash)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    const pathnameChanged = prevPathnameRef.current !== pathname
    const hashChanged = prevHashRef.current !== hash
    prevPathnameRef.current = pathname
    prevHashRef.current = hash

    // Hash link (Shop Best Sellers, Skin Type, Brands, etc.)
    if (hash && (hashChanged || pathnameChanged)) {
      scrollToHashWhenReady(hash)
      return
    }

    // New page without a hash — start at the top.
    if (pathnameChanged && !hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [pathname, hash])

  return null
}
