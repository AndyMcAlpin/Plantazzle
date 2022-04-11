// A list of attributes used by the models through extended model

module.exports = {
  User: ['id', 'userName', 'password', 'fullName', 'firstName', 'lastName', 'email', 'zipCode'],
  Comment: [ 'id', 'title', 'commentText' ],
  PlantBasic: [
    'id',
    'botanicalName',
    'commonName',
    'family',
    'origin',
    'plantType',
    'zone',
    'growthRate',
    'height',
    'flowers',
    'toxicity'
  ],
  MyPlant: [ 'id' ],
  PlantPicture: [ 'id', 'filename', 'filePath' ],
  PlantGrowing: [ 'light', 'temperature', 'humidity', 'soil', 'watering', 'fertilizing' ],
  PlantCare: [ 'leafCare', 'repotting', 'pruningShaping' ]
}