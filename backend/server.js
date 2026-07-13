require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('./config/passport')

const authRoutes   = require('./routes/auth')
const reviewRoutes = require('./routes/reviews')
const { notFound, errorHandler } = require('./middleware/errorHandler')

const app  = express()
const PORT = process.env.PORT || 5001

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:5174',
]
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Vite proxy, curl, Postman)
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) return callback(null, true)
      callback(new Error('CORS: origin not allowed'))
    },
    credentials: true,
  }),
)

// ─── Body parsing ─────────────────────────────────────────────────────────────
app.use(express.json())

// ─── Passport (no sessions — JWT only) ───────────────────────────────────────
app.use(passport.initialize())

// ─── Routes ──────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'SmartStay AI API is running',
    version: '3.0.0',
  })
})

app.use('/api/auth',    authRoutes)
app.use('/api/reviews', reviewRoutes)

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFound)
app.use(errorHandler)

// ─── Connect to MongoDB then start ───────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully')
    app.listen(PORT, () => {
      console.log(`SmartStay AI backend running at http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  })
