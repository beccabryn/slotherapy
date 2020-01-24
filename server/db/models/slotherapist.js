const Sequelize = require('sequelize')
const db = require('../db')

const Slotherapist = db.define('slotherapist', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Slotherapist
