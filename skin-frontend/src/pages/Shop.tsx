import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/product'
import { useProductSearch } from '../context/SearchContext'
import shopHero from '../assets/shop-hero.png'
import Seo from '../components/Seo'

export default function Shop() {
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [selectedSkinType, setSelectedSkinType] = useState<string>('All Skin Types')
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-asc'>('featured')
  const { query } = useProductSearch()

  const brandOptions = useMemo(() => ['CeraVe', 'Cetaphil', 'The Ordinary'], [])
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
      return brandOk && skinOk && nameOk
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
  }, [selectedBrand, selectedSkinType, sortBy, query])

  const clearAll = () => {
    setSelectedBrand('')
    setSelectedSkinType('All Skin Types')
    setSortBy('featured')
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
                Discover premium imported skincare curated for every day routine - clean, effective, and authentic.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#2f5d3a]/10 px-3 py-1 text-xs font-semibold text-[#2f5d3a] ring-1 ring-[#2f5d3a]/15">
                  Dermatologist-loved
                </span>
                <span className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200/70">
                  Original brands
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
                      const checked = selectedBrand === b
                      return (
                        <label key={b} className="flex cursor-pointer items-center gap-3">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => setSelectedBrand((prev) => (prev === b ? '' : b))}
                            className="h-4 w-4 rounded border-slate-300 text-[#2f5d3a] focus:ring-[#2f5d3a]/25"
                          />
                          <span className="text-sm text-slate-700">{b}</span>
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
              </div>
            </div>
          </aside>

          {/* Products + sort */}
          <main className="min-w-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">{filtered.length}</span> items
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

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
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

