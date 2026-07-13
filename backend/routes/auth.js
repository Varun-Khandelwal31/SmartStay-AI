const express = require('express')
const router = express.Router()
const rateLimit = require('express-rate-limit')
const { body } = require('express-validator')
const { register, login } = require('../controllers/authController')
const passport = require('passport')
const { generateToken } = require('../controllers/authController')

// ─── Rate limiter: 5 attempts per 15 min ─────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many attempts. Please try again in 15 minutes.' },
})

// ─── Validators ───────────────────────────────────────────────────────────────
const registerValidators = [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('email').isEmail().withMessage('A valid email address is required.').normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters.'),
]

const loginValidators = [
  body('email').isEmail().withMessage('A valid email address is required.').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required.'),
]

// ─── Routes ───────────────────────────────────────────────────────────────────
router.post('/register', authLimiter, registerValidators, register)
router.post('/login', authLimiter, loginValidators, login)

// ─── Google OAuth ─────────────────────────────────────────────────────────────
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false }),
)

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login?error=oauth' }),
  (req, res) => {
    const token = generateToken(req.user)
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'
    // Redirect to frontend with token in query — frontend reads it and stores in localStorage
    res.redirect(`${clientUrl}/auth/callback?token=${token}`)
  },
)

module.exports = router
