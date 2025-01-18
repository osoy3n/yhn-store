const { Model, DataTypes, Sequelize } = require('sequelize')
const { ORDER_TABLE } = require('./order.model')
const { PRODUCT_TABLE } = require('./product.model')

const ORDER_PRODUCT_TABLE = 'orders_products'

const OrderProductSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'created_at',
    type: DataTypes.DATE
  },
  orderId: {
    allowNull: false,
    field: 'order_id',
    type: DataTypes.UUID,
    references: {
      key: 'id',
      model: ORDER_TABLE
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  productId: {
    allowNull: false,
    field: 'product_id',
    type: DataTypes.UUID,
    references: {
      key: 'id',
      model: PRODUCT_TABLE
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}

class OrderProduct extends Model {

  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      modelName: 'OrderProduct',
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      timestamps: false
    }
  }
}

module.exports = { OrderProduct, OrderProductSchema, ORDER_PRODUCT_TABLE }
