const Sequelize = require('sequelize')
const db = require('../db')

const Metrics = db.define('metric', {
  mood: {
    type: Sequelize.INTEGER,
    validation: {
      min: 1,
      max: 5
    }
  },
  productivity: {
    type: Sequelize.INTEGER,
    validation: {
      min: 1,
      max: 5
    }
  },
  stress: {
    type: Sequelize.INTEGER,
    validation: {
      min: 1,
      max: 5
    }
  }
})

module.exports = Metrics
