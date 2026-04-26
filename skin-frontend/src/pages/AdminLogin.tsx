import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Seo from '../components/Seo'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { useGlobalError } from '../context/ErrorContext'

const STORAGE_KEY = 'skin.admin.token'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { reportError } = useGlobalError()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      })
      const data = (await res.json().catch(() => null)) as any
      if (!res.ok) {
        throw new Error((data && data.message) || `Login failed (HTTP ${res.status})`)
      }
      const token = data?.token
      if (typeof token !== 'string' || !token) throw new Error('Missing token in response')
      localStorage.setItem(STORAGE_KEY, token)
      navigate('/admin/orders')
    } catch (err) {
      reportError(err, { action: 'admin login' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full bg-white">
      <Seo title="Admin Login" description="Admin login to view orders." />
      <div className="mx-auto max-w-[520px] px-4 py-14 sm:py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="text-xs font-semibold tracking-[0.22em] text-[#2f5d3a]">ADMIN</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-slate-600">Only authorized users can view orders.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@skinfromnorth.com"
              name="adminEmail"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              name="adminPassword"
            />
            <Button type="submit" className="w-full" isLoading={isSubmitting} loadingText="Signing in...">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export { STORAGE_KEY as ADMIN_TOKEN_STORAGE_KEY }

