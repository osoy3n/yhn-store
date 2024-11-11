const mockProducts = require('../mocks/products')

const boom = require('@hapi/boom')

class ProductsServices {
  constructor() {
    this.products = []
    this.generate()
  }

  generate() {
    this.products = mockProducts
  }

  async create(data) {
    const newProduct = {
      id: crypto.randomUUID(),
      ...data
    }

    this.products.push(newProduct)
    return newProduct
  }

  async find() {
    return this.products
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id)
    if (!product) {
      throw boom.notFound('Product not found')
    } else {
      return product
    }
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id)

    if (index === -1) {
      throw boom.notFound('Product not found')
    }

    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index]
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id)

    if (index === -1) {
      throw boom.notFound('Product not found')
    }

    this.products.splice(index, 1)
    return {
      id: id,
      message: 'Product delete'
    }
  }
}

module.exports = ProductsServices
