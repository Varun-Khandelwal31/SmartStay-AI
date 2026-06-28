require('dotenv').config()

const express = require('express')
const cors = require('cors')
const reviewRoutes = require('./routes/reviews')
const { notFound, errorHandler } = require('./middleware/errorHandler')

const app = express()
const PORT = process.env.PORT || 5001

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:5173' })) // Vite dev server default port
app.use(express.json())

// ─── Routes ──────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'SmartStay AI API is running',
    version: '1.0.0',
  })
})

app.use('/api/reviews', reviewRoutes)

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFound)
app.use(errorHandler)

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`SmartStay AI backend running at http://localhost:${PORT}`)
})
