const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json([
    {
      name: 'Laptop',
      price: 2500
    },
    {
      name: 'Smartphone',
      price: 1200
    }
  ])
})

router.get('/filter', (req, res) => {
  res.send('Filter products')
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  res.json({
    id,
    name: 'Laptop',
    price: 2500
  })
})

router.post('/', (req, res) => {
  const body = req.body

  res.status(201).json({
    message: 'Created',
    data: body
  })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body

  res.json({
    message: 'Update partial',
    data: body,
    id
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  res.json({
    message: 'Delete',
    id
  })
})

module.exports = router
