import { FiCheck, FiClock, FiList, FiUser } from 'react-icons/fi'
import type { ProductGuide } from '../data/product'

type ProductUsageGuideProps = {
  guide: ProductGuide
}

export default function ProductUsageGuide({ guide }: ProductUsageGuideProps) {
  return (
    <section className="mt-12 rounded-2xl border border-slate-200 bg-[#fbf7ef]/60 p-5 sm:p-8">
      <div className="max-w-3xl">
        <p className="text-[11px] font-bold tracking-[0.18em] text-[#0f3d37]">
          SIMPLE GUIDE
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          How to Use &amp; What to Expect
        </h2>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Easy steps for beginners — no complicated routine needed.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:gap-6">
        {/* Who should use */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2f5d3a]/10 text-[#2f5d3a]">
              <FiUser className="h-4 w-4" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
              Who Should Use It
            </h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{guide.whoShouldUse}</p>
        </div>

        {/* Results timeline */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2f5d3a]/10 text-[#2f5d3a]">
              <FiClock className="h-4 w-4" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
              When Will You See Results?
            </h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{guide.resultsTimeline}</p>
        </div>

        {/* How to use */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 sm:p-6 lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2f5d3a]/10 text-[#2f5d3a]">
              <FiList className="h-4 w-4" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">How to Use</h3>
          </div>
          <ol className="mt-4 space-y-3">
            {guide.howToUse.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2f5d3a] text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Key benefits */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 sm:p-6 lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2f5d3a]/10 text-[#2f5d3a]">
              <FiCheck className="h-4 w-4" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">Key Benefits</h3>
          </div>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {guide.keyBenefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600"
              >
                <FiCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#2f5d3a]"
                  aria-hidden="true"
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
