const Joi = require('joi')

const id = Joi.string().uuid()
const image = Joi.string().uri()
const limit = Joi.number().integer().min(1).max(100)
const name = Joi.string().min(3).max(15)
const offset = Joi.number().integer().min(0)

const getCategorySchema = Joi.object({
  id: id.required(),
})

const createCategorySchema = Joi.object({
  image: image.required(),
  name: name.required()
})

const updateCategorySchema = Joi.object({
  image,
  name
})

const queryCategorySchema = Joi.object({
  limit,
  offset
})

module.exports = { getCategorySchema, createCategorySchema, updateCategorySchema, queryCategorySchema }
