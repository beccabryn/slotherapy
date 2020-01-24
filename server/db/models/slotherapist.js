const Sequelize = require('sequelize')
const db = require('../db')

const Slotherapist = db.define('slotherapist', {
  name: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING
  }
})

module.exports = Slotherapist
