const { validationResult } = require('express-validator')
const authService = require('./auth.service')
const { success, error } = require('../../utils/response')

const register = async (req, res, next) => {
  try {
    const errs = validationResult(req)
    if (!errs.isEmpty()) return error(res, 'Validation failed', 422, errs.array())
    const user = await authService.register(req.body)
    return success(res, { user }, 'Registered successfully', 201)
  } catch (err) { next(err) }
}

const login = async (req, res, next) => {
  try {
    const errs = validationResult(req)
    if (!errs.isEmpty()) return error(res, 'Validation failed', 422, errs.array())
    const result = await authService.login(req.body)
    return success(res, result, 'Login successful')
  } catch (err) { next(err) }
}

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) return error(res, 'Refresh token required', 400)
    const tokens = await authService.refresh(refreshToken)
    return success(res, tokens, 'Token refreshed')
  } catch (err) { next(err) }
}

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body
    if (refreshToken) await authService.logout(refreshToken)
    return success(res, null, 'Logged out')
  } catch (err) { next(err) }
}

const me = (req, res) => success(res, { user: req.user }, 'Current user')

module.exports = { register, login, refresh, logout, me }
