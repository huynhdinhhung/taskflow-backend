const router = require('express').Router()
const ctrl = require('./auth.controller')
const { authenticate } = require('../../middlewares/auth')
const { registerRules, loginRules } = require('../../utils/validators')

router.post('/register', registerRules, ctrl.register)
router.post('/login',    loginRules,    ctrl.login)
router.post('/refresh',                ctrl.refresh)
router.post('/logout',                 ctrl.logout)
router.get ('/me',       authenticate, ctrl.me)

module.exports = router
