import { useState, useCallback } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { Loader, Toast, Button } from '../components/ui'
import { useAuth } from '../context/AuthContext.jsx'

const sentimentColors = {
  Positive: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800',
  Neutral: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
  Negative: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
}

const priorityColors = {
  Low: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
  Medium: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
  High: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
}

function AIReview() {
  const { token } = useAuth()
  const [reviewText, setReviewText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'info' })

  const showToast = useCallback((message, type = 'info') => {
    setToast({ isVisible: true, message, type })
    setTimeout(() => setToast((prev) => ({ ...prev, isVisible: false })), 4000)
  }, [])

  const handleAnalyze = async (e) => {
    e.preventDefault()
    if (!reviewText.trim()) return

    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/ai/analyze-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ review: reviewText }),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error || 'Failed to analyze review')
      }

      setResult(json.data)
    } catch (err) {
      showToast(err.message || 'An error occurred during analysis.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setReviewText('')
    setResult(null)
    setCopied(false)
  }

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      showToast('Failed to copy to clipboard', 'warning')
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
              AI Review Analyzer
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
              Harness the power of AI to instantly analyze guest feedback. Get real-time sentiment tags, summarized viewpoints, key hospitality issues, action priority levels, and ready-to-use professional responses.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            
            {/* Input Panel */}
            <section className="lg:col-span-5">
              <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                <form onSubmit={handleAnalyze} className="space-y-4">
                  <div>
                    <label 
                      htmlFor="review-input" 
                      className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Guest Review Text
                    </label>
                    <textarea
                      id="review-input"
                      rows={8}
                      placeholder="Paste guest review here..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      disabled={loading}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm leading-relaxed transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 disabled:opacity-50"
                    />
                    <div className="mt-1 flex justify-end">
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        {reviewText.length} characters
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={loading || !reviewText.trim()}
                      className="flex-1"
                    >
                      {loading ? 'Analyzing...' : 'Analyze'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClear}
                      disabled={loading}
                    >
                      Clear
                    </Button>
                  </div>
                </form>
              </article>
            </section>

            {/* Output Panel */}
            <section className="lg:col-span-7">
              {loading && (
                <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-16 dark:border-slate-700">
                  <Loader size="lg" label="Analyzing review..." />
                  <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
                    Analyzing guest review insights...
                  </p>
                </div>
              )}

              {!loading && !result && (
                <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-16 dark:border-slate-800">
                  <svg 
                    className="h-12 w-12 text-slate-300 dark:text-slate-700" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M9.663 17h4.673M12 3v1m6.364.364l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                    />
                  </svg>
                  <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                    Submit a review on the left to view AI analysis.
                  </p>
                </div>
              )}

              {!loading && result && (
                <div className="space-y-6">
                  
                  {/* Row 1: Sentiment & Priority */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    
                    {/* Sentiment Card */}
                    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Sentiment
                      </h3>
                      <div className="mt-3 flex items-center gap-2">
                        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${sentimentColors[result.sentiment] || ''}`}>
                          {result.sentiment}
                        </span>
                      </div>
                    </article>

                    {/* Priority Card */}
                    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Priority Level
                      </h3>
                      <div className="mt-3 flex items-center gap-2">
                        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${priorityColors[result.priority] || ''}`}>
                          {result.priority}
                        </span>
                      </div>
                    </article>

                  </div>

                  {/* Summary Card */}
                  <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Summary
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {result.summary}
                    </p>
                  </article>

                  {/* Key Issues Card */}
                  <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Key Issues Identified
                    </h3>
                    {result.keyIssues && result.keyIssues.length > 0 ? (
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {result.keyIssues.map((issue, index) => (
                          <li 
                            key={index}
                            className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          >
                            {issue}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-3 text-xs italic text-slate-500 dark:text-slate-400">
                        No specific issues detected.
                      </p>
                    )}
                  </article>

                  {/* Hotel Response Card */}
                  <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Suggested Hotel Response
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleCopy(result.hotelResponse)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 focus:outline-none"
                      >
                        {copied ? (
                          <>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            Copy Response
                          </>
                        )}
                      </button>
                    </div>
                    <blockquote className="mt-3 rounded-lg border-l-4 border-indigo-500 bg-slate-50 p-4 text-sm italic leading-relaxed text-slate-700 dark:bg-slate-950 dark:text-slate-300">
                      "{result.hotelResponse}"
                    </blockquote>
                  </article>

                </div>
              )}
            </section>

          </div>

        </div>
      </main>
      <Footer />

      {/* Error Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </div>
  )
}

export default AIReview
