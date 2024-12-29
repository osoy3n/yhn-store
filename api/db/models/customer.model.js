const { Model, DataTypes, Sequelize } = require('sequelize')
const { USER_TABLE } = require('./user.model')

const CUSTOMER_TABLE = 'customers'

const CustomerSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    field: 'last_name',
    type: DataTypes.STRING
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'created_at',
    type: DataTypes.DATE
  },
  userId: {
    allowNull: false,
    field: 'user_id',
    type: DataTypes.UUID,
    unique: true,
    references: {
      key: 'id',
      model: USER_TABLE
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}

class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as: 'user'})
  }

  static config(sequelize) {
    return {
      modelName: 'Customer',
      sequelize,
      tableName: CUSTOMER_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE }
