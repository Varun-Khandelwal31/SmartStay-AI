const express = require('express')
const router = express.Router()
const {
  getAllReviews,
  searchReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController')

// Search must be defined BEFORE /:id so Express doesn't treat "search" as an id
router.get('/search', searchReviews)

router.get('/', getAllReviews)
router.get('/:id', getReviewById)
router.post('/', createReview)
router.put('/:id', updateReview)
router.delete('/:id', deleteReview)

module.exports = router
