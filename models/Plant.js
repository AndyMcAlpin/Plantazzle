const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

const { STRING, INTEGER, DATETIME } = DataTypes

class Plant extends Model {
  static include = {}

  /**
   * Defining the relationships.
   */
  static associate() {
    this.include = {}
  }

  /**
   * Returns the entire collection of Plants.
   * @returns {Promise<Array<Plant>>}
   */
  static all() {
    return this.findAll({ where: { deleted_at: null }, ...this.include })
  }

  /**
   * Returns a single Plant if it exists.
   * @param { number } id
   * @returns { Promise<Plant> }
   */
  static byId(id) {
    return this.findOne({ where: { id }, ...this.include })
  }
}

Plant.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
      validate: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    family: {
      type: STRING,
      allowNull: false
    },
    deleted_at: {
      type: DATETIME,
      allowNull: true,
      defaultValue: null
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    tableName: 'Plants',
    modelName: 'Plant'
  }
);

module.exports = Plant;