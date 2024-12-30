const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class CategoriesService {
  constructor(){}

  async create(data) {
    const category = {
      id: crypto.randomUUID(),
      ...data
    }
    const newCategory = await models.Category.create(category)
    return newCategory
  }

  async find(limit, offset) {
    const options = {}

    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const response = await models.Category.findAll(options)
    return response
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id)
    if (!category) {
      throw boom.notFound('Category not found')
    }
    return category
  }

  async update(id, changes) {
    const category = await this.findOne(id)
    const response = await category.update(changes)
    return response
  }

  async delete(id) {
    const category = await this.findOne(id)
    await category.destroy()
    return {
      id,
      message: 'Category deleted'
    }
  }
}

module.exports = CategoriesService
