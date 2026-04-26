export type ApiError = {
  message: string
  status?: number
  code?: string
  details?: unknown
}

export function isApiError(value: unknown): value is ApiError {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'message' in value &&
      typeof (value as { message?: unknown }).message === 'string',
  )
}

export function toApiError(err: unknown): ApiError {
  if (isApiError(err)) return err

  if (err instanceof Error) {
    return {
      message: err.message || 'Something went wrong.',
      details: { name: err.name, stack: err.stack },
    }
  }

  if (typeof err === 'string') return { message: err }

  return { message: 'Something went wrong.', details: err }
}

