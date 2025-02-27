'use strict';

const { OrderProductSchema, ORDER_PRODUCT_TABLE } = require('../models/order-product.model')
const { OrderSchema, ORDER_TABLE } = require('../models/order.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, OrderSchema)
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE)
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE)
  }
}
