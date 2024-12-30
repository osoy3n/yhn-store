const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class OrdersService {
  constructor(){}

  async create(data) {
    const order = {
      id: crypto.randomUUID(),
      ...data
    }
    const newOrder = await models.Order.create(order)
    return newOrder
  }

  async addItem(data) {
    const item = {
      id: crypto.randomUUID(),
      ...data
    }
    const newItem = await models.OrderProduct.create(item)
    return newItem
  }

  async find(limit, offset) {
    const options = {
      include: [
        {
          association: 'customer',
          include: 'user'
        },
        'items'
      ]
    }

    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const response = await models.Order.findAll(options)
    return response
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: 'user'
        },
        'items'
      ]
    })
    if (!order) {
      throw boom.notFound('Order not found')
    }
    return order
  }

  async update(id, changes) {
    const order = await this.findOne(id)
    const response = await order.update(changes)
    return response
  }

  async delete(id) {
    const order = await this.findOne(id)
    await order.destroy()
    return {
      id,
      message: 'Order deleted'
    }
  }
}

module.exports = OrdersService
