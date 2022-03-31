const { User, PlantBasic } = require('./models')

User.all()
// PlantBasic.byId(1)
  .then(plantBasic => console.log(JSON.stringify(plantBasic, null, 2)))
  .catch(console.error)