import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function ReturnPolicy() {
  return (
    <section className="w-full bg-white">
      <Seo title="Return Policy" description="Returns and exchanges guidance for your skincare orders." />
      <div className="mx-auto max-w-[900px] px-4 py-14 sm:py-16">
        <Link
          to="/"
          className="text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-slate-900"
        >
          ← Back to Home
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Return Policy
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          Returns & exchanges guidance. (Placeholder content — customize anytime.)
        </p>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
          <ul className="space-y-3 text-sm leading-relaxed text-slate-700">
            <li>Contact us as soon as possible if there’s an issue with your order.</li>
            <li>Items must be unused and in original packaging for eligibility (where applicable).</li>
            <li>For hygiene/safety, certain items may be non-returnable.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

