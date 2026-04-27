const LOCAL_API_URL = 'http://localhost:5000'
/** Public API used by production builds (Render). Override with VITE_API_URL if needed. */
const PRODUCTION_API_URL = 'https://skin-from-north.onrender.com'

const explicit = (import.meta.env.VITE_API_URL as string | undefined)?.trim()

// Vite: import.meta.env.PROD is true for `vite build` (e.g. Vercel).
// Without this, production bundles defaulted to localhost and browsers could not place orders.
export const API_URL =
  explicit || (import.meta.env.PROD ? PRODUCTION_API_URL : LOCAL_API_URL)

