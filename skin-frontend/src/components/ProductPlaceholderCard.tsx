type PlaceholderProduct = {
  brand: string
  name: string
  skinType: string
}

const placeholders: PlaceholderProduct[] = [
  { brand: 'CeraVe', name: 'Moisturizing Cream', skinType: 'Dry & sensitive skin' },
  { brand: 'Cetaphil', name: 'Gentle Skin Cleanser', skinType: 'All skin types' },
]

export default function ProductPlaceholderCard({ index = 0 }: { index?: number }) {
  const item = placeholders[index % placeholders.length]

  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-dashed border-slate-200 bg-slate-50/80"
      aria-hidden="true"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200/80">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-slate-500 ring-1 ring-slate-200/70">
          {item.brand}
        </span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-200/90 to-transparent px-4 pb-4 pt-10">
          <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-slate-500 ring-1 ring-slate-200/80">
            Coming soon
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-3 w-full animate-pulse rounded bg-slate-200/80" />
        <div className="mt-3 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="h-3 w-3 animate-pulse rounded-sm bg-slate-200" />
          ))}
        </div>
        <p className="mt-2.5 text-[11px] font-medium text-slate-400">{item.skinType}</p>
        <div className="mt-3 h-6 w-20 animate-pulse rounded bg-slate-200" />
        <div className="mt-4 h-10 w-full rounded-lg border border-dashed border-slate-300 bg-white/60" />
        <p className="mt-3 text-center text-[11px] font-medium text-slate-400">{item.name}</p>
      </div>
    </article>
  )
}
