import type { Product } from '../data/product'
import { formatPricePKR } from '../lib/pricing'

type PriceDisplayProps = {
  price: number
  originalPrice?: number
  brand?: Product['brand']
  size?: 'sm' | 'md' | 'lg'
  showOriginNote?: boolean
  showDiscountLabel?: boolean
  className?: string
}

const sizeStyles = {
  sm: {
    old: 'text-sm',
    new: 'text-lg font-bold sm:text-xl',
    label: 'text-[10px]',
    note: 'text-[10px]',
  },
  md: {
    old: 'text-base',
    new: 'text-2xl font-bold',
    label: 'text-[11px]',
    note: 'text-xs',
  },
  lg: {
    old: 'text-lg',
    new: 'text-3xl font-bold sm:text-4xl',
    label: 'text-xs',
    note: 'text-sm',
  },
}

export default function PriceDisplay({
  price,
  originalPrice,
  brand,
  size = 'md',
  showOriginNote = false,
  showDiscountLabel = true,
  className = '',
}: PriceDisplayProps) {
  const styles = sizeStyles[size]
  const onSale = typeof originalPrice === 'number' && originalPrice > price

  return (
    <div className={className}>
      {onSale ? (
        <div className="flex flex-col gap-1">
          <span
            className={[
              styles.old,
              'font-medium text-slate-400 line-through decoration-slate-400/80',
            ].join(' ')}
          >
            {formatPricePKR(originalPrice)}
          </span>
          <span className={[styles.new, 'tracking-tight text-[#2f5d3a]'].join(' ')}>
            {formatPricePKR(price)}
          </span>
          {showDiscountLabel ? (
            <span
              className={[
                styles.label,
                'mt-0.5 inline-flex w-fit items-center rounded-full bg-rose-50 px-2.5 py-0.5 font-semibold uppercase tracking-wide text-rose-700 ring-1 ring-rose-200/80',
              ].join(' ')}
            >
              Introductory Offer
            </span>
          ) : null}
        </div>
      ) : (
        <span className={[styles.new, 'tracking-tight text-slate-900'].join(' ')}>
          {formatPricePKR(price)}
        </span>
      )}

      {showOriginNote && brand === 'The Ordinary' ? (
        <p className={[styles.note, 'mt-2 text-slate-500'].join(' ')}>
          Imported Original The Ordinary – Canada Stock
        </p>
      ) : null}
    </div>
  )
}
