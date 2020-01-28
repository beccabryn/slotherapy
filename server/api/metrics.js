const router = require('express').Router()
const {Metric, User} = require('../db/models')
module.exports = router
const {Op} = require('sequelize')

router.get('/', async (req, res, next) => {
  try {
    const stats = await Metric.findAll({})
    res.json(stats)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    const stats = await Metric.findAll({
      where: {
        userId: user.id
      }
    })
    res.json(stats)
  } catch (error) {
    next(error)
  }
})

router.get('/users/:id/history', async (req, res, next) => {
  try {
    const now = new Date()
    const weekAgo = now.getDate() - 7
    const data = await Metric.findAll({
      where: {
        userId: req.params.id,
        createdAt: {
          [Op.gte]: weekAgo
        }
      }
    })
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    const newEntry = await Metric.create(req.body)
    await newEntry.setUser(req.user.id)
    res.json(newEntry)
  } catch (error) {
    next(error)
  }
})
