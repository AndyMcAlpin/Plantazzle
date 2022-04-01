const { ExtendedModel, INTEGER, STRING, VIRTUAL } = require('./ExtendedModel')
const { writeFile, readFile } = require('fs/promises')
const { resolve, join, extname } = require('path')
const { nanoid } = require('nanoid')

class PlantPicture extends ExtendedModel {
  static tableName = 'plant_pics'
  static modelName = 'PlantPicture'
  static attributes = [ 'id', 'PlasticBasicId', 'filePath', 'filename' ]
  static pathToImageFolder = [ __dirname, '../', 'public/', 'assets/', 'images/', 'plants/' ]

  static handleError(err) {

  }

  static getPathToFolder(filename) {
    return resolve(join(...this.pathToImageFolder, filename))
  }

  static associate({ PlantBasic }) {
    this.hasOne(PlantBasic, { as: 'plantId', model:PlantBasic, foreignKey: 'PlantBasicId', key: 'id',  })

    this.getPlantBasic = () => PlantBasic

    this.getIncludeWithPlant = async () => {
      return { include: { model: await this.getPlantBasic() } }
    }

    return this
  }

  /**
   * Creates an absolute path for the image and then inserts a new row to the database table.
   * The file will originally be located inside a tmp folder.
   * These folders are emptied at the end of the client connection.  So we are moving it.
   * @param { number } PlantBasicId
   * @param { string } filePath
   * @returns { Promise<PlantPicture> }
   */
  static async create({ PlantBasicId, filePath }) {
    try {
      const filename = `${nanoid(12)}${extname(filePath)}`
      const image = await readFile(filePath)
      await writeFile(this.getPathToFolder(filename), image)
      return super.create({ PlantBasicId, filename })
    } catch(err) {
      return this.handleError(err)
    }
  }
}

PlantPicture.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  filename: {
    type: STRING(),
    allowNull: false
  },
  filePath: {
    type: VIRTUAL,
    get() {
      return `${this.getPathToFolder(this.filename)}`
    },
    set(str) {
      throw new Error('The filePath property is read only.  It  cannot be changed.')
    }
  },
  PlantBasicId: {
    type: INTEGER,
    allowNull: false,
    references: {
      modelName: 'PlantBasic',
      tableName: 'plant_basics',
      foreignKey: true,
      unique: false
    }
  }
}, PlantPicture.defineTable())

module.exports = PlantPicture