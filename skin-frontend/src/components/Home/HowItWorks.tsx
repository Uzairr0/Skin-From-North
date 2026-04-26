import { FiShoppingBag, FiGlobe, FiTruck } from 'react-icons/fi'

type Step = {
  number: string
  title: string
  description: string
  icon: React.ReactNode
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Order Online',
    description: 'Choose your skincare essentials in seconds.',
    icon: <FiShoppingBag className="h-5 w-5" aria-hidden="true" />,
  },
  {
    number: '02',
    title: 'We Import from North America',
    description: 'Authentic products sourced from Canada & USA.',
    icon: <FiGlobe className="h-5 w-5" aria-hidden="true" />,
  },
  {
    number: '03',
    title: 'Delivered to Your Doorstep',
    description: 'Fast delivery across Pakistan with safe packaging.',
    icon: <FiTruck className="h-5 w-5" aria-hidden="true" />,
  },
]

export default function HowItWorks() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-16">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-4">
          <div className="h-px flex-1 bg-[#e5e5e5]" aria-hidden="true" />
          <h2 className="text-center text-2xl font-semibold tracking-wide text-slate-900 sm:text-3xl">
            How It Works
          </h2>
          <div className="h-px flex-1 bg-[#e5e5e5]" aria-hidden="true" />
        </div>

        <div className="relative mt-10">
          {/* connector line (desktop only) */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-[#e5e5e5] lg:block"
            aria-hidden="true"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.number}
                className={[
                  'group relative text-center',
                  'rounded-xl bg-white p-6',
                  'border border-gray-100 shadow-sm',
                  'transition-all duration-300 ease-out',
                  'hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5',
                ].join(' ')}
              >
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#2f5d3a]/10 text-[#2f5d3a] ring-1 ring-[#2f5d3a]/15 transition-transform duration-200 group-hover:scale-105">
                  {s.icon}
                </div>

                <div className="mt-4 text-xs font-semibold tracking-[0.2em] text-[#2f5d3a]">
                  {s.number}
                </div>

                <div className="mt-2 text-[15px] font-semibold tracking-wide text-slate-900">
                  {s.title}
                </div>

                <div className="mt-1 text-xs leading-relaxed tracking-wide text-slate-600">
                  {s.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

