const { createClient } = require('redis')
const { REDIS_URL } = require('./env')

const redis = createClient({ url: REDIS_URL })

redis.on('error', (err) => console.error('Redis error:', err))
redis.on('connect', () => console.log('Redis connected'))

const connectRedis = async () => {
  if (!redis.isOpen) await redis.connect()
}

module.exports = { redis, connectRedis }
