const mockProducts = [
  {
    id: '1',
    usuario: '159753',
    contrasena: 'test',
    estado: '1',
    id_app_rol: 1,
    id_empleado: 3
  },
  {
    id: '2',
    usuario: '456852',
    contrasena: 'test',
    estado: '1',
    id_app_rol: 2,
    id_empleado: 2
  }
]

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
    return this.products.find(item => item.id === id)
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id)

    if (index === -1) {
      throw new Error('Product not found')
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
      throw new Error('Product not found')
    }

    this.products.splice(index, 1)
    return {
      id: id,
      message: 'Product delete'
    }
  }
}

module.exports = ProductsServices
