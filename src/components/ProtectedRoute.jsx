import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Loader } from './ui'

/**
 * ProtectedRoute — wraps any page that requires authentication.
 * While auth state is loading (hydrating from localStorage), shows a spinner.
 * If not authenticated, redirects to /login.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <Loader fullScreen label="Checking authentication…" />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
