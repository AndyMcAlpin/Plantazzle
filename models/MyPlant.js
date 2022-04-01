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
        name: 'user_id',
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
        name: 'plant_basic_id',
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