const User = require('./user')
const Alert = require('./alert')
const Message = require('./message')
const Session = require('./session')
const Slotherapist = require('./slotherapist')
const SlothImg = require('./slothImg')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Session.belongsTo(User)
User.hasMany(Session)

Slotherapist.belongsTo(Session)
Session.hasOne(Slotherapist)

Session.hasMany(Alert)
Alert.belongsTo(Session)

Message.belongsTo(Alert)
Alert.hasOne(Message)

SlothImg.belongsTo(Alert)
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
  Session,
  Slotherapist,
  SlothImg
}
