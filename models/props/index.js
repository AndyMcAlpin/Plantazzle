const attributes = require('./attributes');
const columns = require('./columns')
const commonOptions = {
  nest: true
}
module.exports = {
  options: {  // Query Options
     // attributes: attributes.User,
     // include: {
     //   ...MyPlant,
     //   include: {
     //     ...PlantBasic,
     //     include: [
     //       PlantPicture,
     //       Comment
     //     ]
     //   }
     // }
     //  ...commonOptions
    },
  //   PlantBasicMyPlant: {
  //     attributes: attributes.PlantBasic,
  //     include: [
  //       {
  //         ...MyPlant,
  //         include: User
  //       },
  //       PlantPicture,
  //       Comment
  //     ],
  //     ...commonOptions
  //   },
  //   MyPlant: {
  //     attributes: attributes.MyPlant,
  //     include: [
  //       User,
  //       {
  //         ...PlantBasic,
  //         include: [ PlantPicture, Comment ]
  //       }
  //     ],
  //       ...commonOptions
  //   },
  //   PlantPicture: {
  //     attributes: attributes.PlantPicture,
  //     include: PlantBasic,
  //       ...commonOptions
  //   },
  //   Comment: {
  //     attributes: attributes.Comment,
  //     include: [ User, PlantBasic ],
  //       ...commonOptions
  //   }
  // },
  attributes,
  columns
}