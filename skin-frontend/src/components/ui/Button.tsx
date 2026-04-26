import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'link'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  isLoading?: boolean
  loadingText?: string
  leftIcon?: ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-70'

const variants: Record<Variant, string> = {
  primary:
    'h-11 bg-[#2f5d3a] px-6 py-3 text-white hover:bg-[#264d30] hover:shadow-sm focus-visible:ring-[#2f5d3a]/30',
  secondary:
    'h-11 border border-slate-200 bg-white px-6 py-3 text-slate-900 hover:bg-slate-50 focus-visible:ring-[#2f5d3a]/20',
  ghost: 'h-10 px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-[#2f5d3a]/20',
  link: 'h-auto p-0 text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline focus-visible:ring-[#2f5d3a]/20',
}

export function Button({
  variant = 'primary',
  isLoading,
  loadingText,
  leftIcon,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = Boolean(disabled || isLoading)
  return (
    <button
      {...props}
      disabled={isDisabled}
      aria-busy={isLoading}
      className={[base, variants[variant], className ?? ''].join(' ')}
    >
      {leftIcon}
      {isLoading ? loadingText ?? 'Loading…' : children}
    </button>
  )
}

