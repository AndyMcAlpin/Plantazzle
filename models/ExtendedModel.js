const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
const { attributes, columns, options } = require('./props')

const { STRING, INTEGER, TEXT, VIRTUAL } = DataTypes

class ExtendedModel extends Model {
  static tableName = ''
  static modelName = ''
  static QO = options

  static defineColumns() {
    return columns[this.modelName]
  }

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

module.exports = { ExtendedModel };