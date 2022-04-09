const { ExtendedModel, INTEGER, STRING, VIRTUAL } = require('./ExtendedModel')
const { writeFile, readFile, rm } = require('fs/promises')
const { resolve, join, extname } = require('path')
const { nanoid } = require('nanoid')

class PlantPicture extends ExtendedModel {
  static tableName = 'plant_pics'
  static modelName = 'PlantPicture'
  static pathToImageFolder = [ __rootdir, 'public', 'assets', 'images', 'plants' ]

  static handleError(err) {
    return Promise.reject(err)
  }

  static getPathToFolder(filename) {
    return resolve(join(...this.pathToImageFolder, filename))
  }

  /**
   * Creates an absolute path for the image and then inserts a new row to the database table.
   * The file will originally be located inside a tmp folder.
   * These folders are emptied at the end of the client connection.  So we are moving it.
   * @param { number } PlantBasicId
   * @param { string } filePath
   * @returns { Promise<PlantPicture> }
   */
  static async create({ PlantBasicId, file }, options) {
    try {
      const filename = `${nanoid(12)}${extname(file.originalname)}`
      const filePath = join(__rootdir, file.path)
      const image = await readFile(filePath)
      await writeFile(this.getPathToFolder(filename), image)
      await rm(filePath)
      return super.create({ PlantBasicId, filename }, options)
    } catch(err) {
      return this.handleError(err)
    }
  }
}

PlantPicture.init(PlantPicture.defineColumns(), PlantPicture.defineTable())

module.exports = PlantPicture