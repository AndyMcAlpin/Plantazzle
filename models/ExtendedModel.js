const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

const { STRING, INTEGER, TEXT, VIRTUAL } = DataTypes

class ExtendedModel extends Model {
  static include = {}
  static tableName = ''
  static modelName = ''

  static defineTable() {
    return {
      sequelize,
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
      underscored: true,
      tableName: this.tableName,
      modelName: this.modelName
    }
  }
}

module.exports = { ExtendedModel, INTEGER, STRING, TEXT, VIRTUAL };