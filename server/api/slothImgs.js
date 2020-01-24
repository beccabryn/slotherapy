const router = require('express').Router()
const {SlothImg} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const images = await SlothImg.findAll({})
    res.json(images)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const image = await SlothImg.findByPk(req.params.id)
    res.json(image)
  } catch (error) {
    next(error)
  }
})
