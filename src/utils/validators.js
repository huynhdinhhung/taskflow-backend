const { body } = require('express-validator')

const registerRules = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password min 8 chars'),
  body('name').trim().notEmpty().withMessage('Name is required'),
]

const loginRules = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
]

module.exports = { registerRules, loginRules }
