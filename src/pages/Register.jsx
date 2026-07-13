import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { Button, Input, Toast } from '../components/ui'

function Register() {
  const navigate = useNavigate()

  const [form, setForm]     = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast]   = useState({ isVisible: false, message: '', type: 'info' })

  function showToast(message, type = 'error') {
    setToast({ isVisible: true, message, type })
    setTimeout(() => setToast((p) => ({ ...p, isVisible: false })), 4000)
  }

  function validate() {
    const errs = {}
    if (!form.name.trim())         errs.name     = 'Name is required.'
    if (!form.email.trim())        errs.email    = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email.'
    if (!form.password)            errs.password = 'Password is required.'
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters.'
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match.'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      })
      const json = await res.json()
      if (!res.ok) {
        const msg = json.errors?.[0]?.msg || json.error || 'Registration failed.'
        showToast(msg)
        return
      }
      showToast('Account created! Redirecting to login…', 'success')
      setTimeout(() => navigate('/login'), 1500)
    } catch {
      showToast('Network error. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  function handleGoogleLogin() {
    window.location.href = 'http://localhost:5001/api/auth/google'
  }

  function set(field) {
    return (e) => {
      setForm((p) => ({ ...p, [field]: e.target.value }))
      setErrors((p) => ({ ...p, [field]: '' }))
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-white dark:bg-slate-900">
      <Navbar />

      <main className="mx-auto w-full max-w-sm flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Join SmartStay AI today.
          </p>
        </div>

        {/* Google OAuth */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mb-6 flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-700" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs text-slate-500 dark:bg-slate-900 dark:text-slate-400">
              or register with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input label="Full Name"        type="text"     placeholder="Your name"         value={form.name}     onChange={set('name')}     error={errors.name} />
          <Input label="Email"            type="email"    placeholder="you@example.com"   value={form.email}    onChange={set('email')}    error={errors.email} />
          <Input label="Password"         type="password" placeholder="Min. 8 characters" value={form.password} onChange={set('password')} error={errors.password} />
          <Input label="Confirm Password" type="password" placeholder="Repeat password"   value={form.confirm}  onChange={set('confirm')}  error={errors.confirm} />

          <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full">
            {loading ? 'Creating account…' : 'Create Account'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            Sign in
          </Link>
        </p>
      </main>

      <Footer />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((p) => ({ ...p, isVisible: false }))}
      />
    </div>
  )
}

export default Register
