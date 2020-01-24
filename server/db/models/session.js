const Sequelize = require('sequelize')
const db = require('../db')

const Session = db.define('session', {
  frequency: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    validation: {
      isIn: [['1 Min'], ['10 Min'], ['30 Min'], ['1 Hr'], ['2 Hrs'], ['3 Hrs']]
    }
  },
  mood: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    validation: {
      isIn: [[1], [2], [3], [4], [5]]
    }
  },
  productivity: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    validation: {
      isIn: [[1], [2], [3], [4], [5]]
    }
  },
  stress: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    validation: {
      isIn: [[1], [2], [3], [4], [5]]
    }
  }
})

module.exports = Session
