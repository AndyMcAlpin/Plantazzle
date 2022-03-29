const { ExtendedModel, INTEGER, DATETIME, STRING } = require('./ExtendedModel')

class PlantCare extends ExtendedModel {
  static tableName = 'plant_care'
  static modelName = 'PlantCare'

  /**
   * Defining the relationships.
   */
  static associate() {
    this.include = {}
  }

  static byLeafCare(leafCare) {
    return this.findAll(this.whereObj({ leafCare: `%${leafCare}%` }))
  }

  static byRepotting(repotting) {
    return this.findAll(this.whereObj({ repotting: `%${repotting}%` }))
  }

  static byPruningShaping(pruningShaping) {
    return this.findAll(this.whereObj({ pruningShaping: `%${pruningShaping}%` }))
  }
}

PlantCare.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    leafCare: {
      type: STRING,
      allowNull: true
    },
    repotting: {
      type: STRING,
      allowNull: true
    },
    pruningShaping: {
      type: STRING,
      allowNull: true
    },
    deletedAt: {
      type: DATETIME,
      allowNull: true,
      defaultValue: null
    }
  },
  PlantCare.defineTable()
);

module.exports = PlantCare;