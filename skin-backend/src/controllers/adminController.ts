import type { Request, Response } from 'express'
import { env } from '../config/env'

export function adminLogin(req: Request, res: Response) {
  const { email, password } = (req.body ?? {}) as { email?: unknown; password?: unknown }
  const e = typeof email === 'string' ? email.trim().toLowerCase() : ''
  const p = typeof password === 'string' ? password.trim() : ''

  if (!e || !p) return res.status(400).json({ ok: false, message: 'Email and password are required' })

  if (e !== env.adminEmail.toLowerCase() || p !== env.adminPassword) {
    return res.status(401).json({ ok: false, message: 'Invalid credentials' })
  }

  return res.status(200).json({ ok: true, token: env.adminToken })
}

