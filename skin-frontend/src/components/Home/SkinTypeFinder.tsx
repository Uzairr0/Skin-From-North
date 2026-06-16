import { useEffect, useRef, useState, type ReactNode } from 'react'
import { FiActivity, FiCloudSnow, FiDroplet, FiHeart } from 'react-icons/fi'
import ProductCard from '../ProductCard'
import {
  finderSkinTypes,
  getRecommendedProducts,
  type FinderSkinType,
} from '../../lib/skinTypeFinder'

const icons: Record<FinderSkinType, ReactNode> = {
  Oily: <FiDroplet className="h-5 w-5" aria-hidden="true" />,
  Dry: <FiCloudSnow className="h-5 w-5" aria-hidden="true" />,
  Acne: <FiActivity className="h-5 w-5" aria-hidden="true" />,
  Sensitive: <FiHeart className="h-5 w-5" aria-hidden="true" />,
}

export default function SkinTypeFinder() {
  const [selected, setSelected] = useState<FinderSkinType | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Clear any leftover ?skin= from URL so refresh always starts fresh.
  useEffect(() => {
    const url = new URL(window.location.href)
    if (!url.searchParams.has('skin')) return
    url.searchParams.delete('skin')
    const next = `${url.pathname}${url.search}${url.hash}`
    window.history.replaceState({}, '', next)
  }, [])

  const handleSelect = (skinType: FinderSkinType) => {
    setSelected(skinType)
    window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
  }

  const recommended = selected ? getRecommendedProducts(selected) : []
  const selectedLabel = finderSkinTypes.find((t) => t.id === selected)?.label

  return (
    <section id="skin-type" className="w-full bg-[#f9fafb]">
      <div className="mx-auto max-w-[1200px] px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold tracking-[0.18em] text-[#0f3d37]">
            SKIN TYPE FINDER
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Find the Right Products for You
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Tap your skin type — your recommended products will appear below.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {finderSkinTypes.map((type) => {
            const isSelected = selected === type.id
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => handleSelect(type.id)}
                className={[
                  'cursor-pointer rounded-xl border bg-white p-4 text-left sm:p-5',
                  'transition-all duration-200',
                  'hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-900/5',
                  'active:scale-[0.99]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/30',
                  isSelected
                    ? 'border-[#2f5d3a] shadow-md shadow-[#2f5d3a]/10 ring-2 ring-[#2f5d3a]/15'
                    : 'border-slate-200 shadow-sm',
                ].join(' ')}
                aria-pressed={isSelected}
              >
                <div
                  className={[
                    'flex h-10 w-10 items-center justify-center rounded-full',
                    isSelected
                      ? 'bg-[#2f5d3a] text-white'
                      : 'bg-[#2f5d3a]/10 text-[#2f5d3a]',
                  ].join(' ')}
                >
                  {icons[type.id]}
                </div>
                <div className="mt-3 text-[15px] font-semibold text-slate-900">{type.label}</div>
                <div className="mt-1 text-xs leading-relaxed text-slate-500">{type.hint}</div>
                {isSelected ? (
                  <div className="mt-2 text-[11px] font-semibold text-[#2f5d3a]">
                    ✓ Showing products below
                  </div>
                ) : (
                  <div className="mt-2 text-[11px] font-medium text-slate-400">Tap to see products</div>
                )}
              </button>
            )
          })}
        </div>

        {selected ? (
          <div
            ref={resultsRef}
            id="skin-finder-results"
            className="scroll-mt-28 mt-10"
          >
            <div className="rounded-2xl border border-[#2f5d3a]/20 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                    Recommended for {selectedLabel}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {recommended.length} product{recommended.length === 1 ? '' : 's'} picked for you
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="text-left text-xs font-medium text-slate-500 underline-offset-2 hover:text-slate-800 hover:underline sm:text-sm"
                >
                  Choose a different skin type
                </button>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recommended.map((p) => (
                  <ProductCard key={p.id} product={p} showAddToCart />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
