const  { readFile } = require('fs/promises')
const { User, PlantPicture, PlantBasic} = require('./models')

async function seedImages() {
  const filePaths = [
    './seeds/images/image1.jpg',
    './seeds/images/image2.jpg',
    './seeds/images/image3.jpg',
    './seeds/images/image4.jpg',
    './seeds/images/image5.jpg'
  ]
  const log = []
  let PlantBasicId = 1
  for(const filePath of filePaths) {
    log.push(await PlantPicture.create({ PlantBasicId, filePath }))
    PlantBasicId++
  }

  return log
}

PlantBasic.byId(1)
  .then(user => console.log(JSON.stringify(user, null, 2)))
  .catch(console.error)