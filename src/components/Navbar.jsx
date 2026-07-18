import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const publicLinks = [
  { to: '/',          label: 'Home' },
  { to: '/about',     label: 'About' },
]

const protectedLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/showcase',  label: 'Showcase' },
  { to: '/ai-review', label: 'AI Analyzer' },
]


function Navbar() {
  const { isDark, toggleTheme }          = useTheme()
  const { isAuthenticated, user, logout } = useAuth()
  const navigate                         = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const activeClass = 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
  const inactiveClass = 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
  const linkClass = 'rounded-lg px-2 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:py-2 sm:text-sm lg:text-base'

  return (
    <header className="w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
        <Link
          to="/"
          className="text-base font-bold tracking-tight text-slate-900 dark:text-white sm:text-lg lg:text-xl"
        >
          SmartStay<span className="text-indigo-600 dark:text-indigo-400">AI</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <ul className="flex flex-wrap items-center gap-0.5 sm:gap-1">
            {/* Public links always visible */}
            {publicLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className={({ isActive }) => `${linkClass} ${isActive ? activeClass : inactiveClass}`}>
                  {label}
                </NavLink>
              </li>
            ))}

            {/* Protected links only when logged in */}
            {isAuthenticated && protectedLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className={({ isActive }) => `${linkClass} ${isActive ? activeClass : inactiveClass}`}>
                  {label}
                </NavLink>
              </li>
            ))}

            {/* Auth links */}
            {isAuthenticated ? (
              <>
                {user && (
                  <li>
                    <span className={`${linkClass} text-slate-500 dark:text-slate-400`}>
                      {user.name.split(' ')[0]}
                    </span>
                  </li>
                )}
                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`${linkClass} ${inactiveClass}`}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : inactiveClass}`}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : inactiveClass}`}>
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
