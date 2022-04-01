const { ExtendedModel, STRING, INTEGER, VIRTUAL} = require('./ExtendedModel')
const { DataTypes } = require('sequelize')
const { genSalt, compare, hash } = require('bcrypt')

/**
 * @typedef {{
 *  id?: number,
 *  userName: string,
 *  lastName: string,
 *  email: string,
 *  zipCode: number
 * }} UserObject
 */
class User extends ExtendedModel {

  static tableName = 'users'
  static modelName = 'User'
  static attributes = ['id', 'userName', 'fullName', 'firstName', 'lastName', 'email', 'zipCode']

  /**
   * An easy way to capture error that either are by design or unexpected.
   * @param { Error | string } err
   * @returns { Promise<never> }
   * @author Jon Taylor
   */
  static handleErrors(err) {
    if(err.errors[0].message === 'username must be unique') {
      return Promise.reject('Username is taken.')
    }
  }

  /**
   * Generates salt needed to hash the password.
   * @param { number } rounds
   * @returns {Promise<salt>}
   */
  static generateSalt(rounds) {
    return new Promise((resolve, reject) => {
      genSalt(rounds, (err, salt) => !err ? resolve(salt) : reject(err))
    })
  }

  /**
   * This takes a string that has not been hashed and a one that has been hashed.
   * They are compared for authentication.
   * @param { string } password
   * @param { string } hash
   * @returns { Promise<boolean> }
   * @author Jon Taylor
   */
  static comparePass(password, hash) {
    return new Promise((resolve, reject) => {
      compare(password, hash, (err, results) => !err ? resolve(results) : reject(err))
    })
  }

  /**
   * Takes a string and hashes it so that the string can utilize to validate authentication later.
   * @param { string } password
   * @returns { Promise<string> }  The Bcrypt hash is 72 characters in the length.
   * @author Jon Taylor
   */
  static hashPassword(password) {
    return new Promise((resolve, reject) => {
      return this.generateSalt()
        .then(salt => hash(password, salt, (err, hash) => !err ? resolve(hash) : reject(err)))
        .catch(reject)
    })
  }

  /**
   * This method is overwritten so that we can replace the password as hashed instead/
   * @param { UserObject } values
   * @returns { Promise<any|values> }
   */
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
    return this.getIncludeMyPlant()
      .then(include => this.findAll({
      attributes: this.attributes,
      include,
      nest: true
    }))
  }

  static async byId(id) {
    return this.findOne({
      where: { id },
      attributes: this.attributes,
      include: await this.getIncludeMyPlant(),
      nest: true,
    })
  }

  /**
   * Defining the relationships.
   */
  static associate({ MyPlant }) {
    this.hasMany(MyPlant, { foreignKey: 'UserId' })
    this.getIncludeMyPlant = async () => {
      const includePlantBasic = await MyPlant.getPlantBasic()
      return {
        model: MyPlant,
        attributes: ['id'],
        include: {
          model: includePlantBasic,
          attributes: includePlantBasic.attributes,
          include: await includePlantBasic.getInclude()
        }
      }
    }

    return this;
  }

  /**
   * This method gets the password that is being stored so that a user can be authenticated.
   * @param { string } username
   * @returns { Promise<User> }
   * @author Jon Taylor
   */
  static getPasswordByUsername(username) {
    return this.findOne({ where: { username }, attributes: [ 'password' ] })
  }

  /**
   * Gathers the password and utilizes compare to ensure proper authentication
   * @param { string } username
   * @param { string } password
   * @returns { Promise<boolean> }
   * @author Jon Taylor
   */
  static async authenticate(username, password) {
    try {
      const user = await this.getPasswordByUsername(username)
      if(!user) return false
      const isUser = await this.comparePass(password, user.password)
      return !isUser ? false : this.byUsername(username)
    } catch(err) {
      return Promise.reject(err)
    }
  }

  static byUsername(username) {
    return this.getIncludeMyPlant()
      .then(include => this.findOne({
      where: { username },
      attributes: this.attributes,
      include: include
    }))
  }

  static searchTable(whereObject) {
    return this.getIncludeMyPlant()
      .then(include => this.findAll({ where: whereObject, include }))
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

User.init({
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: false,
      validate: false,
      defaultValue: undefined,
    },
    password: {
      field: 'password',
      type: DataTypes.STRING(72),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      unique: false,
      validate: true,
      defaultValue: undefined,
    },
    username: {
      field: 'username',
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      unique: true,
      validate: false,
      defaultValue: undefined,
    },
    firstName: {
      field: 'first_name',
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      unique: false,
      validate: false,
      defaultValue: undefined,
    },
    lastName: {
      field: 'last_name',
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      unique: false,
      validate: false,
      defaultValue: undefined,
    },
    email: {
      field: 'email',
      type: DataTypes.STRING(60),
      allowNull: true,
      primaryKey: false,
      autoIncrement: false,
      unique: false,
      validate: false,
      defaultValue: undefined,
    },
    zipCode: {
      field: 'zip_code',
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: false,
      autoIncrement: false,
      unique: false,
      validate: false,
      defaultValue: undefined,
    },
    fullName: {
      type: VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`
      },
      set(str) {
        throw new Error('The User.fullName property cannot be set.  It is read only.')
      }
    }
  },
  User.defineTable()
);

module.exports = User;

