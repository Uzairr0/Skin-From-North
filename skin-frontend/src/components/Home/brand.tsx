import { brands } from '../../data/brands'

export default function BrandsSection() {
  return (
    <section id="brands" className="w-full bg-[#f9f7f4]">
      <div className="mx-auto max-w-[1200px] px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex max-w-3xl items-center justify-center gap-4">
            <div className="h-px flex-1 bg-[#e5e5e5]" aria-hidden="true" />
            <h2 className="text-center text-2xl font-semibold tracking-wide text-slate-900 sm:text-3xl">
              Trusted Global Brands
            </h2>
            <div className="h-px flex-1 bg-[#e5e5e5]" aria-hidden="true" />
          </div>
          <p className="mt-4 text-sm text-slate-600 sm:text-base">
            Starting with The Ordinary — CeraVe &amp; Cetaphil launching soon.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => {
            const isComingSoon = brand.status === 'coming_soon'

            return (
              <div
                key={brand.name}
                className={[
                  'relative flex min-h-[110px] items-center justify-center overflow-hidden sm:min-h-[140px]',
                  'rounded-2xl border bg-white px-6 py-6 sm:px-8 sm:py-8',
                  isComingSoon
                    ? 'border-slate-200/80 shadow-sm'
                    : 'border-[#2f5d3a]/20 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5',
                ].join(' ')}
              >
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className={[
                      'relative z-0 h-16 w-full object-contain sm:h-20 md:h-24',
                      isComingSoon ? 'opacity-35 grayscale' : '',
                    ].join(' ')}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="text-lg font-semibold tracking-wide text-slate-800 sm:text-xl">
                    {brand.name}
                  </span>
                )}

                {isComingSoon ? (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-white/55 px-4 backdrop-blur-[2px]">
                    <span className="rounded-full bg-slate-900/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                      Coming Soon
                    </span>
                    <span className="text-center text-xs font-medium text-slate-600">
                      Arriving in our next shipment
                    </span>
                  </div>
                ) : (
                  <span className="absolute right-3 top-3 rounded-full bg-[#2f5d3a]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#2f5d3a] ring-1 ring-[#2f5d3a]/15">
                    Available Now
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
