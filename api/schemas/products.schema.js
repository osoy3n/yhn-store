const Joi = require('joi')

const categoryId = Joi.string().uuid()
const description = Joi.string().min(10)
const id = Joi.string().uuid()
const image = Joi.string().uri()
const limit = Joi.number().integer().min(1).max(100)
const name = Joi.string().min(3).max(50)
const offset = Joi.number().integer().min(0)
const price = Joi.number().integer().min(10)

const getProductSchema = Joi.object({
  id: id.required()
})

const createProductSchema = Joi.object({
  categoryId: categoryId.required(),
  description: description.required(),
  image: image.required(),
  name: name.required(),
  price: price.required()
})

const updateProductSchema = Joi.object({
  categoryId,
  description,
  image,
  name,
  price
})

const queryProductSchema = Joi.object({
  limit,
  offset
})

module.exports = { getProductSchema, createProductSchema, updateProductSchema, queryProductSchema }
