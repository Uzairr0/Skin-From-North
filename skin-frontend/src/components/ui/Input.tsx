import type { InputHTMLAttributes } from 'react'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  label?: string
  error?: string
  className?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name
  return (
    <label className="block">
      {label ? <div className="text-xs font-medium text-slate-700">{label}</div> : null}
      <input
        {...props}
        id={inputId}
        aria-invalid={Boolean(error)}
        className={[
          'mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2f5d3a]/20',
          className ?? '',
        ].join(' ')}
      />
      {error ? <div className="mt-1 text-xs font-medium text-red-600">{error}</div> : null}
    </label>
  )
}

