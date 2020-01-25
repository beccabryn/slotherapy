'use strict'

const db = require('../server/db')
const {
  User,
  Metric,
  Alert,
  Message,
  Slotherapist,
  SlothImg
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  //USERS
  const users = [
    {
      email: 'rduhamel9@gmail.com',
      password: '123',
      firstName: 'Becca',
      frequency: 1
    },
    {
      email: 'beyonce@gmail.com',
      password: '123',
      firstName: 'Beyonce',
      frequency: 10
    },
    {
      email: 'dannydevito@gmail.com',
      password: '123',
      firstName: 'Danny',
      frequency: 180
    },
    {
      email: 'marthastewart@gmail.com',
      password: '123',
      firstName: 'Martha',
      frequency: 120
    }
  ]
  const allUsers = await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )
  console.log(`seeded ${users.length} users`)

  //METRICS
  const metrics = [
    {
      mood: 3,
      productivity: 4,
      stress: 3
    },
    {
      mood: 5,
      productivity: 4,
      stress: 1
    },
    {
      mood: 2,
      productivity: 1,
      stress: 5
    },
    {
      mood: 3,
      productivity: 3,
      stress: 3
    }
  ]
  const allMetrics = await Promise.all(
    metrics.map(metric => {
      return Metric.create(metric)
    })
  )
  console.log(`seeded ${metrics.length} metrics`)

  //ALERTS
  const alerts = [
    {
      liked: true,
      completed: true
    },
    {
      liked: false,
      completed: false
    }
  ]
  const allAlerts = await Promise.all(
    alerts.map(alert => {
      return Alert.create(alert)
    })
  )

  //MESSAGES
  const messages = [
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
    }
  ]
  const allMessages = await Promise.all(
    messages.map(message => {
      return Message.create(message)
    })
  )
  console.log(`seeded ${messages.length} messages`)

  //SLOTHERAPISTS
  const slotherapists = [
    {
      name: 'Evan',
      imageUrl:
        'https://ticotimes.net/wp-content/uploads/2019/11/3-toed-sloth-TRR.jpg'
    },
    {
      name: 'Louise',
      imageUrl:
        'https://www.rd.com/wp-content/uploads/2016/04/sloths-slide3SamTrull.jpg'
    },
    {
      name: 'Sergei',
      imageUrl:
        'https://c402277.ssl.cf1.rackcdn.com/photos/6526/images/hero_small/sloth_%28c%29_Jorge_Salas_International_Expeditions.JPG?1394634201'
    },
    {
      name: 'Deb',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQADNBNjXWopxus3OxbIaJjp7B0GSB60ucKVyZ-FDBRroXDTVfc&s'
    }
  ]
  const allSlotherapists = await Promise.all(
    slotherapists.map(slotherapist => {
      return Slotherapist.create(slotherapist)
    })
  )
  console.log(`seeded ${slotherapists.length} slotherapists`)

  //IMAGES
  const slothImages = [
    {
      imageUrl:
        'https://cdn-image.travelandleisure.com/sites/default/files/1539963100/sloth-SLOTH1018.jpg'
    },
    {
      imageUrl:
        'https://image.businessinsider.com/5d4492b4b44ce7088915f5bc?width=1100&format=jpeg&auto=webp'
    },
    {
      imageUrl:
        'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/PCU77LE5UMI6TMT75UUUF5Z5OA.jpg&w=767'
    },
    {
      imageUrl:
        'https://cdn.news.uchicago.edu/sites/default/files/styles/full_width/public/images/2019-06/sloth_family_tree.jpg?itok=ydcO7ctD'
    },
    {
      imageUrl:
        'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555303893/shape/mentalfloss/monster_primary_0.png'
    },
    {
      imageUrl: 'https://scx1.b-cdn.net/csz/news/800/2019/slothsarefar.jpg'
    },
    {
      imageUrl:
        'https://ichef.bbci.co.uk/wwfeatures/live/624_351/images/live/p0/51/5r/p0515rhm.jpg'
    },
    {
      imageUrl:
        'https://media.mnn.com/assets/images/2018/04/LItSL_4.jpg.990x0_q80_crop-smart.jpg'
    },
    {
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/2/2e/MC_Drei-Finger-Faultier.jpg'
    },
    {
      imageUrl:
        'https://media.tacdn.com/media/attractions-splice-spp-674x446/08/49/c6/9d.jpg'
    }
  ]
  const allSlothImages = await Promise.all(
    slothImages.map(image => {
      return SlothImg.create(image)
    })
  )
  console.log(`seeded ${slothImages.length} sloth images`)

  //ASSOCIATIONS
  for (const i in allMetrics) {
    await allUsers[i].addMetric(allMetrics[i])
  }
  for (const i in allAlerts) {
    await allUsers[i].addAlert(allAlerts[i])
  }
  for (const i in allSlotherapists) {
    await allUsers[i].setSlotherapist(allSlotherapists[i])
  }
  for (const i in allAlerts) {
    await allAlerts[i].setMessage(allMessages[i])
  }
  // console.log('stuff on user: ', allSlothImages[0].__proto__)
  for (const i in allAlerts) {
    await allAlerts[i].setSlothImg(allSlothImages[i])
  }

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
