const boom = require('@hapi/boom')

const mockProducts = require('../mocks/products')
// const getConnection = require('../libs/postgres')
// const pool = require('../libs/postgres.pool')
const sequelize = require('../libs/sequelize')

class ProductsServices {
  constructor() {
    this.products = []
    this.generate()
    // this.pool = pool
    // this.pool.on('error', (err) => console.error(err))
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

  // async find() {
  //   const client = await getConnection()
  //   const response = await client.query('SELECT * FROM tasks')
  //   return response.rows
  // }

  // async find() {
  //   const query = 'SELECT * FROM tasks'
  //   const response = await this.pool.query(query)
  //   return response.rows
  // }

  async find() {
    const query = 'SELECT * FROM tasks'
    const [data] = await sequelize.query(query)
    return data
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
