import {
  calculateDelivery,
  DELIVERY_NOTE,
  formatPricePKR,
  FREE_DELIVERY_HINT,
  getCartSubtotal,
} from '../lib/pricing'

type Item = { price: number; quantity: number }

export function useOrderTotals(items: Item[]) {
  const subtotal = getCartSubtotal(items)
  return calculateDelivery(subtotal)
}

type OrderTotalsSummaryProps = {
  items: Item[]
  className?: string
}

export function OrderTotalsSummary({ items, className = '' }: OrderTotalsSummaryProps) {
  const { subtotal, deliveryFee, total, qualifiesFree } = useOrderTotals(items)

  return (
    <div className={className}>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm text-slate-700">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-900">{formatPricePKR(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-700">
          <span>Delivery</span>
          <span
            className={[
              'font-semibold',
              deliveryFee === 0 ? 'text-[#2f5d3a]' : 'text-slate-900',
            ].join(' ')}
          >
            {deliveryFee === 0 ? 'Free' : formatPricePKR(deliveryFee)}
          </span>
        </div>
        <div className="h-px w-full bg-slate-200" />
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-900">Total</span>
          <span className="text-lg font-semibold text-slate-900">{formatPricePKR(total)}</span>
        </div>
      </div>

      <p
        className={[
          'mt-3 text-xs leading-relaxed',
          qualifiesFree ? 'font-medium text-[#2f5d3a]' : 'text-slate-500',
        ].join(' ')}
      >
        {qualifiesFree
          ? 'You qualify for free delivery on this order.'
          : FREE_DELIVERY_HINT}
      </p>
    </div>
  )
}

export function DeliveryInfoBanner({ className = '' }: { className?: string }) {
  return (
    <div
      className={[
        'rounded-xl border border-[#2f5d3a]/15 bg-[#2f5d3a]/[0.04] px-4 py-3 text-xs leading-relaxed text-slate-600',
        className,
      ].join(' ')}
    >
      <span className="font-semibold text-[#2f5d3a]">Lahore delivery only.</span>{' '}
      {DELIVERY_NOTE}. {FREE_DELIVERY_HINT}.
    </div>
  )
}
