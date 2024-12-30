const { Router } = require('express')
const OrderService = require('../services/order.service')
const validatorHandler = require('../middlewares/validator.handler')
const { getOrderSchema, createOrderSchema, addItemSchema, queryOrderSchema } = require('../schemas/orders.schema')

const router = Router()
const service = new OrderService()

router.get('/',
  validatorHandler(queryOrderSchema, 'query'),
  async (req, res, next) => {
  try {
    const { limit, offset } = req.query
    res.status(200).json(await service.find(limit, offset))
  } catch (error) {
    next(error)
  }
})

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      res.json(await service.findOne(id))
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      res.status(201).json(await service.create(body))
    } catch (error) {
      next(error)
    }
  }
)

router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newItem = await service.addItem(body)
      res.status(201).json(newItem)
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      res.status(200).json(await service.update(id, body))
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      res.status(200).json(await service.delete(id))
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
