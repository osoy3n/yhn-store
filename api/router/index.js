const { Router } = require('express')
const categoriesRouter = require('./categories.router')
const customersRouter = require('./customers.router')
const ordersRouter = require('./orders.router')
const productsRouter = require('./products.router')
const usersRouter = require('./users.router')

function routerApi(app) {
  const router = Router()
  app.use('/api/v1', router)

  router.use('/categories', categoriesRouter)
  router.use('/customers', customersRouter)
  router.use('/orders', ordersRouter)
  router.use('/products', productsRouter)
  router.use('/users', usersRouter)
}

module.exports = routerApi
