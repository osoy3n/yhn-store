const Joi = require('joi')

const categoryId = Joi.string().uuid()
const description = Joi.string().min(10)
const id = Joi.string().uuid()
const image = Joi.string().uri()
const name = Joi.string().min(3).max(50)
const price = Joi.number().integer().min(10)

const createProductSchema = Joi.object({
  categoryId: categoryId.required(),
  description: description.required(),
  image: image.required(),
  name: name.required(),
  price: price.required()
})

const updateProductSchema = Joi.object({
  categoryId: categoryId,
  description: description,
  image: image,
  name: name,
  price: price
})

const getProductSchema = Joi.object({
  id: id.required()
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
