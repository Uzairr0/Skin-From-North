import dotenv from 'dotenv'

dotenv.config()

function parseClientOrigins() {
  const raw =
    process.env.CLIENT_ORIGINS ??
    process.env.CLIENT_ORIGIN ??
    'http://localhost:5173'
  return raw
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 5000),
  mongoUri: process.env.MONGO_URI ?? '',
  clientOrigins: parseClientOrigins(),
  adminEmail: process.env.ADMIN_EMAIL ?? 'guzair421@gmail.com',
  adminPassword: process.env.ADMIN_PASSWORD ?? 'admin123',
  adminToken: process.env.ADMIN_TOKEN ?? 'admin123',
  adminNotifyEmail:
    process.env.ADMIN_NOTIFY_EMAIL ?? process.env.ADMIN_EMAIL ?? 'skinfromnorth@gmail.com',
  emailUser: process.env.EMAIL_USER ?? '',
  emailPass: process.env.EMAIL_PASS ?? '',
}

