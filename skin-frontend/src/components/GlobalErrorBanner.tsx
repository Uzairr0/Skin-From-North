import { useEffect } from 'react'
import { useGlobalError } from '../context/ErrorContext'
import { ErrorMessage } from './ui/ErrorMessage'

export default function GlobalErrorBanner() {
  const { error, clearError } = useGlobalError()

  useEffect(() => {
    if (!error) return
    const id = window.setTimeout(() => clearError(), 7000)
    return () => window.clearTimeout(id)
  }, [error, clearError])

  if (!error) return null

  const title = error.action ? `Failed: ${error.action}` : 'Something went wrong'
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pt-3">
      <ErrorMessage title={title} message={error.message} onDismiss={clearError} />
    </div>
  )
}

