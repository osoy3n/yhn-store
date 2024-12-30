const { Model, DataTypes, Sequelize } = require('sequelize')
const { CUSTOMER_TABLE } = require('./customer.model')

const ORDER_TABLE = 'orders'

const OrderSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID
  },
  createdAt: {
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'created_at',
    type: DataTypes.DATE
  },
  customerId: {
    allowNull: false,
    field: 'customer_id',
    type: DataTypes.UUID,
    references: {
      key: 'id',
      model: CUSTOMER_TABLE
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.items.length > 0) {
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.amount)
        }, 0)
      }
      return 0
    }
  }
}

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer'
    })
    this.belongsToMany(models.Product, {
      as: 'items',
      foreignKey: 'orderId',
      otherKey: 'productId',
      through: models.OrderProduct
    })
  }

  static config(sequelize) {
    return {
      modelName: 'Order',
      sequelize,
      tableName: ORDER_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Order, OrderSchema, ORDER_TABLE }
