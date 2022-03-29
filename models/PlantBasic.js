const { ExtendedModel, INTEGER, DATETIME, STRING } = require('./ExtendedModel')

class PlantBasic extends ExtendedModel {
  static tableName = 'plant_basics'
  static modelName = 'PlantBasic'

  /**
   * Defining the relationships.
   */
  static associate() {
    this.include = {}
  }

  static byBotanicalName(botanicalName) {
    return this.findAll(this.whereObj({ botanicalName: `%${botanicalName}%` }))
  }

  static byOrigin(origin) {
    return this.findAll(this.whereObj({ origin: `%${origin}%` }))
  }

  static byPlantType(plantType) {
    return this.findAll(this.whereObj({ plantType: `%${plantType}%` }))
  }

  static byGrowthRate(growthRate) {
    return this.findAll(this.whereObj({ growthRate: `%${growthRate}%` }))
  }

  static byHeight(height) {
    return this.findAll(this.whereObj({ height: `%${height}%` }))
  }

  static byFlowers(flowers) {
    return this.findAll(this.whereObj({ flowers: `%${flowers}%` }))
  }

  static byToxicity(toxicity) {
    return this.findAll(this.whereObj({ toxicity: `%${toxicity}%` }))
  }
}

PlantBasic.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    botanicalName: {
      type: STRING,
      allowNull: false,
      unique: true
    },
    origin: {
      type: STRING,
      allowNull: true
    },
    plantType: {
      type: STRING,
      allowNull: true
    },
    growthRate: {
      type: STRING,
      allowNull: true
    },
    height: {
      type: STRING,
      allowNull: true
    },
    flowers: {
      type: STRING,
      allowNull: true
    },
    toxicity: {
      type: STRING,
      allowNull: true
    },
    deletedAt: {
      type: DATETIME,
      allowNull: true,
      defaultValue: null
    }
  },
  PlantBasic.defineTable()
);

module.exports = PlantBasic;