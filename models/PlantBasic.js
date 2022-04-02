const { ExtendedModel } = require('./ExtendedModel')

class PlantBasic extends ExtendedModel {
  static tableName = 'plant_basics'
  static modelName = 'PlantBasic'
}

PlantBasic.init(PlantBasic.defineColumns(), PlantBasic.defineTable());

module.exports = PlantBasic;