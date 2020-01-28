const router = require('express').Router()
const {Alert, User, Message, Slotherapist} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')

const allMessages = [
  {
    title: 'Focus Change',
    steps: [
      ['Hold one finger a few inches away from the eye'],
      ['Focus on the finger'],
      ['Slowly move the finger away'],
      ['Focus far into the distance and then back to the finger'],
      ['Slowly bring the finger back to within a few inches of the eye'],
      ['Focus on something more than 8 feet away'],
      ['Repeat 3 times']
    ]
  },
  {
    title: 'The Head Tilt (side)',
    steps: [
      ['Start with head in a comfortable aligned position'],
      [
        'Slowly tilt head to left side to streatch muscles on the right side of the neck'
      ],
      ['Hold stretch for 5-10 seconds'],
      ['Feel a good, even stretch'],
      ['Then tilt head to the right side and stretch'],
      ['Do this 2-3 times on each side']
    ],
    warnings: [['Do not overstretch']]
  },
  {
    title: 'The Head Tilt (forward)',
    steps: [
      ['Gently tilt your head forward to stretch the back of your neck'],
      ['Hold for 5-10 seconds'],
      ['Repeat 2-3 times']
    ],
    warnings: [
      ['Hold only tensions that feel good'],
      ['Do not stretch to the point of pain']
    ]
  },
  {
    title: 'The Scream',
    steps: [
      ['Raise your eyebrows and open your eyes as wide as possible'],
      [
        'At the same time, open your mouth and stretch the muscles around your nose and chin and stick your tongue out'
      ],
      ['Hold this stretch for 5-10 seconds']
    ],
    warnings: [
      [
        'If you hear clicking or popping noises when opening mouth, check with your dentist before doing this stretch'
      ]
    ]
  },
  {
    title: 'Shoulder Shrug',
    steps: [
      [
        'Raise the top of your shoulder toward your ears until you feel slight tension in your neck and shoulders'
      ],
      ['Hold for 3-5 seconds, then relax your shoulders downward'],
      ['Repeat 2-3 times']
    ]
  },
  {
    title: 'Tri Stretch',
    steps: [
      ['Hold right elbow with left hand'],
      ['Gently pull elbow behind head until an easy tension-stretch is felt'],
      ['Hold for 5-10 seconds'],
      ['Repeat on other side']
    ],
    warnings: [['Do not stretch to the point of pain']]
  }
]

router.get('/', async (req, res, next) => {
  try {
    const notifications = await Alert.findAll({})
    res.json(notifications)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    // const message = await Message.findOne({
    //   where: {
    //     alertId: alert.id
    //   }
    // })
    const alertWithMessage = await Alert.findOne({
      where: {
        id: req.params.id
      },
      include: [Message]
    })
    res.json(alertWithMessage)
  } catch (error) {
    next(error)
  }
})

router.get('/user/:id', async (req, res, next) => {
  try {
    console.log('AYOOOo')
    const alerts = await Alert.findAll({
      where: {
        userId: req.params.id
      },
      include: [Message]
    })

    res.json(alerts)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newAlert = await Alert.create(req.body)
    await newAlert.setUser(req.user.id)

    const randomMessage =
      allMessages[Math.floor(Math.random() * allMessages.length)]

    const message = await Message.create(randomMessage)
    const slotherapist = await Slotherapist.findOne({
      where: {
        userId: req.user.id
      }
    })
    await newAlert.setMessage(message)
    const alertWithMessage = await Alert.findOne({
      where: {
        id: newAlert.id
      },
      include: [Message]
    })
    res.json({alert: alertWithMessage, slotherapist})
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const alert = await Alert.findByPk(req.params.id)
    const updatedAlert = await alert.update(req.body)
    res.json(updatedAlert)
  } catch (error) {
    next(error)
  }
})
