const router = require('express').Router()
const {Slotherapist} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const therapists = await Slotherapist.findAll({})
    res.json(therapists)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const therapist = await Slotherapist.findByPk(req.params.id)
    res.json(therapist)
  } catch (error) {
    next(error)
  }
})

router.get('/users/:id', async (req, res, next) => {
  try {
    const currSloth = await Slotherapist.findOne({
      where: {
        userId: req.params.id
      }
    })
    res.json(currSloth)
  } catch (error) {
    next(error)
  }
})
