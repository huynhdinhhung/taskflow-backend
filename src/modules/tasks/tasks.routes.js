const router = require('express').Router({ mergeParams: true })
const { authenticate } = require('../../middlewares/auth')

router.use(authenticate)

router.get   ('/',    (req, res) => res.json({ message: 'list tasks - TODO' }))
router.post  ('/',    (req, res) => res.json({ message: 'create task - TODO' }))
router.put   ('/:id', (req, res) => res.json({ message: 'update task - TODO' }))
router.delete('/:id', (req, res) => res.json({ message: 'delete task - TODO' }))

module.exports = router
