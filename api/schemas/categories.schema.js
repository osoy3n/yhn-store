const Joi = require('joi')

const id = Joi.string().uuid()
const image = Joi.string().uri()
const name = Joi.string().min(3).max(15)

const createCategorySchema = Joi.object({
  image: image.required(),
  name: name.required()
})

const updateCategorySchema = Joi.object({
  image: image,
  name: name
})

const getCategorySchema = Joi.object({
  id: id.required(),
})

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }
