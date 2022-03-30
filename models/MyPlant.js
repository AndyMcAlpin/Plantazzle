const { ExtendedModel, INTEGER } = require('./ExtendedModel')

class MyPlant extends ExtendedModel {
  static tableName = 'my_plants'
  static modelName = 'MyPlant'

  /**
   * Defining the relationships.
   */
  static associate({ PlantBasic }) {
    this.belongsTo(PlantBasic, { name: 'PlantBasicId' })
    this.getPlantBasic = async () => PlantBasic
    return this
  }
}

MyPlant.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    UserId: {
      type: INTEGER,
      allowNull: false,
      references: {
        modelName: 'User',
        tableName: 'users',
        foreignKey: true,
        unique: false
      }
    },
    PlantBasicId: {
      type: INTEGER,
      allowNull: false,
      validate: false,
      references: {
        modelName: 'PlantBasic',
        tableName: 'plant_basics',
        foreignKey: true,
        unique: false
      }
    }
  },
  MyPlant.defineTable()
);

module.exports = MyPlant;