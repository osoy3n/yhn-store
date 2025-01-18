const express = require('express')
const CategoriesService = require('../services/categories.service')
const validatorHandler = require('../middlewares/validator.handler')
const { createCategorySchema, updateCategorySchema, getCategorySchema, queryCategorySchema } = require('../schemas/categories.schema')

const router = express.Router()
const service = new CategoriesService()

router.get('/',
  validatorHandler(queryCategorySchema, 'query'),
  async (req, res, next) => {
  try {
    const query = req.query
    res.status(200).json(await service.find(query))
  } catch (error) {
    next(error)
  }
})

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
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
  validatorHandler(createCategorySchema, 'body'),
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
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
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
  validatorHandler(getCategorySchema, 'params'),
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
