// Columns for the models
const { DataTypes } = require('sequelize')
const { INTEGER, STRING, TEXT, VIRTUAL, BOOLEAN } = DataTypes

// References
const PlantBasicId = {
  type: INTEGER,
  allowNull: false,
  field: 'plant_basic_id',
    references: {
      table: 'plant_basics',
      key: 'id',
      foreignKey: true
  }
}
const UserId = {
  type: INTEGER,
  field: 'user_id',
  allowNull: false,
  references: {
    table: 'users',
    key: 'id',
    foreignKey: true
  }
}
const CommentId = {
  type: INTEGER,
    field: 'comment_id',
    references: {
    table: 'comments',
      key: 'id',
      foreignKey: true
  }
}

// Common
const id = {
  type: INTEGER,
  autoIncrement: true,
  primaryKey: true,
  allowNull: false
}

module.exports = {
  User: {
    id,
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
      allowNull: false,
      validate: true
    },
    lastName: {
      type: STRING(30),
      allowNull: false,
      validate: true
    },
    email: {
      type: STRING(60)
    },
    zipCode: INTEGER,
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
  PlantBasic: {
    id,
    botanicalName: {
      field: 'botanical_name',
      type: STRING,
      allowNull: false,
      unique: true
    },
    commonName: {
      field: 'common_name',
      type: STRING,
      allowNull: true
    },
    family: {
      field: 'family',
      type: STRING,
      allowNull: true
    },
    origin: {
      field: 'origin',
      type: STRING,
      allowNull: true
    },
    plantType: {
      field: 'plant_type',
      type: STRING,
      allowNull: true
    },
    zone: {
      field: 'zone',
      type: STRING,
      allowNull: true
    },
    growthRate: {
      field: 'growth_rate',
      type: TEXT,
      allowNull: true
    },
    height: {
      field: 'height',
      type: TEXT,
      allowNull: true
    },
    flowers: {
      field: 'flowers',
      type: TEXT,
      allowNull: true
    },
    toxicity: {
      field: 'toxicity',
      type: TEXT,
      allowNull: true
    }
  },
  MyPlant: {
    id,
    UserId,
    PlantBasicId
  },
  PlantPicture: {
    id,
    filename: {
      type: STRING(),
      allowNull: false
    },
    filePath: {
      type: VIRTUAL,
      get() {
        return `${this.constructor.getPathToFolder(this.filename)}`
      },
      set(str) {
        throw new Error('The filePath property is read only.  It  cannot be changed.')
      }
    },
    PlantBasicId
  },
  Comment: {
    id,
    title: {
      field: 'title',
      type: STRING(100),
      allowNull: false
    },
    commentText: {
      field: 'comment_text',
      type: TEXT,
      allowNull: false
    },
    UserId,
    PlantBasicId
  },
  Vote: {
    id,
    UserId,
    CommentId,
    upvote: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  },
  PlantGrowing: {
    id,
    PlantBasicId,
    light: STRING,
    temperature: STRING,
    humidity: STRING,
    soil: STRING,
    watering: STRING,
    fertilizing: STRING
  },
  PlantCare: {
    id,
    PlantBasicId,
    leafCare: STRING,
    repotting: STRING,
    pruningShaping: STRING,
  }
}

