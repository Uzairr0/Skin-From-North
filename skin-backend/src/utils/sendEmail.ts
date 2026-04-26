import { transporter } from '../config/mailer'
import { env } from '../config/env'

export async function sendEmail(opts: { to: string; subject: string; html: string }) {
  if (!env.emailUser || !env.emailPass) {
    throw new Error('Missing EMAIL_USER/EMAIL_PASS in environment')
  }

  return await transporter.sendMail({
    from: `"Skin From North" <${env.emailUser}>`,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
  })
}

