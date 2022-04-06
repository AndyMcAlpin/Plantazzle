const dropSchema = require('./dropSchema')
const { rm, mkdir } = require('fs/promises')
const { User, MyPlant, PlantBasic, PlantPicture, Comment, Vote, PlantGrowing, PlantCare } = require('../models')
const { userData, myPlantData, plantBasicData, plantPictureData, commentData, voteData} = require('./data')


const seedPlantPicture = async () => {
  const dirPath = PlantPicture.getPathToFolder('')

  // Cleaning the folder
  await rm(dirPath, { force: true, recursive: true })

  // Creating the directory
  await mkdir(dirPath)
}

const sync = async () => {
  await dropSchema()
  await User.sync({ logging: false })
  await PlantBasic.sync({ logging: false })
  await MyPlant.sync({ logging: false })
  await PlantPicture.sync({ logging: false })
  await PlantGrowing.sync({ logging: false })
  await PlantCare.sync({ logging: false })
  await Comment.sync({ logging: false })
  await Vote.sync({ logging: false })
}

const seed = async () => {
  await User.bulkCreate(userData, { logging: false })
  await PlantBasic.bulkCreate(plantBasicData, { logging: false })
  await MyPlant.bulkCreate(myPlantData, { logging: false })
  await seedPlantPicture()
  for(let image of plantPictureData) await PlantPicture.create(image, { logging: false })
  await Comment.bulkCreate(commentData, { logging: false })
  await Vote.bulkCreate(voteData, { logging: false })
}

sync()
  .then(() => seed())
  .then(() => console.log('All Done!'))
  .catch(console.error)

