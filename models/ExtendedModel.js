const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

const { STRING, INTEGER, DATETIME } = DataTypes

class ExtendedModel extends Model {
  static include = {}
  static tableName = ''
  static modelName = ''

  static whereObj(
    whereObject = {},
    options = { include: true, deletedAtNull: true }
  ) {
    if(options.deletedAtNull) whereObject.deletedAt = null
    return options.include
      ? { where: whereObject, ...this.include }
      : { where: whereObject }
  }

  /**
   * Returns the entire collection.
   * @returns {Promise<Array<this>>}
   */
  static all() {
    return this.findAll({ ...this.whereObj() })
  }

  /**
   * Returns one if it exists and is not deleted.
   * @param { number } id
   * @returns { Promise<this> }
   */
  static byId(id) {
    return this.findOne({ ...this.whereObj({ id }) })
  }

  /**
   * This method will update the deletedAt with a timestamp.  This will remove it from the search queries.
   * A promise is returned with a Boolean.  If it is successful it is true.
   * If it is not successful, then either the id was not located or the item is already marked deleted.
   * @param { number } id
   * @returns { Promise<boolean> }
   */
  static deleteOne(id) {
    return this.update({ ...this.whereObj({ id }, { deletedAtNull: true }), individualHooks: true })
      .then(one => !one[1].length)
  }

  /**
   * This removes the deletedAt from there search parameters.
   * @param {{[column:string]:string|number}} obj This will be the search parameters.
   * @returns {Promise<Array<this>>}
   */
  static findWithoutDeletedAt(obj) {
    return this.findAll(this.whereObj(obj, { include: true }))
  }

  static defineTable() {
    return {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      tableName: this.tableName,
      modelName: this.modelName
    }
  }
}

module.exports = { ExtendedModel, sequelize, INTEGER, STRING, DATETIME };