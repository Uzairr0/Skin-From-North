import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import ProductPlaceholderCard from '../components/ProductPlaceholderCard'
import { products } from '../data/product'
import { brands } from '../data/brands'
import { useProductSearch } from '../context/SearchContext'
import shopHero from '../assets/shop-hero.png'
import Seo from '../components/Seo'

const MIN_GRID_SLOTS = 6

function formatPricePKR(value: number) {
  try {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(value)
  } catch {
    return `Rs ${value.toLocaleString()}`
  }
}

export default function Shop() {
  const catalogPriceBounds = useMemo(() => {
    const prices = products.map((p) => p.price)
    return { min: Math.min(...prices), max: Math.max(...prices) }
  }, [])

  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [selectedSkinType, setSelectedSkinType] = useState<string>('All Skin Types')
  const [priceMin, setPriceMin] = useState(catalogPriceBounds.min)
  const [priceMax, setPriceMax] = useState(catalogPriceBounds.max)
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-asc'>('featured')
  const { query } = useProductSearch()

  const brandOptions = useMemo(() => brands, [])
  const skinTypeOptions = useMemo(() => ['All Skin Types', 'Oily', 'Dry', 'Acne', 'Sensitive'], [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    let list = products.filter((p) => {
      const brandOk = !selectedBrand || p.brand === selectedBrand
      const skinOk = !selectedSkinType
        ? true
        : selectedSkinType === 'All Skin Types'
          ? p.skinType === 'All Skin Types'
          : selectedSkinType === 'Acne'
            ? p.skinType === 'Acne'
            : p.skinType === selectedSkinType || p.skinType === 'All Skin Types'
      const nameOk = !q || p.name.toLowerCase().includes(q)
      const priceOk = p.price >= priceMin && p.price <= priceMax
      return brandOk && skinOk && nameOk && priceOk
    })

    switch (sortBy) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    return list
  }, [selectedBrand, selectedSkinType, sortBy, query, priceMin, priceMax])

  const placeholderCount = useMemo(() => {
    if (filtered.length === 0) return 0
    return Math.max(0, MIN_GRID_SLOTS - filtered.length)
  }, [filtered.length])

  const clearAll = () => {
    setSelectedBrand('')
    setSelectedSkinType('All Skin Types')
    setPriceMin(catalogPriceBounds.min)
    setPriceMax(catalogPriceBounds.max)
    setSortBy('featured')
  }

  const handlePriceMinChange = (value: number) => {
    const next = Math.max(catalogPriceBounds.min, Math.min(value, priceMax))
    setPriceMin(next)
  }

  const handlePriceMaxChange = (value: number) => {
    const next = Math.min(catalogPriceBounds.max, Math.max(value, priceMin))
    setPriceMax(next)
  }

  return (
    <section className="w-full bg-white">
      <Seo
        title="Shop"
        description="Browse authentic imported skincare products. Filter by brand and skin type, or search to find your routine essentials."
      />

      {/* Page header */}
      <header className="relative w-full overflow-hidden bg-[#f9fafb]">
        <div className="absolute inset-0">
          <img
            src={shopHero}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-[55%_center]"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-4 py-10 sm:py-12">
          <div className="grid min-h-[220px] items-center lg:min-h-[280px] lg:grid-cols-2">
            <div className="max-w-xl rounded-2xl border border-white/40 bg-white/70 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.14)] backdrop-blur-md sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold tracking-[0.22em] text-slate-700 ring-1 ring-slate-200/80">
                TRUSTED • AUTHENTIC • IMPORTED
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Shop
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                The Ordinary in stock now — more brands arriving soon. Authentic imported skincare
                for your daily routine.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#2f5d3a]/10 px-3 py-1 text-xs font-semibold text-[#2f5d3a] ring-1 ring-[#2f5d3a]/15">
                  The Ordinary — in stock
                </span>
                <span className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200/70">
                  CeraVe &amp; Cetaphil — soon
                </span>
              </div>
            </div>

            <div className="hidden lg:block" />
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
          {/* Filters sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm font-semibold tracking-tight text-slate-900">Filters</h2>
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs font-medium text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline"
                >
                  Clear
                </button>
              </div>

              <div className="mt-6 space-y-7">
                {/* Brand */}
                <div>
                  <div className="text-xs font-semibold tracking-wide text-slate-900">Brand</div>
                  <div className="mt-3 space-y-2.5">
                    {brandOptions.map((b) => {
                      const checked = selectedBrand === b.id
                      const isComingSoon = b.status === 'coming_soon'
                      return (
                        <label
                          key={b.id}
                          className={[
                            'flex items-center gap-3',
                            isComingSoon ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
                          ].join(' ')}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={isComingSoon}
                            onChange={() =>
                              !isComingSoon &&
                              setSelectedBrand((prev) => (prev === b.id ? '' : b.id))
                            }
                            className="h-4 w-4 rounded border-slate-300 text-[#2f5d3a] focus:ring-[#2f5d3a]/25 disabled:cursor-not-allowed"
                          />
                          <span className="text-sm text-slate-700">
                            {b.name}
                            {isComingSoon ? (
                              <span className="ml-1.5 text-xs font-medium text-slate-400">
                                (Coming soon)
                              </span>
                            ) : null}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Skin type */}
                <div>
                  <div className="text-xs font-semibold tracking-wide text-slate-900">Skin type</div>
                  <div className="mt-3 space-y-2.5">
                    {skinTypeOptions.map((s) => {
                      const checked = selectedSkinType === s
                      return (
                        <label key={s} className="flex cursor-pointer items-center gap-3">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => setSelectedSkinType((prev) => (prev === s ? '' : s))}
                            className="h-4 w-4 rounded border-slate-300 text-[#2f5d3a] focus:ring-[#2f5d3a]/25"
                          />
                          <span className="text-sm text-slate-700">{s}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Price range */}
                <div>
                  <div className="text-xs font-semibold tracking-wide text-slate-900">
                    Price range
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">
                    {formatPricePKR(priceMin)} – {formatPricePKR(priceMax)}
                  </p>

                  <div className="mt-3 space-y-3">
                    <div>
                      <label htmlFor="priceMin" className="text-[11px] font-medium text-slate-500">
                        Min
                      </label>
                      <input
                        id="priceMin"
                        type="range"
                        min={catalogPriceBounds.min}
                        max={catalogPriceBounds.max}
                        step={100}
                        value={priceMin}
                        onChange={(e) => handlePriceMinChange(Number(e.target.value))}
                        className="mt-1 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#2f5d3a]"
                      />
                    </div>
                    <div>
                      <label htmlFor="priceMax" className="text-[11px] font-medium text-slate-500">
                        Max
                      </label>
                      <input
                        id="priceMax"
                        type="range"
                        min={catalogPriceBounds.min}
                        max={catalogPriceBounds.max}
                        step={100}
                        value={priceMax}
                        onChange={(e) => handlePriceMaxChange(Number(e.target.value))}
                        className="mt-1 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#2f5d3a]"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={catalogPriceBounds.min}
                        max={priceMax}
                        step={100}
                        value={priceMin}
                        onChange={(e) => handlePriceMinChange(Number(e.target.value))}
                        className="h-9 w-full rounded-lg border border-slate-200 px-2.5 text-sm text-slate-900 focus:border-[#2f5d3a]/30 focus:outline-none focus:ring-2 focus:ring-[#2f5d3a]/15"
                        aria-label="Minimum price"
                      />
                      <span className="text-slate-400">–</span>
                      <input
                        type="number"
                        min={priceMin}
                        max={catalogPriceBounds.max}
                        step={100}
                        value={priceMax}
                        onChange={(e) => handlePriceMaxChange(Number(e.target.value))}
                        className="h-9 w-full rounded-lg border border-slate-200 px-2.5 text-sm text-slate-900 focus:border-[#2f5d3a]/30 focus:outline-none focus:ring-2 focus:ring-[#2f5d3a]/15"
                        aria-label="Maximum price"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products + sort */}
          <main className="min-w-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">{filtered.length}</span> items
                {placeholderCount > 0 ? (
                  <span className="text-slate-400"> · {placeholderCount} coming soon</span>
                ) : null}
              </div>

              <div className="flex items-center justify-end gap-3">
                <label className="text-xs font-medium text-slate-600" htmlFor="sortBy">
                  Sort by
                </label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2f5d3a]/20"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to high</option>
                  <option value="price-desc">Price: High to low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} showAddToCart />
              ))}
              {Array.from({ length: placeholderCount }).map((_, i) => (
                <ProductPlaceholderCard key={`placeholder-${i}`} index={i} />
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                <div className="text-sm font-semibold text-slate-900">No products found</div>
                <div className="mt-2 text-sm text-slate-600">
                  Try removing some filters to see more results.
                </div>
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-[#2f5d3a] px-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#264d30] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/25"
                >
                  Clear filters
                </button>
              </div>
            ) : null}
          </main>
        </div>
      </div>
    </section>
  )
}
