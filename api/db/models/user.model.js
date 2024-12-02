const { Model, DataTypes, Sequelize } = require('sequelize')

const USER_TABLE = 'users'

const UserSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    defaultValue: 'customer',
    type: DataTypes.STRING
  },
  createAt: {
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'create_at',
    type: DataTypes.DATE
  }
}

class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId'
    })
  }

  static config(sequelize) {
    return {
      modelName: 'User',
      sequelize,
      tableName: USER_TABLE,
      timestamps: false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }
