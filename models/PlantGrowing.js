const { ExtendedModel } = require('./ExtendedModel')

class PlantGrowing extends ExtendedModel {
  static modelName = 'PlantGrowing'
  static tableName = 'plant_growing'
}

PlantGrowing.init(PlantGrowing.defineColumns(), PlantGrowing.defineTable())

module.exports = PlantGrowing