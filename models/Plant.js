const { ExtendedModel, STRING, INTEGER, DATETIME } = require('./ExtendedModel')

class Plant extends ExtendedModel {
  static tableName = 'plants'
  static modelName = 'Plant'
  /**
   * Defining the relationships.
   */
  static associate() {
    this.include = {}
  }

  /**
   * This method will search for plants that are owned by a specific user and not deleted.
   * @param { number } userId
   * @returns { Promise<Plant> }
   */
  static byUserId(userId) {
    return this.find({ where: { userId, deletedAt: null }, ...this.include })
  }

  static byName(name) {
    return this.findAll(this.whereObj({ name: `%${name}%` }))
  }

  static byFamily(family) {
    return this.findAll(this.whereObj({ family: `%${family}%` }))
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
    userId: {
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
    deletedAt: {
      type: DATETIME,
      allowNull: true,
      defaultValue: null
    }
  },
  Plant.defineTable()
);

module.exports = Plant;