const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const {
  getAllReviews,
  searchReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController')

// All review endpoints require a valid JWT
router.use(verifyToken)

// Search must be defined BEFORE /:id so Express doesn't treat "search" as an id
router.get('/search', searchReviews)

router.get('/',      getAllReviews)
router.get('/:id',   getReviewById)
router.post('/',     createReview)
router.put('/:id',   updateReview)
router.delete('/:id', deleteReview)

module.exports = router
