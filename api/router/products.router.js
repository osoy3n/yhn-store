const { Router } = require('express')
const ProductsServices = require('../services/products.service')
const validatorHandler = require('../middlewares/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/products.schema')

const router = Router()
const service = new ProductsServices()

router.get('/', async (req, res, next) => {
  try {
    res.status(200).json(await service.find())
  } catch (error) {
    next(error)
  }
})

// router.get('/filter', (req, res) => {
//   res.status(200).send('Filter products')
// })

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      res.status(200).json(await service.findOne(id))
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      res.status(201).json(await service.create(body))
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
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
  validatorHandler(getProductSchema, 'params'),
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
