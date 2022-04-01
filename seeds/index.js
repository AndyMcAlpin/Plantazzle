const dropSchema = require('./dropSchema')
const { User, MyPlant, PlantBasic, PlantPicture} = require('../models')
const { userData, myPlantData, plantBasicData } = require('./data')


const sync = async () => {
  await dropSchema()
  await User.sync({ logging: false })
  await PlantBasic.sync({ logging: false })
  await MyPlant.sync({ logging: false })
  await PlantPicture.sync({ logging: false })
}

const seed = async () => {
  await User.bulkCreate(userData, { logging: false });
  await PlantBasic.bulkCreate(plantBasicData, { logging: false });
  await MyPlant.bulkCreate(myPlantData, { logging: false });
};

sync()
  .then(() => seed())
  .then(() => User.byId(6))
  .then((user) => console.log(JSON.stringify(user, null, 2)))
  .catch(console.error);
