const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const prisma = require('../../config/db')
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../../config/env')

const generateTokens = (user) => {
  const payload = { id: user.id, email: user.email, role: user.role }
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
  const refreshToken = uuidv4()
  return { accessToken, refreshToken }
}

const register = async ({ email, password, name }) => {
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) throw { statusCode: 409, message: 'Email already registered' }

  const hashed = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: { email, password: hashed, name },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  })
  return user
}

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.isActive) throw { statusCode: 401, message: 'Invalid credentials' }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw { statusCode: 401, message: 'Invalid credentials' }

  const { accessToken, refreshToken } = generateTokens(user)

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7)
  await prisma.refreshToken.create({
    data: { token: refreshToken, userId: user.id, expiresAt },
  })

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  }
}

const refresh = async (token) => {
  const stored = await prisma.refreshToken.findUnique({
    where: { token },
    include: { user: true },
  })
  if (!stored || stored.expiresAt < new Date()) {
    throw { statusCode: 401, message: 'Refresh token invalid or expired' }
  }

  const { accessToken, refreshToken: newRefresh } = generateTokens(stored.user)

  await prisma.refreshToken.delete({ where: { token } })
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7)
  await prisma.refreshToken.create({
    data: { token: newRefresh, userId: stored.user.id, expiresAt },
  })

  return { accessToken, refreshToken: newRefresh }
}

const logout = async (token) => {
  await prisma.refreshToken.deleteMany({ where: { token } })
}

module.exports = { register, login, refresh, logout }
