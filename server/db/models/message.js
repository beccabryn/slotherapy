const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  steps: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  warnings: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true
  }
})

module.exports = Message
