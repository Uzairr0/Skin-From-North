import type { ReactNode } from 'react'
import { FiDroplet, FiCloudSnow, FiActivity, FiHeart } from 'react-icons/fi'
import alphaArbutin from '../../assets/alpha-arbutin-2-ha.png'
import glycolicToner from '../../assets/glycolic-acid-7-toner.png'
import niacinamideZinc from '../../assets/niacinamide-10-zinc.png'
import salicylicAcid from '../../assets/salicylic-acid-2.png'

type SkinTypeCard = {
  title: string
  subtitle: string
  bgClass: string
  icon: ReactNode
  imageSrc: string
}

const cards: SkinTypeCard[] = [
  {
    title: 'Oily Skin',
    subtitle: 'Balance & control shine',
    bgClass: 'bg-[#f9f7f4]',
    icon: <FiDroplet className="h-5 w-5 text-[#2f5d3a]" aria-hidden="true" />,
    imageSrc: alphaArbutin,
  },
  {
    title: 'Dry Skin',
    subtitle: 'Deep hydration & repair',
    bgClass: 'bg-[#f9fafb]',
    icon: <FiCloudSnow className="h-5 w-5 text-[#2f5d3a]" aria-hidden="true" />,
    imageSrc: niacinamideZinc,
  },
  {
    title: 'Acne Prone',
    subtitle: 'Clarify & calm breakouts',
    bgClass: 'bg-[#f9f7f4]',
    icon: <FiActivity className="h-5 w-5 text-[#2f5d3a]" aria-hidden="true" />,
    imageSrc: salicylicAcid,
  },
  {
    title: 'Sensitive Skin',
    subtitle: 'Gentle, barrier-friendly',
    bgClass: 'bg-[#f9fafb]',
    icon: <FiHeart className="h-5 w-5 text-[#2f5d3a]" aria-hidden="true" />,
    imageSrc: glycolicToner,
  },
]

export default function SkinTypes() {
  return (
    <section id="skin-type" className="w-full bg-[#f9fafb]">
      <div className="mx-auto max-w-[1200px] px-4 py-16">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-4">
          <div className="h-px flex-1 bg-[#e5e5e5]" aria-hidden="true" />
          <h2 className="text-center text-2xl font-semibold tracking-wide text-slate-900 sm:text-3xl">
            Shop by Skin Type
          </h2>
          <div className="h-px flex-1 bg-[#e5e5e5]" aria-hidden="true" />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <button
              key={c.title}
              type="button"
              className={[
                'group w-full text-left',
                'rounded-xl p-5',
                c.bgClass,
                'border border-gray-100',
                'shadow-sm',
                'cursor-pointer',
                'transition-all duration-300 ease-out',
                'hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5d3a]/20',
              ].join(' ')}
            >
              <div className="flex items-center justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-slate-200/60 transition-transform duration-300 group-hover:scale-[1.06]">
                  {c.icon}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center">
                <div className="flex h-24 w-full items-center justify-center rounded-xl bg-gray-50 p-4 ring-1 ring-slate-200/50">
                  <img
                    src={c.imageSrc}
                    alt={`${c.title} skincare`}
                    className="h-14 w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              <div className="mt-4 text-center">
                <div className="text-[15px] font-semibold tracking-wide text-slate-900">
                  {c.title}
                </div>
                <div className="mt-1 text-xs tracking-wide text-slate-600">
                  {c.subtitle}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

