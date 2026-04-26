import { createContext, useContext, useMemo, useState } from 'react'
import { toApiError, type ApiError } from '../utils/errors'

export type GlobalError = ApiError & {
  action?: string
  time: number
}

type ErrorContextValue = {
  error: GlobalError | null
  reportError: (err: unknown, opts?: { action?: string }) => void
  clearError: () => void
}

const ErrorContext = createContext<ErrorContextValue | null>(null)

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<GlobalError | null>(null)

  const reportError: ErrorContextValue['reportError'] = (err, opts) => {
    const normalized = toApiError(err)
    setError({
      ...normalized,
      action: opts?.action,
      time: Date.now(),
    })
  }

  const clearError = () => setError(null)

  const value = useMemo<ErrorContextValue>(() => ({ error, reportError, clearError }), [error])
  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}

export function useGlobalError() {
  const ctx = useContext(ErrorContext)
  if (!ctx) throw new Error('useGlobalError must be used within an ErrorProvider')
  return ctx
}

