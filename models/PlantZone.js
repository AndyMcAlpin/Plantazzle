const { ExtendedModel, INTEGER, DATETIME, STRING } = require('./ExtendedModel')

class PlantZone extends ExtendedModel {
  static tableName = 'plant_zones'
  static modelName = 'PlantZone'

  /**
   * Defining the relationships.
   */
  static associate() {
    this.include = {}
  }

  static byPlantId(plantId) {
    return this.findAll(this.whereObj( { plantId }))
  }

  static byState(state) {
    return this.findAll(this.whereObj({ state }))
  }

  static byCity(city) {
    return this.findAll(this.whereObj({ city }))
  }

  static byZip(zip) {
    return this.findAll(this.whereObj({ zip }))
  }

  static byCounty(county) {
    return this.findAll(this.whereObj({ county }))
  }
}

PlantZone.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    plantId: {
      type: INTEGER,
      allowNull: false,
      validate: true,
      references: {
        model: 'Plant',
        key: 'id'
      }
    },
    state: {
      type: STRING,
      allowNull: false
    },
    city: {
      type: STRING,
      allowNull: false
    },
    zip: {
      type: INTEGER,
      allowNull: false
    },
    county: {
      type: STRING,
      allowNull: false
    },
    deletedAt: {
      type: DATETIME,
      allowNull: true,
      defaultValue: null
    }
  },
  PlantZone.defineTable()
);

module.exports = PlantZone;