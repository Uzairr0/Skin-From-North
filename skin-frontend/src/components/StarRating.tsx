import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

type StarRatingProps = {
  rating: number
  className?: string
  showValue?: boolean
}

export default function StarRating({ rating, className = '', showValue = true }: StarRatingProps) {
  const clamped = Math.min(5, Math.max(0, rating))
  const full = Math.floor(clamped)
  const hasHalf = clamped - full >= 0.25 && clamped - full < 0.75
  const roundUp = clamped - full >= 0.75

  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < full || (i === full && roundUp)) {
      return <FaStar key={i} className="h-3 w-3 text-amber-400" aria-hidden="true" />
    }
    if (i === full && hasHalf) {
      return <FaStarHalfAlt key={i} className="h-3 w-3 text-amber-400" aria-hidden="true" />
    }
    return <FaRegStar key={i} className="h-3 w-3 text-slate-300" aria-hidden="true" />
  })

  return (
    <div
      className={['flex items-center gap-1.5', className].join(' ')}
      aria-label={`Rated ${clamped.toFixed(1)} out of 5`}
    >
      <div className="flex items-center gap-0.5">{stars}</div>
      {showValue ? (
        <span className="text-xs font-medium text-slate-600">{clamped.toFixed(1)}</span>
      ) : null}
    </div>
  )
}
