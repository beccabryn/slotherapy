const User = require('./user')
const Alert = require('./alert')
const Message = require('./message')
const Metric = require('./metric')
const Slotherapist = require('./slotherapist')
const SlothImg = require('./slothImg')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Metric.belongsTo(User)
User.hasMany(Metric)

// Slotherapist.belongsTo(Session)
User.hasOne(Slotherapist)

User.hasMany(Alert)
Alert.belongsTo(User)

// Message.belongsTo(Alert)
Alert.hasOne(Message)

// SlothImg.belongsTo(Alert)
Alert.hasOne(SlothImg)
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Alert,
  Message,
  Metric,
  Slotherapist,
  SlothImg
}
