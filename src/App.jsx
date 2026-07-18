import { Routes, Route } from 'react-router-dom'
import Home         from './pages/Home.jsx'
import About        from './pages/About.jsx'
import Dashboard    from './pages/Dashboard.jsx'
import Login        from './pages/Login.jsx'
import Register     from './pages/Register.jsx'
import Showcase     from './pages/Showcase.jsx'
import AuthCallback from './pages/AuthCallback.jsx'
import AIReview     from './pages/AIReview.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/"          element={<Home />} />
      <Route path="/about"     element={<About />} />
      <Route path="/login"     element={<Login />} />
      <Route path="/register"  element={<Register />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Protected routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/showcase"  element={<ProtectedRoute><Showcase /></ProtectedRoute>} />
      <Route path="/ai-review" element={<ProtectedRoute><AIReview /></ProtectedRoute>} />
    </Routes>
  )
}


export default App
