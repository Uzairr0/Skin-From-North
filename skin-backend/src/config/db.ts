import mongoose from 'mongoose'
import { env } from './env'

export async function connectDb() {
  if (!env.mongoUri) {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection error: missing MONGO_URI')
    throw new Error('Missing MONGO_URI in environment')
  }

  try {
    await mongoose.connect(env.mongoUri)
    // eslint-disable-next-line no-console
    console.log('MongoDB connected')
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection error:', err)
    throw err
  }
}

