const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/messages', require('./messages'))
router.use('/slothImgs', require('./slothImgs'))
router.use('/slotherapists', require('./slotherapists'))
router.use('/metrics', require('./metrics'))
router.use('/alerts', require('./alerts'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
