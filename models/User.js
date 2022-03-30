const { ExtendedModel, STRING, INTEGER } = require('./ExtendedModel')
const { genSalt, compare, hash } = require('bcrypt')

class User extends ExtendedModel {

  static tableName = 'users'
  static modelName = 'User'
  static attributes = ['id', 'userName', 'firstName', 'lastName', 'email', 'zipCode']

  static handleErrors(err) {
    if(err.errors[0].message === 'username must be unique') {
      return Promise.reject('Username is taken.')
    }
  }

  static generateSalt() {
    return new Promise((resolve, reject) => {
      genSalt(10, (err, salt) => !err ? resolve(salt) : reject(err))
    })
  }

  static comparePass(pass, hash) {
    return new Promise((resolve, reject) => {
      compare(pass, hash, (err, results) => !err ? resolve(results) : reject(err))
    })
  }

  static hashPassword(pass) {
    return new Promise((resolve, reject) => {
      return this.generateSalt()
        .then(salt => hash(pass, salt, (err, hash) => !err ? resolve(hash) : reject(err)))
        .catch(reject)
    })
  }

  static async create(values) {
    try {
      if(!values.password) return super.create(values) // Let sequelize handle the column missing.
      values.password = await this.hashPassword(values.password)
      return await super.create(values)
    } catch(err) {
      return this.handleErrors(err)
    }
  }

  static all() {
    return this.findAll({
      attributes: this.attributes,
      include: this.includeMyPlant,
      nest: true
    })
  }

  static byId(id) {
    return this.findOne({
      where: { id },
      attributes: this.attributes,
      include: this.includeMyPlant,
      nest: true,
    })
  }

  /**
   * Defining the relationships.
   */
  static associate({ MyPlant }) {
    this.hasMany(MyPlant, { foreignKey: 'UserId' })
    this.includeMyPlant = { model: MyPlant, attributes: ['id'], include: [ MyPlant.PlantBasic ] }
    this.createMyPlant = this.hasMany(MyPlant)
    this.include = {
      model: MyPlant,
      include: MyPlant.PlantBasic
    }

    return this;
  }

  /**
   * @param { string } username
   * @param { string } password
   * @returns { Promise<boolean> }
   */
  static async authenticate(username, password) {
    try {
      const user = await this.findOne({ where: { username }, attributes: [ 'password' ] })
      if(!user) return false
      const isUser = await this.comparePass(password, user.password)
      return !isUser ? false : this.byUsername(username)
    } catch(err) {
      return Promise.reject(err)
    }
  }

  static byUsername(username) {
    return this.findOne({
      where: { username },
      attributes: this.attributes,
      include: this.includeMyPlant
    })
  }

  static searchTable(whereObject) {
    return this.findAll({ where: whereObject, include: this.includeMyPlant })
  }

  static byFirstName(firstName) {
    return this.searchTable({ firstName: `%${firstName}%` })
  }

  static byLastName(lastName) {
    return this.searchTable({ lastName: `%${lastName}%` })
  }

  static byEmail(email) {
    return this.searchTable({ email: `%${email}%` })
  }

  static byZip(zip) {
    return this.searchTable({ zip: `%${zip}%` })
  }
}

User.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: STRING(30),
      allowNull: false,
      unique: true
    },
    password: {
      type: STRING(72),
      allowNull: false,
      validate: true
    },

    firstName: {
      type: STRING(30),
      allowNull: false
    },
    lastName: {
      type: STRING(30),
      allowNull: false
    },
    email: {
      type: STRING,
      allowNull: true
    },
    zipCode: {
      type: INTEGER,
      allowNull: true
    }
  },
  User.defineTable()
);

module.exports = User;