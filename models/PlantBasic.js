const { ExtendedModel, INTEGER, STRING, TEXT } = require('./ExtendedModel')

class PlantBasic extends ExtendedModel {
  static tableName = 'plant_basics'
  static modelName = 'PlantBasic'
  static attributes = [
    'id',
    'botanical_name',
    'common_name',
    'family',
    'origin',
    'plant_type',
    'zone',
    'growth_rate',
    'height',
    'flowers',
    'toxicity'
  ]

  /**
   * Defining the relationships.
   */
  static associate({ MyPlant }) {
    this.hasOne(MyPlant, { foreignKey: 'PlantBasicId' })
    this.getInclude = async () => {
      return { model: MyPlant, attributes: ['id'] }
    }
    return this
  }

  static async all() {
    const include = await this.getInclude()
    return this.findAll({ include, attributes: this.attributes })
  }

  static async byId(id) {
    const include = await this.getInclude()
    return this.findOne({ where: { id }, include, attributes: this.attributes })
  }

  static search(whereObject) {
    return this.getInclude()
      .then(include => this.findAll({ where: whereObject, include }))
  }

  static byBotanicalName(botanicalName) {
    return this.search({ botanicalName: `%${botanicalName}%` })
  }

  static byCommonName(commonName) {
    return this.search({ commonName: `%${commonName}%` })
  }

  static byFamily(family) {
    return this.search({ family: `%${family}%` })
  }

  static byOrigin(origin) {
    return this.search({ origin: `%${origin}%` })
  }

  static byPlantType(plantType) {
    return this.search({ plantType: `%${plantType}%` })
  }

  static byZone(zone) {
    return this.search({ zone: `%${zone}%` })
  }

  static byGrowthRate(growthRate) {
    return this.search({ growthRate: `%${growthRate}%` })
  }

  static byHeight(height) {
    return this.search({ height: `%${height}%` })
  }

  static byFlowers(flowers) {
    return this.search({ flowers: `%${flowers}%` })
  }

  static byToxicity(toxicity) {
    return this.search({ toxicity: `%${toxicity}%` })
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