import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Hero() {
  const { isAuthenticated } = useAuth()

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background imagery with overlay gradient */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Resort Homestay"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              SmartStay AI · Homestay Experience
            </div>
            
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Experience Handpicked <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-indigo-300 bg-clip-text text-transparent">Luxury Homestays</span>
            </h1>
            
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Combine boutique hospitality with artificial intelligence. Manage guest experiences, analyze feedback instantly, and elevate occupancy rates across your homestays.
            </p>

            {/* CTA Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Link
                to={isAuthenticated ? "/dashboard" : "/register"}
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              
              <Link
                to="/ai-review"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all hover:border-slate-500 hover:bg-slate-800 focus:outline-none"
              >
                <svg className="mr-2 h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Try AI Review Analyzer
              </Link>
            </div>

            {/* Homestay Trust Badges */}
            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-slate-800/80 pt-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-amber-400">★★★★★</span>
                <span className="font-semibold text-slate-200">4.96/5</span> Guest Rating
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✔</span>
                <span className="font-semibold text-slate-200">250+</span> Verified Stays
              </div>
              <div className="flex items-center gap-2">
                <span className="text-indigo-400">⚡</span>
                <span className="font-semibold text-slate-200">Instant</span> AI Insights
              </div>
            </div>
          </div>

          {/* Interactive Homestay Search Widget Box */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-800/90 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  Find Your Perfect Stay
                </h2>
                <span className="rounded-full bg-emerald-950 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-800">
                  Live Availability
                </span>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-400">Destination</label>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value="Bali Coastal Retreat & Villas"
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none cursor-default"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400">Check-In</label>
                    <input
                      type="text"
                      readOnly
                      value="Oct 12, 2026"
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2.5 text-xs text-slate-300 focus:outline-none cursor-default"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400">Check-Out</label>
                    <input
                      type="text"
                      readOnly
                      value="Oct 18, 2026"
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2.5 text-xs text-slate-300 focus:outline-none cursor-default"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-400">Property Type</label>
                  <select
                    readOnly
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs text-slate-300 focus:outline-none cursor-default"
                  >
                    <option>Boutique Homestay & Villa</option>
                  </select>
                </div>

                <Link
                  to="/showcase"
                  className="mt-2 flex w-full items-center justify-center rounded-xl bg-amber-500 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 transition-colors hover:bg-amber-400 shadow-md shadow-amber-500/20"
                >
                  Explore Showcase Stays
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
