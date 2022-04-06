const { ExtendedModel } = require('./ExtendedModel')

class MyPlant extends ExtendedModel {
  static tableName = 'my_plants'
  static modelName = 'MyPlant'
}

MyPlant.init(MyPlant.defineColumns(), MyPlant.defineTable());

module.exports = MyPlant;