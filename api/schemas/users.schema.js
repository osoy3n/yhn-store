const Joi = require('joi')

const email = Joi.string().email()
const id = Joi.string().uuid()
const limit = Joi.number().integer().min(1).max(100)
const offset = Joi.number().integer().min(0)
const password = Joi.string().min(8)
const role = Joi.string().min(5)

const getUserSchema = Joi.object({
  id: id.required()
})

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required()
})

const updateUserSchema = Joi.object({
  email,
  password,
  role
})

const queryUserSchema = Joi.object({
  limit,
  offset
})

module.exports = { getUserSchema, createUserSchema, updateUserSchema, queryUserSchema }
