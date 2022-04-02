const User = require('./User')
const MyPlant = require('./MyPlant')
const PlantBasic = require('./PlantBasic')
const PlantPicture = require('./PlantPicture')
const Comment = require('./Comment')

const UserIDFK = { foreignKey: 'UserId', targetKey: 'id', sourceKey: 'id' }
const PlantBasicIDFK = { foreignKey: 'PlantBasicId', targetKey: 'id', sourceKey: 'id' }

PlantBasic.hasOne(MyPlant, PlantBasicIDFK)
PlantBasic.hasMany(PlantPicture, PlantBasicIDFK)
PlantBasic.hasMany(Comment, PlantBasicIDFK)

MyPlant.belongsTo(PlantBasic, PlantBasicIDFK)
MyPlant.belongsTo(User, UserIDFK)

PlantPicture.belongsTo(PlantBasic, PlantBasicIDFK)

Comment.belongsTo(User, UserIDFK)
Comment.belongsTo(PlantBasic, PlantBasicIDFK)

User.hasMany(Comment, UserIDFK)
User.hasMany(MyPlant, UserIDFK)

module.exports = {
  User,
  MyPlant,
  PlantBasic,
  PlantPicture,
  Comment
}