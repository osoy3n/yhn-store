'use strict';

const { CategorySchema, CATEGORY_TABLE } = require('../models/category.model')
const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customer.model')
const { ProductSchema, PRODUCT_TABLE } = require('../models/product.model')
const { UserSchema, USER_TABLE } = require('../models/user.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema)
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema)
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema)
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE)
    await queryInterface.dropTable(CUSTOMER_TABLE)
    await queryInterface.dropTable(PRODUCT_TABLE)
    await queryInterface.dropTable(CATEGORY_TABLE)
  }
}
