const jwt = require('jsonwebtoken')

/**
 * verifyToken middleware
 * Reads Authorization: Bearer <token>, validates JWT,
 * attaches decoded payload to req.user.
 * Returns 401 if token is missing or invalid.
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    return res.status(401).json({ success: false, error: 'Access denied. No token provided.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ success: false, error: 'Invalid or expired token.' })
  }
}

module.exports = verifyToken
