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

// User.findAll({
//   attributes: attributes.User,
//   include: {
//     model: MyPlant,
//     attributes: attributes.MyPlant,
//     include: {
//       model: PlantBasic,
//       attributes: attributes.PlantBasic,
//       include: [ {
//         model: PlantPicture,
//         attributes: attributes.PlantPicture
//       }, {
//         model: Comment,
//         attributes: attributes.Comment,
//         include: {
//           model: Vote,
//           attributes: [[fn('sum', col('upvote')), 'value']],
//         }
//       } ]
//     }
//   }
// })


