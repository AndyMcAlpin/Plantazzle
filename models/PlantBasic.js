const { ExtendedModel, INTEGER, STRING, TEXT } = require('./ExtendedModel')

class PlantBasic extends ExtendedModel {
  static tableName = 'plant_basics'
  static modelName = 'PlantBasic'

  /**
   * Defining the relationships.
   */
  static associate({ MyPlant }) {
    this.hasOne(MyPlant, { foreignKey: 'PlantBasicId' })

    return this
  }

  static byBotanicalName(botanicalName) {
    return this.findAll(this.whereObj({ botanicalName: `%${botanicalName}%` }))
  }

  static byCommonName(commonName) {
    return this.findAll(this.whereObj({ commonName: `%${commonName}%` }))
  }

  static byFamily(family) {
    return this.findAll(this.whereObj({ family: `%${family}%` }))
  }

  static byOrigin(origin) {
    return this.findAll(this.whereObj({ origin: `%${origin}%` }))
  }

  static byPlantType(plantType) {
    return this.findAll(this.whereObj({ plantType: `%${plantType}%` }))
  }

  static byZone(zone) {
    return this.findAll(this.whereObj({ zone: `%${zone}%` }))
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
    commonName: {
      type: STRING,
      allowNull: true
    },
    family: {
      type: STRING,
      allowNull: true
    },
    origin: {
      type: STRING,
      allowNull: true
    },
    plantType: {
      type: STRING,
      allowNull: true
    },
    zone: {
      type: STRING,
      allowNull: true
    },
    growthRate: {
      type: TEXT,
      allowNull: true
    },
    height: {
      type: TEXT,
      allowNull: true
    },
    flowers: {
      type: TEXT,
      allowNull: true
    },
    toxicity: {
      type: TEXT,
      allowNull: true
    }
  },
  PlantBasic.defineTable()
);

module.exports = PlantBasic;