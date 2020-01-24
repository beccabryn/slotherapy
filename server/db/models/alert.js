const Sequelize = require('sequelize')
const db = require('../db')

const Alert = db.define('alert', {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  liked: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Alert
