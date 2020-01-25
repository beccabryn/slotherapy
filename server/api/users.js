const router = require('express').Router()
const {User, Slotherapist} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    const slotherapist = await Slotherapist.findByPk(req.body.slotherapistId)
    const updatedUser = await user.update(req.body)
    await updatedUser.setSlotherapist(slotherapist)
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})

// no post necessary

// no delete necessary (no admin)
