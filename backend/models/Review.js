const mongoose = require('mongoose')

/**
 * Review schema for MongoDB.
 *
 * Matches the exact shape used by the Week 4 in-memory array
 * so the frontend and all API responses stay unchanged.
 */
const reviewSchema = new mongoose.Schema(
  {
    guestName: {
      type: String,
      required: [true, 'guestName is required and must be a non-empty string.'],
      trim: true,
    },
    hotel: {
      type: String,
      required: [true, 'hotel is required and must be a non-empty string.'],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'rating is required.'],
      min: [1, 'rating must be an integer between 1 and 5.'],
      max: [5, 'rating must be an integer between 1 and 5.'],
    },
    review: {
      type: String,
      required: [true, 'review is required and must be a non-empty string.'],
      trim: true,
    },
    sentiment: {
      type: String,
      enum: {
        values: ['positive', 'neutral', 'negative'],
        message: 'sentiment must be one of: positive, neutral, negative.',
      },
      default: 'neutral',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Adds createdAt and updatedAt automatically
    timestamps: true,
    // Transform _id → id in JSON output so the frontend receives "id" not "_id"
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id.toString()
        ret.date = ret.date ? ret.date.toISOString() : null
        delete ret._id
        delete ret.__v
        delete ret.createdAt
        delete ret.updatedAt
        return ret
      },
    },
  },
)

module.exports = mongoose.model('Review', reviewSchema)
