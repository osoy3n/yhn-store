const boom = require('@hapi/boom')
const { Op } = require('sequelize')
const { models } = require('../libs/sequelize')

class ProductsServices {
  constructor() {}

  async create(data) {
    const product = {
      id: crypto.randomUUID(),
      ...data
    }
    const newProduct = await models.Product.create(product)
    return newProduct
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }
    const { limit, offset, price, price_min, price_max } = query

    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    if (price) {
      options.where.price = price
    }

    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      }
    }

    const response = await models.Product.findAll(options)
    return response
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {include: ['category']})
    if (!product) {
      throw boom.notFound('Product not found')
    }
    return product
  }

  async update(id, changes) {
    const product = await this.findOne(id)
    const response = await product.update(changes)
    return response
  }

  async delete(id) {
    const product = await this.findOne(id)
    await product.destroy()
    return {
      id,
      message: 'Product deleted'
    }
  }
}

module.exports = ProductsServices
