const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const { CORS_ORIGIN, NODE_ENV } = require('./config/env')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

app.use(helmet())
app.use(cors({ origin: CORS_ORIGIN, credentials: true }))
app.use(express.json())
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'taskflow-backend', timestamp: new Date() })
})

app.use('/api/v1/auth',     require('./modules/auth/auth.routes'))
app.use('/api/v1/projects', require('./modules/projects/projects.routes'))
app.use('/api/v1/projects/:projectId/tasks', require('./modules/tasks/tasks.routes'))

app.use((req, res) => res.status(404).json({ success: false, message: 'Not found' }))
app.use(errorHandler)

module.exports = app
