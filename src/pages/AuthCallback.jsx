import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Loader } from '../components/ui'

/**
 * AuthCallback — handles the redirect from Google OAuth.
 * Backend sends: /auth/callback?token=<jwt>
 * We read the token, fetch the user profile, then redirect to dashboard.
 */
function AuthCallback() {
  const navigate    = useNavigate()
  const { login }   = useAuth()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token  = params.get('token')

    if (!token) {
      navigate('/login?error=oauth', { replace: true })
      return
    }

    // Decode the JWT payload (no verification needed — server already verified)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const user    = { id: payload.id, name: payload.name, email: payload.email }
      login(token, user)
      navigate('/dashboard', { replace: true })
    } catch {
      navigate('/login?error=oauth', { replace: true })
    }
  }, [login, navigate])

  return <Loader fullScreen label="Completing sign in…" />
}

export default AuthCallback
