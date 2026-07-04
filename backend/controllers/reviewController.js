const Review = require('../models/Review')

// ─── Validation helper ────────────────────────────────────────────────────────
// Kept identical to Week 4 so error messages are unchanged.
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

// ─── Controllers ─────────────────────────────────────────────────────────────

/**
 * GET /api/reviews
 * Returns all reviews sorted by date descending.
 */
async function getAllReviews(req, res, next) {
  try {
    const reviews = await Review.find().sort({ date: -1 })
    res.status(200).json({ success: true, count: reviews.length, data: reviews })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/reviews/search?q=
 * Search reviews by guestName, hotel, or review text (case-insensitive).
 */
async function searchReviews(req, res, next) {
  try {
    const q = (req.query.q || '').trim()
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Query parameter "q" is required for search.',
      })
    }

    const regex = new RegExp(q, 'i') // case-insensitive
    const results = await Review.find({
      $or: [{ guestName: regex }, { hotel: regex }, { review: regex }],
    }).sort({ date: -1 })

    res.status(200).json({ success: true, count: results.length, data: results })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/reviews/:id
 * Returns a single review by its MongoDB _id.
 */
async function getReviewById(req, res, next) {
  try {
    const review = await Review.findById(req.params.id)
    if (!review) {
      return res.status(404).json({
        success: false,
        error: `Review with id "${req.params.id}" not found.`,
      })
    }
    res.status(200).json({ success: true, data: review })
  } catch (err) {
    // Mongoose CastError = invalid ObjectId format → treat as 404
    if (err.name === 'CastError') {
      return res.status(404).json({
        success: false,
        error: `Review with id "${req.params.id}" not found.`,
      })
    }
    next(err)
  }
}

/**
 * POST /api/reviews
 * Creates a new review and persists it to MongoDB.
 */
async function createReview(req, res, next) {
  try {
    const errors = validateReviewBody(req.body)
    if (errors.length > 0) {
      return res.status(400).json({ success: false, error: errors.join(' ') })
    }

    const { guestName, hotel, rating, review, sentiment, date } = req.body

    const newReview = await Review.create({
      guestName: guestName.trim(),
      hotel: hotel.trim(),
      rating: Number(rating),
      review: review.trim(),
      sentiment: sentiment || 'neutral',
      date: date ? new Date(date) : new Date(),
    })

    res.status(201).json({ success: true, data: newReview })
  } catch (err) {
    next(err)
  }
}

/**
 * PUT /api/reviews/:id
 * Updates an existing review by its MongoDB _id.
 */
async function updateReview(req, res, next) {
  try {
    const errors = validateReviewBody(req.body)
    if (errors.length > 0) {
      return res.status(400).json({ success: false, error: errors.join(' ') })
    }

    const { guestName, hotel, rating, review, sentiment, date } = req.body

    const updated = await Review.findByIdAndUpdate(
      req.params.id,
      {
        guestName: guestName.trim(),
        hotel: hotel.trim(),
        rating: Number(rating),
        review: review.trim(),
        sentiment: sentiment || 'neutral',
        ...(date && { date: new Date(date) }),
      },
      { new: true, runValidators: true },
    )

    if (!updated) {
      return res.status(404).json({
        success: false,
        error: `Review with id "${req.params.id}" not found.`,
      })
    }

    res.status(200).json({ success: true, data: updated })
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({
        success: false,
        error: `Review with id "${req.params.id}" not found.`,
      })
    }
    next(err)
  }
}

/**
 * DELETE /api/reviews/:id
 * Deletes a review by its MongoDB _id.
 */
async function deleteReview(req, res, next) {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id)

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: `Review with id "${req.params.id}" not found.`,
      })
    }

    res.status(204).send()
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({
        success: false,
        error: `Review with id "${req.params.id}" not found.`,
      })
    }
    next(err)
  }
}

module.exports = {
  getAllReviews,
  searchReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
}
