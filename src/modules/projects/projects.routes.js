const router = require('express').Router()
const { authenticate } = require('../../middlewares/auth')

router.use(authenticate)

router.get   ('/',    (req, res) => res.json({ message: 'list projects - TODO' }))
router.post  ('/',    (req, res) => res.json({ message: 'create project - TODO' }))
router.get   ('/:id', (req, res) => res.json({ message: 'get project - TODO' }))
router.put   ('/:id', (req, res) => res.json({ message: 'update project - TODO' }))
router.delete('/:id', (req, res) => res.json({ message: 'delete project - TODO' }))

module.exports = router
