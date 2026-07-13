const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const User = require('../models/User')

function generateToken(user) {
  return jwt.sign(
    { id: user._id.toString(), email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  )
}

/**
 * POST /api/auth/register
 */
async function register(req, res, next) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    const { name, email, password } = req.body

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return res.status(400).json({ success: false, error: 'An account with this email already exists.' })
    }

    const user = new User({ name: name.trim(), email: email.toLowerCase(), password })
    await user.save()

    res.status(201).json({ success: true, message: 'Registration successful. Please log in.' })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/auth/login
 */
async function login(req, res, next) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    const { email, password } = req.body

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user || !user.password) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' })
    }

    const match = await user.comparePassword(password)
    if (!match) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' })
    }

    const token = generateToken(user)

    res.status(200).json({
      success: true,
      token,
      user: user.toJSON(),
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { register, login, generateToken }
