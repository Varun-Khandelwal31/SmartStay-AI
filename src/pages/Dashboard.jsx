import { useState, useEffect, useCallback } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { Loader, Toast, Button, Input } from '../components/ui'

const API_BASE = 'http://localhost:5000/api'

// Sentiment badge colours
const sentimentStyles = {
  positive: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
  neutral:  'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  negative: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
}

// Star rating display
function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-4 w-4 ${star <= rating ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

// Stat cards — kept from original design
const stats = [
  { label: 'Occupancy Rate', value: '87%',  change: '+4% from yesterday' },
  { label: 'Check-ins Today', value: '42',   change: '12 pending arrivals' },
  { label: 'Active Guests',   value: '156',  change: 'Across 3 properties' },
  { label: 'Open Alerts',     value: '3',    change: '1 maintenance, 2 service' },
]

function Dashboard() {
  const [reviews, setReviews]       = useState([])
  const [loading, setLoading]       = useState(true)
  const [toast, setToast]           = useState({ isVisible: false, message: '', type: 'info' })
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  // ─── Toast helper ─────────────────────────────────────────────────────────
  const showToast = useCallback((message, type = 'info') => {
    setToast({ isVisible: true, message, type })
    setTimeout(() => setToast((prev) => ({ ...prev, isVisible: false })), 4000)
  }, [])

  // ─── Fetch all reviews ────────────────────────────────────────────────────
  const fetchReviews = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/reviews`)
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      const json = await res.json()
      setReviews(json.data)
    } catch (err) {
      showToast('Failed to load reviews. Is the backend running?', 'error')
      setReviews([])
    } finally {
      setLoading(false)
    }
  }, [showToast])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  // ─── Search handler ───────────────────────────────────────────────────────
  async function handleSearch(e) {
    e.preventDefault()
    const q = searchQuery.trim()
    if (!q) {
      fetchReviews()
      return
    }
    setIsSearching(true)
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/reviews/search?q=${encodeURIComponent(q)}`)
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      const json = await res.json()
      setReviews(json.data)
      if (json.count === 0) showToast(`No reviews found for "${q}"`, 'info')
    } catch (err) {
      showToast('Search failed. Is the backend running?', 'error')
    } finally {
      setLoading(false)
    }
  }

  function handleClearSearch() {
    setSearchQuery('')
    setIsSearching(false)
    fetchReviews()
  }

  // ─── Delete a review ──────────────────────────────────────────────────────
  async function handleDelete(id) {
    try {
      const res = await fetch(`${API_BASE}/reviews/${id}`, { method: 'DELETE' })
      if (res.status === 204) {
        setReviews((prev) => prev.filter((r) => r.id !== id))
        showToast('Review deleted.', 'success')
      } else {
        throw new Error(`Unexpected status: ${res.status}`)
      }
    } catch (err) {
      showToast('Failed to delete review.', 'error')
    }
  }

  // ─── Format date ──────────────────────────────────────────────────────────
  function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    })
  }

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

        {/* ── Page header ── */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
            Overview of hotel operations, guest activity, and live review data.
          </p>
        </div>

        {/* ── KPI stat cards (kept from original) ── */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mb-8 md:gap-5 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-5"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 sm:text-sm">
                {stat.label}
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:mt-2 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* ── Guest Reviews section ── */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-6">

          {/* Header row */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
              Guest Reviews
              {!loading && (
                <span className="ml-2 text-sm font-normal text-slate-500 dark:text-slate-400">
                  ({reviews.length})
                </span>
              )}
            </h2>
            <Button variant="outline" size="sm" onClick={fetchReviews} disabled={loading}>
              Refresh
            </Button>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="mb-5 flex gap-2">
            <Input
              placeholder="Search by guest, hotel, or review text…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search reviews"
            />
            <Button type="submit" variant="primary" size="md" disabled={loading}>
              Search
            </Button>
            {isSearching && (
              <Button type="button" variant="ghost" size="md" onClick={handleClearSearch}>
                Clear
              </Button>
            )}
          </form>

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-16">
              <Loader size="lg" label="Loading reviews…" />
            </div>
          )}

          {/* Empty state */}
          {!loading && reviews.length === 0 && (
            <p className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
              No reviews found.
            </p>
          )}

          {/* Review cards */}
          {!loading && reviews.length > 0 && (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {reviews.map((r) => (
                <li key={r.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                    {/* Left: review content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white sm:text-base">
                          {r.guestName}
                        </p>
                        <span className="text-xs text-slate-400 dark:text-slate-500">·</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                          {r.hotel}
                        </p>
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <StarRating rating={r.rating} />
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${sentimentStyles[r.sentiment] || sentimentStyles.neutral}`}
                        >
                          {r.sentiment}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          {formatDate(r.date)}
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {r.review}
                      </p>
                    </div>

                    {/* Right: delete action */}
                    <button
                      type="button"
                      onClick={() => handleDelete(r.id)}
                      className="shrink-0 self-start rounded-lg px-2 py-1 text-xs text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950 dark:hover:text-red-300"
                      aria-label={`Delete review by ${r.guestName}`}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <Footer />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </div>
  )
}

export default Dashboard
