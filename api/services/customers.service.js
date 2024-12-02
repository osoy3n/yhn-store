const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class CustomersService {
  constructor() {}

  async create(data) {
    const user = {
      id: crypto.randomUUID(),
      ...data.user
    }
    const newUser = await models.User.create(user)

    const customer = {
      id: crypto.randomUUID(),
      ...data,
      userId: newUser.id
    }
    const newCustomer = await models.Customer.create(customer)
    return newCustomer
  }

  async find() {
    const response = await models.Customer.findAll({
      include: ['user']
    })
    return response
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id)
    if (!user) {
      throw boom.notFound('Customer not found')
    }
    return user
  }

  async update(id, changes) {
    const model = await this.findOne(id)
    const response = await model.update(changes)
    return response
  }

  async delete(id) {
    const customer = await this.findOne(id)
    await customer.destroy()
    return {
      id,
      message: 'Customer deleted'
    }
  }

}

module.exports = CustomersService