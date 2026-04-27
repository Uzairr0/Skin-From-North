import type { ReactNode } from 'react'

type TrustBarItem = {
  icon: ReactNode
  text: string
}

function TrustBarItemView({ item }: { item: TrustBarItem }) {
  return (
    <div
      className={[
        'flex shrink-0 items-center gap-2',
        'text-xs sm:text-sm tracking-wide',
        'transition-opacity duration-200 hover:opacity-85',
      ].join(' ')}
    >
      <span className="text-[13px] leading-none opacity-90">{item.icon}</span>
      <span className="capitalize">{item.text}</span>
    </div>
  )
}

function FlagCA({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 24"
      role="img"
      aria-label="Canada"
      focusable="false"
    >
      <rect width="36" height="24" rx="3" fill="#fff" />
      <rect width="9" height="24" rx="3" fill="#d32e2f" />
      <rect x="27" width="9" height="24" rx="3" fill="#d32e2f" />
      {/* simplified maple leaf */}
      <path
        d="M18 5.2l1 2.7 2.7-.7-1.2 2.5 2.5 1.1-2.8.6.5 2.8-2.1-1.9-2.1 1.9.5-2.8-2.8-.6 2.5-1.1-1.2-2.5 2.7.7 1-2.7z"
        fill="#d32e2f"
      />
    </svg>
  )
}

function FlagUS({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 24"
      role="img"
      aria-label="United States"
      focusable="false"
    >
      <rect width="36" height="24" rx="3" fill="#fff" />
      {/* stripes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} y={i * 4} width="36" height="2" fill="#c81e3a" />
      ))}
      {/* canton */}
      <rect width="16" height="12" rx="3" fill="#1f3b82" />
      {/* stars as dots */}
      {Array.from({ length: 12 }).map((_, i) => (
        <circle
          key={i}
          cx={3 + (i % 4) * 3.2}
          cy={2.3 + Math.floor(i / 4) * 3.2}
          r="0.6"
          fill="#fff"
          opacity="0.9"
        />
      ))}
    </svg>
  )
}

export function TrustBar({
  sticky = false,
  className = '',
}: {
  sticky?: boolean
  className?: string
}) {
  const items: TrustBarItem[] = [
    { icon: <span aria-hidden="true">✨</span>, text: '100% original products' },
    {
      icon: (
        <span className="inline-flex items-center gap-1" aria-hidden="true">
          <FlagCA className="h-3.5 w-auto rounded-[2px]" />
          <FlagUS className="h-3.5 w-auto rounded-[2px]" />
        </span>
      ),
      text: 'imported from Canada and usa',
    },
    { icon: <span aria-hidden="true">🚚</span>, text: 'Fast Delivery Across Pakistan' },
  ]

  return (
    <div
      className={[
        // Full-width even though #root is centered & constrained.
        'w-full',
        sticky ? 'sticky top-0 z-50' : '',
        className,
      ].join(' ')}
    >
      <div className="h-12 bg-[#0f3d37] text-white/90">
        {/* Desktop: static centered row. Mobile/tablet: auto-scrolling marquee (loops). */}
        <div className="mx-auto hidden h-full max-w-[1200px] items-center justify-between gap-6 px-4 md:flex">
          {items.map((item) => (
            <div key={item.text} className="flex flex-1 justify-center">
              <TrustBarItemView item={item} />
            </div>
          ))}
        </div>

        <div className="mx-auto flex h-full max-w-[1200px] items-center overflow-hidden px-4 md:hidden">
          <div
            className={[
              'flex items-center gap-10 whitespace-nowrap pr-10',
              'motion-reduce:translate-x-0 motion-reduce:animate-none',
              '[animation:trust-marquee_18s_linear_infinite]',
            ].join(' ')}
          >
            {items.concat(items).map((item, idx) => (
              <TrustBarItemView key={`${item.text}-${idx}`} item={item} />
            ))}
          </div>

          <style>
            {`
              @keyframes trust-marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}
          </style>
        </div>
      </div>
    </div>
  )
}
