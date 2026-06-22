import cors from 'cors'
import express from 'express'
import { env } from './config/env'
import { getAllowedOrigins } from './config/cors'
import { connectDb } from './config/db'
import routes from './routes'

async function main() {
  const app = express()

  const allowedOrigins = getAllowedOrigins()

  const corsOptions: cors.CorsOptions = {
    origin: env.nodeEnv === 'production' ? allowedOrigins : true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }

  app.use(cors(corsOptions))
  app.options(/.*/, cors(corsOptions))

  app.use(express.json({ limit: '1mb' }))

  app.get('/', (_req, res) => {
    res.type('text').send('API running')
  })

  app.use('/api', routes)

  // Basic error handler (ready for API errors)
  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const message = err instanceof Error ? err.message : 'Internal server error'
    res.status(500).json({ message })
  })

  try {
    await connectDb()
  } catch (e) {
    // In production we should fail fast so the deploy clearly shows the DB issue.
    // In dev, keep the server up (some routes may still work).
    if (env.nodeEnv === 'production') throw e
    // eslint-disable-next-line no-console
    console.warn('MongoDB not connected:', e instanceof Error ? e.message : e)
  }

  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${env.port}`)
    if (env.nodeEnv === 'production') {
      // eslint-disable-next-line no-console
      console.log('CORS allowed origins:', allowedOrigins.join(', '))
    }
    if (env.nodeEnv === 'production' && env.adminToken === 'admin123') {
      // eslint-disable-next-line no-console
      console.warn('WARNING: Change ADMIN_TOKEN and ADMIN_PASSWORD before going live.')
    }
  })
}

void main()

