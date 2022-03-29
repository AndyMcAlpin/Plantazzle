const User = require('./User')
const Plant = require('./Plant')
const PlantZone = require('./PlantZone')
const PlantBasic = require('./PlantBasic')
const PlantGrowing = require('./PlantGrowing')
const PlantCare = require('./PlantCare')

User.associate()
Plant.associate()
PlantZone.associate()
PlantBasic.associate()
PlantGrowing.associate()
PlantCare.associate()

module.exports = {
  User,
  Plant,
  PlantZone,
  PlantBasic,
  PlantGrowing,
  PlantCare
}