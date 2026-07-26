import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function About() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-1">
        {/* About Hero Header */}
        <section className="bg-slate-900 py-12 text-white sm:py-16">
          <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300 border border-indigo-500/20">
              Our Vision & Mission
            </span>
            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              Transforming Homestay Hospitality with AI
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              SmartStay AI was created to empower independent hosts, luxury villa managers, and boutique hotel operators with real-time feedback intelligence and operational clarity.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="space-y-10 text-slate-700 dark:text-slate-300">
            
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                🏡 Tailored for Boutique & Independent Hosts
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
                Hospitality is fundamentally about human connection. When guests share their feedback—whether praising a mountain lodge sunset or noting room cleanliness—hosts need an efficient way to extract key takeaways without spending hours sifting through text.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                ⚡ Powered by Google Gemini AI
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
                Using Google Gemini 2.5 Flash, SmartStay AI evaluates guest review sentiment, identifies specific operational issues (such as room service delays or amenities highlights), assigns urgency priority levels, and drafts professional, empathetic responses ready for one-click manager review.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                🛠 Production-Grade Architecture
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs sm:text-sm font-medium">
                <li className="flex items-center gap-2 rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
                  <span className="text-emerald-500">✔</span> React & Vite Frontend (Vercel)
                </li>
                <li className="flex items-center gap-2 rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
                  <span className="text-emerald-500">✔</span> Node.js & Express REST Backend (Render)
                </li>
                <li className="flex items-center gap-2 rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
                  <span className="text-emerald-500">✔</span> MongoDB Atlas Cloud Database
                </li>
                <li className="flex items-center gap-2 rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
                  <span className="text-emerald-500">✔</span> JWT & Google OAuth 2.0 Security
                </li>
              </ul>
            </div>

            <div className="text-center pt-4">
              <Link
                to="/ai-review"
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-indigo-500"
              >
                Try the AI Review Analyzer
              </Link>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default About
