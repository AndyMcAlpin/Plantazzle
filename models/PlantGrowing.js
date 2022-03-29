const { ExtendedModel, INTEGER, DATETIME, STRING } = require('./ExtendedModel')

class PlantGrowing extends ExtendedModel {
  static tableName = 'plant_growing'
  static modelName = 'PlantGrowing'

  /**
   * Defining the relationships.
   */
  static associate() {
    this.include = {}
  }

  static byLight(light) {
    return this.findAll(this.whereObj({ light: `%${light}%` }))
  }

  static byTemperature(temperature) {
    return this.findAll(this.whereObj({ temperature: `%${temperature}%` }))
  }

  static byHumidity(humidity) {
    return this.findAll(this.whereObj({ humidity: `%${humidity}%` }))
  }

  static bySoil(soil) {
    return this.findAll(this.whereObj({ soil: `%${soil}%` }))
  }

  static byWatering(watering) {
    return this.findAll(this.whereObj({ watering: `%${watering}%` }))
  }

  static byFertilizing(fertilizing) {
    return this.findAll(this.whereObj({ fertilizing: `%${fertilizing}%` }))
  }
}

PlantGrowing.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    light: {
      type: STRING,
      allowNull: true
    },
    temperature: {
      type: STRING,
      allowNull: true
    },
    humidity: {
      type: STRING,
      allowNull: true
    },
    soil: {
      type: STRING,
      allowNull: true
    },
    watering: {
      type: STRING,
      allowNull: true
    },
    fertilizing: {
      type: STRING,
      allowNull: true
    },
    deletedAt: {
      type: DATETIME,
      allowNull: true,
      defaultValue: null
    }
  },
  PlantGrowing.defineTable()
);

module.exports = PlantGrowing;