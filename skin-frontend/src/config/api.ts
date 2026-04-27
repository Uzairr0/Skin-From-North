const DEFAULT_API_URL = 'http://localhost:5000'

// For local dev, create `skin-frontend/.env` with:
// VITE_API_URL=http://localhost:5000
//
// For production (Vercel/Netlify), set:
// VITE_API_URL=https://skin-from-north.onrender.com
export const API_URL = (import.meta.env.VITE_API_URL as string | undefined) || DEFAULT_API_URL

