import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-slate-200/80 bg-slate-900 text-slate-300 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2 text-lg font-bold text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-500 text-white shadow-md">
                🏡
              </span>
              SmartStay<span className="text-indigo-400">AI</span>
            </Link>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-slate-400 sm:text-sm">
              Empowering boutique homestays, luxury villas, and independent hotel operators with real-time guest feedback analytics and Google Gemini AI insights.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-6 md:col-span-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Navigation</h4>
              <ul className="mt-3 space-y-2 text-xs text-slate-400">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/showcase" className="hover:text-white transition-colors">Showcase Stays</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">AI Platform</h4>
              <ul className="mt-3 space-y-2 text-xs text-slate-400">
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Operations Dashboard</Link></li>
                <li><Link to="/ai-review" className="hover:text-white transition-colors">AI Review Analyzer</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
              </ul>
            </div>
          </div>

          {/* Badge & Copyright */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Powered By</h4>
            <p className="mt-2 text-xs text-slate-400">
              Built with React, Vite, Express, MongoDB Atlas & Google Gemini AI.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-medium text-indigo-300">
              <span>⚡</span> Production Ready v1.0.0
            </div>
          </div>

        </div>

        <div className="mt-8 border-t border-slate-800/80 pt-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} SmartStay AI. All rights reserved. Designed for Luxury Homestays & Hotel Operations.
        </div>
      </div>
    </footer>
  )
}

export default Footer
