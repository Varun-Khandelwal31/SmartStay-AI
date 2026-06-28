const reviews = require('../data/reviews')

// Utility: generate a simple unique id
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

// Utility: validate required fields on a review body
function validateReviewBody(body) {
  const { guestName, hotel, rating, review, sentiment } = body
  const errors = []

  if (!guestName || typeof guestName !== 'string' || guestName.trim() === '') {
    errors.push('guestName is required and must be a non-empty string.')
  }
  if (!hotel || typeof hotel !== 'string' || hotel.trim() === '') {
    errors.push('hotel is required and must be a non-empty string.')
  }
  if (rating === undefined || rating === null) {
    errors.push('rating is required.')
  } else {
    const num = Number(rating)
    if (!Number.isInteger(num) || num < 1 || num > 5) {
      errors.push('rating must be an integer between 1 and 5.')
    }
  }
  if (!review || typeof review !== 'string' || review.trim() === '') {
    errors.push('review is required and must be a non-empty string.')
  }
  const validSentiments = ['positive', 'neutral', 'negative']
  if (sentiment && !validSentiments.includes(sentiment)) {
    errors.push(`sentiment must be one of: ${validSentiments.join(', ')}.`)
  }

  return errors
}

/**
 * GET /api/reviews
 * Returns all reviews.
 */
function getAllReviews(req, res) {
  res.status(200).json({ success: true, count: reviews.length, data: reviews })
}

/**
 * GET /api/reviews/search?q=
 * Search reviews by guestName, hotel, or review text (case-insensitive).
 */
function searchReviews(req, res) {
  const q = (req.query.q || '').trim().toLowerCase()
  if (!q) {
    return res.status(400).json({
      success: false,
      error: 'Query parameter "q" is required for search.',
    })
  }

  const results = reviews.filter(
    (r) =>
      r.guestName.toLowerCase().includes(q) ||
      r.hotel.toLowerCase().includes(q) ||
      r.review.toLowerCase().includes(q),
  )

  res.status(200).json({ success: true, count: results.length, data: results })
}

/**
 * GET /api/reviews/:id
 * Returns a single review by id.
 */
function getReviewById(req, res) {
  const review = reviews.find((r) => r.id === req.params.id)
  if (!review) {
    return res.status(404).json({
      success: false,
      error: `Review with id "${req.params.id}" not found.`,
    })
  }
  res.status(200).json({ success: true, data: review })
}

/**
 * POST /api/reviews
 * Creates a new review.
 */
function createReview(req, res) {
  const errors = validateReviewBody(req.body)
  if (errors.length > 0) {
    return res.status(400).json({ success: false, error: errors.join(' ') })
  }

  const { guestName, hotel, rating, review, sentiment, date } = req.body

  const newReview = {
    id: generateId(),
    guestName: guestName.trim(),
    hotel: hotel.trim(),
    rating: Number(rating),
    review: review.trim(),
    sentiment: sentiment || 'neutral',
    date: date || new Date().toISOString(),
  }

  reviews.push(newReview)
  res.status(201).json({ success: true, data: newReview })
}

/**
 * PUT /api/reviews/:id
 * Updates an existing review by id.
 */
function updateReview(req, res) {
  const index = reviews.findIndex((r) => r.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: `Review with id "${req.params.id}" not found.`,
    })
  }

  const errors = validateReviewBody(req.body)
  if (errors.length > 0) {
    return res.status(400).json({ success: false, error: errors.join(' ') })
  }

  const { guestName, hotel, rating, review, sentiment, date } = req.body

  reviews[index] = {
    ...reviews[index],
    guestName: guestName.trim(),
    hotel: hotel.trim(),
    rating: Number(rating),
    review: review.trim(),
    sentiment: sentiment || reviews[index].sentiment,
    date: date || reviews[index].date,
  }

  res.status(200).json({ success: true, data: reviews[index] })
}

/**
 * DELETE /api/reviews/:id
 * Deletes a review by id.
 */
function deleteReview(req, res) {
  const index = reviews.findIndex((r) => r.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: `Review with id "${req.params.id}" not found.`,
    })
  }

  reviews.splice(index, 1)
  res.status(204).send()
}

module.exports = {
  getAllReviews,
  searchReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
}
