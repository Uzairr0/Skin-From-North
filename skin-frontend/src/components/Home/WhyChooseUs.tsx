import { FiShield, FiGlobe, FiSlash, FiTruck } from 'react-icons/fi'

type TrustItem = {
  title: string
  description?: string
  icon: React.ReactNode
}

const items: TrustItem[] = [
  {
    title: '100% Original Products',
    description: 'Authentic skincare you can trust.',
    icon: <FiShield className="h-5 w-5" aria-hidden="true" />,
  },
  {
    title: 'Imported from North America',
    description: 'Sourced from Canada & USA.',
    icon: <FiGlobe className="h-5 w-5" aria-hidden="true" />,
  },
  {
    title: 'No Fake Products',
    description: 'Zero counterfeits, ever.',
    icon: <FiSlash className="h-5 w-5" aria-hidden="true" />,
  },
  {
    title: 'Fast Delivery Across Pakistan',
    description: 'Quick dispatch, safe packaging.',
    icon: <FiTruck className="h-5 w-5" aria-hidden="true" />,
  },
]

export default function WhyChooseUs() {
  return (
    <section id="about" className="w-full bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-16">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-4">
          <div className="h-px flex-1 bg-[#e5e5e5]" aria-hidden="true" />
          <h2 className="text-center text-2xl font-semibold tracking-wide text-slate-900 sm:text-3xl">
            Why Choose Us
          </h2>
          <div className="h-px flex-1 bg-[#e5e5e5]" aria-hidden="true" />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className={[
                'group text-center',
                'rounded-xl bg-white p-6',
                'border border-gray-100 shadow-sm',
                'transition-all duration-300 ease-out',
                'hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5',
              ].join(' ')}
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#2f5d3a]/10 text-[#2f5d3a] ring-1 ring-[#2f5d3a]/15 transition-transform duration-200 group-hover:scale-105">
                {item.icon}
              </div>

              <div className="mt-4 text-[15px] font-semibold tracking-wide text-slate-900">
                {item.title}
              </div>

              {item.description ? (
                <div className="mt-1 text-xs leading-relaxed tracking-wide text-slate-600">
                  {item.description}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

