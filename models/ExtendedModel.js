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

  // static getAttributes(...exclude) {
  //   return attributes[this.modelName].filter(attr => {
  //     let isFound = exclude.find(str => str === attr)
  //     return isFound !== undefined
  //   })
  // }
}

module.exports = { ExtendedModel };