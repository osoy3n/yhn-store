const Joi = require('joi')

const email = Joi.string().email()
const id = Joi.string().uuid()
const lastName = Joi.string()
const name = Joi.string().min(3).max(30)
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

module.exports = { getCustomerSchema, createCustomerSchema, updateCustomerSchema }
