const { ExtendedModel } = require('./ExtendedModel')

class Vote extends ExtendedModel {
  static modelName = 'Vote'
  static tableName = 'votes'
}

Vote.init(Vote.defineColumns(), Vote.defineTable())

module.exports = Vote