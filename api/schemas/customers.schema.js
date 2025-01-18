const Joi = require('joi')

const email = Joi.string().email()
const id = Joi.string().uuid()
const lastName = Joi.string()
const limit = Joi.number().integer().min(1).max(100)
const name = Joi.string().min(3).max(30)
const offset = Joi.number().integer().min(0)
const password =  Joi.string()
const phone =  Joi.string()
const userId = Joi.string().uuid()

const getCustomerSchema = Joi.object({
  id: id.required(),
})

const createCustomerSchema = Joi.object({
  lastName: lastName.required(),
  name: name.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required()
  })
})

const updateCustomerSchema = Joi.object({
  lastName,
  name,
  phone,
  userId
})

const queryCustomerSchema = Joi.object({
  limit,
  offset
})

module.exports = { getCustomerSchema, createCustomerSchema, updateCustomerSchema, queryCustomerSchema }
