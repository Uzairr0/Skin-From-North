import cors from 'cors'
import express from 'express'
import { env } from './config/env'
import { connectDb } from './config/db'
import routes from './routes'

async function main() {
  const app = express()

  app.use(
    cors({
      origin: env.clientOrigin,
      credentials: true,
    }),
  )
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
    // eslint-disable-next-line no-console
    console.warn('MongoDB not connected:', e instanceof Error ? e.message : e)
  }

  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${env.port}`)
  })
}

void main()

