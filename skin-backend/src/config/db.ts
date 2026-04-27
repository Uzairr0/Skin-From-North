import mongoose from 'mongoose'
import { env } from './env'

export async function connectDb() {
  if (!env.mongoUri) {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection error: missing MONGO_URI')
    throw new Error('Missing MONGO_URI in environment')
  }

  const maxAttempts = 8
  const delaysMs = [0, 1000, 2000, 5000, 8000, 12000, 15000, 20000]

  let lastErr: unknown = null

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const delay = delaysMs[Math.min(attempt - 1, delaysMs.length - 1)] ?? 0
    if (delay > 0) {
      // eslint-disable-next-line no-console
      console.log(`MongoDB connect retrying in ${delay}ms (attempt ${attempt}/${maxAttempts})`)
      await new Promise((r) => setTimeout(r, delay))
    } else {
      // eslint-disable-next-line no-console
      console.log(`MongoDB connecting (attempt ${attempt}/${maxAttempts})`)
    }

    try {
      await mongoose.connect(env.mongoUri)
      // eslint-disable-next-line no-console
      console.log('MongoDB connected')
      return
    } catch (err) {
      lastErr = err
      // eslint-disable-next-line no-console
      console.error('MongoDB connection error:', err)
    }
  }

  throw lastErr instanceof Error ? lastErr : new Error('MongoDB connection failed after retries')
}

