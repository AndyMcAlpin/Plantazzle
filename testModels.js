const { fn, col } = require('sequelize')
const { User, MyPlant, PlantBasic, PlantPicture, Comment, Vote } = require('./models')
const { columns, attributes } = require('./models/props')

const logMe = results => console.log(JSON.stringify(results, null ,2))



// Comment.findOne({
//   where: { id: 67 },
//   attributes: [...attributes.Comment],
//   include: {
//     model: Vote,
//     attributes: [[fn('sum', col('upvote')), 'value']],
//     group: ['value']
//   }
// })
//   .then(logMe)
//   .catch(console.error)

