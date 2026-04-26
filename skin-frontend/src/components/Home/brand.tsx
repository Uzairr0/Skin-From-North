type Brand = {
  name: string
  src?: string
}

import ceraveLogo from '../../assets/CeraVe_logo.png'
import cetaphilLogo from '../../assets/Cetaphil_logo.png'
import ordinaryLogo from '../../assets/The Ordinary_logo.png'

const brands: Brand[] = [
  { name: 'CeraVe', src: ceraveLogo },
  { name: 'Cetaphil', src: cetaphilLogo },
  { name: 'The Ordinary', src: ordinaryLogo },
]

export default function BrandsSection() {
  return (
    <section id="brands" className="w-full bg-[#f9f7f4]">
      <div className="mx-auto max-w-[1200px] px-4 py-16">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-4">
          <div className="h-px flex-1 bg-[#e5e5e5]" aria-hidden="true" />
          <h2 className="text-center text-2xl font-semibold tracking-wide text-slate-900 sm:text-3xl">
            Trusted Global Brands
          </h2>
          <div className="h-px flex-1 bg-[#e5e5e5]" aria-hidden="true" />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className={[
                'flex items-center justify-center',
                'min-h-[110px] sm:min-h-[140px]',
                'rounded-2xl bg-white px-6 py-6 sm:px-8 sm:py-8',
                'border border-gray-100 shadow-sm',
                'transition-all duration-300 ease-out',
                'hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5',
              ].join(' ')}
            >
              {brand.src ? (
                <img
                  src={brand.src}
                  alt={`${brand.name} logo`}
                  className="h-16 w-full object-contain sm:h-20 md:h-24"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="text-lg font-semibold tracking-wide text-slate-800 sm:text-xl">
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

