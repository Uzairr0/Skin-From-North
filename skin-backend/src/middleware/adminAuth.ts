import type { Request, Response, NextFunction } from 'express'
import { env } from '../config/env'

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const raw = req.header('authorization') ?? ''
  const token = raw.toLowerCase().startsWith('bearer ') ? raw.slice(7).trim() : ''

  if (!token || token !== env.adminToken) {
    return res.status(401).json({ ok: false, message: 'Unauthorized' })
  }
  return next()
}

