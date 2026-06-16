import nodemailer from 'nodemailer'
import { env } from './env'

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 15_000,
  auth: {
    user: env.emailUser,
    pass: env.emailPass,
  },
})

