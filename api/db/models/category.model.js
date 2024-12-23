const { Model, DataTypes, Sequelize } = require('sequelize')

const CATEGORY_TABLE = 'categories'

const CategorySchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'created_at',
    type: DataTypes.DATE
  },
}

class Category extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'categoryId'
    })
  }

  static config(sequelize) {
    return {
      modelName: 'Category',
      sequelize,
      tableName: CATEGORY_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Category, CategorySchema, CATEGORY_TABLE }
