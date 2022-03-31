const User = require('./User')
const MyPlant = require('./MyPlant')
const PlantBasic = require('./PlantBasic')
const PlantPicture = require('./PlantPicture')

module.exports = {
  User: User.associate({ MyPlant }),
  MyPlant: MyPlant.associate({ PlantBasic }),
  PlantBasic: PlantBasic.associate({ MyPlant, PlantPicture }),
  PlantPicture: PlantPicture.associate({ PlantBasic })
}