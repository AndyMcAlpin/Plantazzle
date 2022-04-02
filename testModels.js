const { User, MyPlant, PlantBasic, PlantPicture, Comment } = require('./models')
const { columns, attributes } = require('./models/props')

const logMe = results => console.log(JSON.stringify(results, null ,2))
console.log(columns.Comment)
User.findAll({
  attributes: attributes.User,
  include: {
    model: MyPlant,
    attributes: attributes.MyPlant,
    include: {
      model: PlantBasic,
      attributes: attributes.PlantBasic,
      include: [ {
        model: PlantPicture,
        attributes: attributes.PlantPicture
      }, {
        model: Comment,
        attributes: attributes.Comment
      } ]
    }
  }
})
  .then(logMe)
  .catch(console.error)
