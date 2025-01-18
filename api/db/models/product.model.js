const { Model, DataTypes, Sequelize } = require('sequelize')
const { CATEGORY_TABLE } = require('./category.model')

const PRODUCT_TABLE = 'products'

const ProductSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'created_at',
    type: DataTypes.DATE
  },
  categoryId: {
    allowNull: false,
    field: 'category_id',
    type: DataTypes.UUID,
    references: {
      key: 'id',
      model: CATEGORY_TABLE
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}


class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' })
  }

  static config(sequelize) {
    return {
      modelName: 'Product',
      sequelize,
      tableName: PRODUCT_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Product, ProductSchema, PRODUCT_TABLE }
