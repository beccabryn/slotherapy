const Sequelize = require('sequelize')
const db = require('../db')

const Alert = db.define('alert', {
  completed: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Alert
