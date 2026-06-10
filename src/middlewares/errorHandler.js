const errorHandler = (err, req, res, next) => {
  console.error(err.stack)

  if (err.code === 'P2002') {
    return res.status(409).json({ success: false, message: 'Already exists' })
  }

  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
  })
}

module.exports = errorHandler
