const mockProducts = [
  {
    id: 'cbce4bbf-edb9-4c91-96f3-5767a4b1e1d0',
    product_name: 'BenQ-Siemens',
    email: 'mtomkys0@bing.com',
    gender: 'Male',
    ip_address: '149.140.141.215'
  },
  {
    id: '8d4d0629-9b52-4b46-aa62-4a51b76dcdcf',
    product_name: 'alcatel',
    email: 'kberick1@reverbnation.com',
    gender: 'Female',
    ip_address: '122.229.13.6'
  }
]

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
