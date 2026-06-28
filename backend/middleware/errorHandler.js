/**
 * Centralized Express error-handling middleware.
 * Must be registered last with app.use().
 *
 * Handles:
 *   400 - Validation / bad request errors
 *   404 - Resource not found (set by notFound middleware below)
 *   500 - Unexpected server errors
 */
function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || err.status || 500

  const response = {
    success: false,
    error: err.message || 'An unexpected server error occurred.',
  }

  // Include stack trace only in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack
  }

  res.status(statusCode).json(response)
}

/**
 * 404 middleware — catches any request that didn't match a route.
 * Call before errorHandler.
 */
function notFound(req, res, _next) {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  })
}

module.exports = { errorHandler, notFound }
