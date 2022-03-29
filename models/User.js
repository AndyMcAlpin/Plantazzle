const { ExtendedModel, STRING, INTEGER, DATETIME } = require('./ExtendedModel')

class User extends ExtendedModel {

  /**
   * Defining the relationships.
   */
  static associate() {
    this.include = {}
  }

  /**
   * This method will check if the username and password combination exists, and have not been deleted.
   * If they do a user is returned, otherwise null is returned.
   * @param { string } username
   * @param { string } password In the form of Bcrypt, this method not Bcrypt the password.
   * @returns { Promise< User | null > }
   */
  static authenticate(username, password) {
    return this.findOne({ where: { username, password, deletedAt: null } })
  }

  static byFirstName(firstName) {
    return this.findAll(this.whereObj({ firstName: `%${firstName}%` }))
  }

  static byLastName(lastName) {
    return this.findAll(this.whereObj({ lastName: `%${lastName}%` }))
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
    deletedAt: {
      type: DATETIME,
      allowNull: true,
      defaultValue: null
    }
  },
  User.defineTable()
);

module.exports = User;