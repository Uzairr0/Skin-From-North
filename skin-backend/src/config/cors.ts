import { env } from './env'

/** Always allowed in production — custom domain + legacy Vercel URL */
const PRODUCTION_ORIGINS = [
  'https://www.skinfromnorth.com',
  'https://skinfromnorth.com',
  'https://skin-from-north.vercel.app',
  'http://localhost:5173',
]

export function getAllowedOrigins(): string[] {
  const fromEnv = env.clientOrigins
  if (env.nodeEnv === 'production') {
    return [...new Set([...PRODUCTION_ORIGINS, ...fromEnv])]
  }
  return fromEnv.length > 0 ? fromEnv : ['http://localhost:5173']
}
