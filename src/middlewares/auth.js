const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/env')
const { error } = require('../utils/response')

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return error(res, 'Unauthorized', 401)
  }

  const token = authHeader.split(' ')[1]
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch (err) {
    return error(res, 'Token invalid or expired', 401)
  }
}

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'ADMIN') {
    return error(res, 'Forbidden', 403)
  }
  next()
}

module.exports = { authenticate, requireAdmin }
