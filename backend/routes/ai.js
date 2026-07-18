const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const { analyzeReview } = require('../controllers/aiController')

// All AI endpoints require authentication
router.post('/analyze-review', verifyToken, analyzeReview)

module.exports = router
