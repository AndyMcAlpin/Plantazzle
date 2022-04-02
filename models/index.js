/**
 * @typedef {User | MyPlant | PlantBasic | PlantPicture | Comment | Vote} PlantazzleModelType
 */
const User = require('./User')
const MyPlant = require('./MyPlant')
const PlantBasic = require('./PlantBasic')
const PlantPicture = require('./PlantPicture')
const Comment = require('./Comment')
const Vote = require('./Vote')

/**
 * Creates options for hasOne, hasMany, and belongsTo methods.
 * sourceKey supports hasOne and key supports hasMany as the options to pass.
 * @param { string } columnName
 * @returns { { sourceKey: string, targetKey: string, foreignKey: string } }
 */
const pkFk = ( columnName ) => {
  return { foreignKey: columnName, targetKey: 'id', sourceKey: 'id' }
}

const uPkFk = pkFk('UserId')
const pPkFk = pkFk('PlantBasicId')
const cPkFk = pkFk('CommentId')

User.hasMany(Comment, uPkFk)
User.hasMany(MyPlant, uPkFk)
User.hasMany(Vote, uPkFk)

PlantBasic.hasOne(MyPlant, pPkFk)
PlantBasic.hasMany(PlantPicture, pPkFk)
PlantBasic.hasMany(Comment, pPkFk)

MyPlant.belongsTo(PlantBasic, pPkFk)
MyPlant.belongsTo(User, uPkFk)

PlantPicture.belongsTo(PlantBasic, pPkFk)

Comment.belongsTo(User, uPkFk)
Comment.belongsTo(PlantBasic, pPkFk)
Comment.hasMany(Vote, cPkFk)

Vote.belongsTo(User, uPkFk)
Vote.belongsTo(Comment, cPkFk)

module.exports = {
  User,
  MyPlant,
  PlantBasic,
  PlantPicture,
  Comment,
  Vote
}