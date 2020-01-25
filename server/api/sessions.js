const router = require('express').Router()
const {Session} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const sessions = await Session.findAll({})
    res.json(sessions)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.params.id)
    res.json(session)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newSession = await Session.create(req.body)
    res.json(newSession)
  } catch (error) {
    next(error)
  }
})
