const { ExtendedModel } = require('./ExtendedModel')

class PlantCare extends ExtendedModel {
  static modelName = 'PlantCare'
  static tableName = 'plant_care'
}

PlantCare.init(PlantCare.defineColumns(), PlantCare.defineTable())

module.exports = PlantCare