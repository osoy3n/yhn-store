const { Router } = require('express')
const UsersService = require('../services/users.service')
const validatorHandler = require('../middlewares/validator.handler')
const { updateUserSchema, createUserSchema, getUserSchema } = require('../schemas/users.schema')

const router = Router()
const service = new UsersService()

router.get('/', async (req, res, next) => {
  try {
    res.status(200).json(await service.find())
  } catch (error) {
    next(error)
  }
})

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
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
  validatorHandler(createUserSchema, 'body'),
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
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body.
      res.status(200).json(await service.update(id, body))
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
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
