const { User } = require('./models')

// User.authenticate('shell', 'qwe')
User.create({
  username: 'shellvi',
  password: 'qwe',
  firstName: 'Jon',
  lastName: 'Taylor',
  email: 'jonnytest1101@icloud.com',
  zipCode: 78664,
  MyPlants: [
    {
      PlantBasicId: 12
    },
    {
      PlantBasicId: 18
    },
    {
      PlantBasicId: 20
    }
  ]
}, { include: User.includeMyPlant })
  .then(user => console.log(JSON.stringify(user, null, 2)))
  .catch(console.error)