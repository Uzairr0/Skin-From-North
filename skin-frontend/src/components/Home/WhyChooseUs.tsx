import { FiDollarSign, FiGlobe, FiShield, FiXCircle } from 'react-icons/fi'

type TrustItem = {
  title: string
  description: string
  icon: React.ReactNode
}

const items: TrustItem[] = [
  {
    title: '100% Original Imported Products',
    description: 'Every bottle is authentic — sealed, verified, and ready for your routine.',
    icon: <FiShield className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: 'Direct from Canada & USA',
    description: 'Sourced straight from North America, not third-party resellers.',
    icon: <FiGlobe className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: 'No Fake or Local Copies',
    description: 'We never sell dupes, refills, or repackaged local imitations.',
    icon: <FiXCircle className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: 'Cash on Delivery Available Across Pakistan',
    description: 'Pay when your order arrives — Lahore, Karachi, Islamabad & beyond.',
    icon: <FiDollarSign className="h-6 w-6" aria-hidden="true" />,
  },
]

export default function WhyChooseUs() {
  return (
    <section id="about" className="w-full bg-gradient-to-b from-[#fbf7ef] via-white to-white">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#0f3d37]">
            WHY CHOOSE US
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Skincare You Can Trust in Pakistan
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Original imports, honest pricing, and delivery you can count on.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
          {items.map((item, index) => (
            <div
              key={item.title}
              className={[
                'group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6',
                'shadow-[0_4px_24px_rgba(15,23,42,0.04)]',
                'transition-all duration-300 ease-out',
                'hover:-translate-y-0.5 hover:border-[#2f5d3a]/20 hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)]',
              ].join(' ')}
            >
              <div
                className="pointer-events-none absolute -right-4 -top-4 text-[72px] font-bold leading-none text-slate-900/[0.03] sm:text-[80px]"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="relative flex gap-4 sm:gap-5">
                <div
                  className={[
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                    'bg-gradient-to-br from-[#2f5d3a]/15 to-[#2f5d3a]/5 text-[#2f5d3a]',
                    'ring-1 ring-[#2f5d3a]/15',
                    'transition-transform duration-300 group-hover:scale-105',
                  ].join(' ')}
                >
                  {item.icon}
                </div>

                <div className="min-w-0 pt-0.5">
                  <h3 className="text-[15px] font-semibold leading-snug text-slate-900 sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-[#2f5d3a]/15 bg-[#2f5d3a]/[0.04] px-5 py-4 text-center sm:px-8 sm:py-5">
          <p className="text-sm font-medium text-slate-800 sm:text-[15px]">
            Trusted by customers in{' '}
            <span className="font-semibold text-[#0f3d37]">Lahore</span>,{' '}
            <span className="font-semibold text-[#0f3d37]">Karachi</span>, and{' '}
            <span className="font-semibold text-[#0f3d37]">Islamabad</span>
            {' '}— 100% original, every order.
          </p>
        </div>
      </div>
    </section>
  )
}
