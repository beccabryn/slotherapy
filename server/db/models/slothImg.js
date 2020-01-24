const Sequelize = require('sequelize')
const db = require('../db')

const SlothImg = db.define('slothImg', {
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = SlothImg
