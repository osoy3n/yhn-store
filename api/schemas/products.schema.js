const Joi = require('joi')

const id = Joi.string().uuid()
const product_name = Joi.string().min(3).max(30)
const email = Joi.string().email()
const gender = Joi.string().valid('male', 'female', 'other')
const ip_address = Joi.string().ip()

const createProductSchema = Joi.object({
  product_name: product_name.required(),
  email: email.required(),
  gender: gender.required(),
  ip_address: ip_address.required()
})

const updateProductSchema = Joi.object({
  product_name: product_name,
  email: email,
  gender: gender,
  ip_address: ip_address
})

const getProductSchema = Joi.object({
  id: id.required()
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
