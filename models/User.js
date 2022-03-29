const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

const { STRING, INTEGER } = DataTypes

class User extends Model {
  static include = {}

  /**
   * Defining the relationships.
   */
  static associate() {
    this.include = {}
  }

  /**
   * Returns the entire collection of Users.
   * @returns {Promise<Array<User>>}
   */
  static all() {
    return this.findAll({ ...this.include })
  }

  /**
   * Returns a single User if it exists.
   * @param { number } id
   * @returns { Promise<User> }
   */
  static byId(id) {
    return this.findOne({ where: { id }, ...this.include })
  }

  /**
   * This method will check if the username and password combination exists.  If they do a user is returned,
   *    otherwise null is returned.
   * @param { string } username
   * @param { string } password In the form of Bcrypt, this method not Bcrypt the password.
   * @returns { Promise< User | null > }
   */
  static authenticate(username, password) {
    return this.findOne({ where: { username } })
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
    first_name: {
      type: STRING(30),
      allowNull: false
    },
    last_name: {
      type: STRING(30),
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    tableName: 'users',
    modelName: 'User'
  }
);

module.exports = User;