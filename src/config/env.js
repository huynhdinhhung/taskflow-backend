require('dotenv').config()

module.exports = {
  NODE_ENV:               process.env.NODE_ENV || 'development',
  PORT:                   parseInt(process.env.PORT) || 4000,
  DATABASE_URL:           process.env.DATABASE_URL,
  REDIS_URL:              process.env.REDIS_URL || 'redis://localhost:6379',
  JWT_SECRET:             process.env.JWT_SECRET || 'dev-secret-change-in-prod',
  JWT_EXPIRES_IN:         process.env.JWT_EXPIRES_IN || '15m',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  CORS_ORIGIN:            process.env.CORS_ORIGIN || 'http://localhost:3000',
}
