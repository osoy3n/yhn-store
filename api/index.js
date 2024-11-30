const express = require('express')
const cors = require('cors')
const routerApi = require('./router')
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler
} = require('./middlewares/error.handler')

const app = express()
const port = process.env.PORT || 3000

const whitelist = ['http://localhost:8080', 'http://localhost:5006']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Request denied'))
    }
  }
}

app.use(express.json())
app.use(cors(options))

app.get('/api', (req, res) => {
  res.send('Server up')
})

routerApi(app)

app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running in port: ${port}`)
})

module.exports = app
