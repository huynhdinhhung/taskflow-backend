const app = require('./app')
const { PORT } = require('./config/env')
const { connectRedis } = require('./config/redis')
const prisma = require('./config/db')

const start = async () => {
  try {
    await prisma.$connect()
    console.log('PostgreSQL connected')

    await connectRedis()

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Startup failed:', err)
    process.exit(1)
  }
}

start()
