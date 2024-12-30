const Joi = require('joi')

const amount = Joi.number().integer().min(1)
const customerId = Joi.string().uuid()
const id = Joi.string().uuid()
const orderId = Joi.string().uuid()
const productId = Joi.string().uuid()

const getOrderSchema = Joi.object({
  id: id.required()
})

const createOrderSchema = Joi.object({
  customerId: customerId.required()
})

const addItemSchema = Joi.object({
  amount: amount.required(),
  orderId: orderId.required(),
  productId: productId.required()
})

module.exports = { getOrderSchema, createOrderSchema, addItemSchema }
