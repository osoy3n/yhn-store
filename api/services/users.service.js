const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class UsersService {
  constructor() {}

  async create(data) {
    const user = {
      id: crypto.randomUUID(),
      ...data
    }
    const newUser = await models.User.create(user)
    return newUser
  }

  async find() {
    const response = await models.User.findAll({include: ['customer']})
    return response
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {include: ['customer']})
    if (!user) {
      throw boom.notFound('User not found')
    }
    return user
  }

  async update(id, changes) {
    const user = await this.findOne(id)
    const response = await user.update(changes)
    return response
  }

  async delete(id) {
    const user = await this.findOne(id)
    await user.destroy()
    return {
      id,
      message: 'User deleted'
    }
  }
}

module.exports = UsersService
