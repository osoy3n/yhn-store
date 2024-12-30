const boom = require('@hapi/boom')
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

  async find(limit, offset) {
    const options = {
      include: ['category']
    }

    if (limit && offset) {
      options.limit = limit
      options.offset = offset
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
