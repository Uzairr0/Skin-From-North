type ErrorMessageProps = {
  title?: string
  message: string
  onDismiss?: () => void
  className?: string
}

export function ErrorMessage({ title = 'Something went wrong', message, onDismiss, className }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className={[
        'rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900',
        'shadow-sm',
        className ?? '',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="font-semibold">{title}</div>
          <div className="mt-1 break-words text-rose-800/90">{message}</div>
        </div>
        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 rounded-lg px-2 py-1 text-xs font-semibold text-rose-800 transition-colors duration-200 hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/40"
          >
            Dismiss
          </button>
        ) : null}
      </div>
    </div>
  )
}

