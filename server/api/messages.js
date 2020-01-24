const router = require('express').Router()
const {Message} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.findAll({})
    res.json(messages)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const message = await Message.findByPk(req.params.id)
    res.json(message)
  } catch (error) {
    next(error)
  }
})
