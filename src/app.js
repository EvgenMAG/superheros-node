
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { HttpCode } = require('./helpers/constants')

require('dotenv').config()

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())

app.use('/api/', require('./api_heroes'))

app.use((req, res, next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: `Use api on routers ${req.baseUrl}/api/heroes`,
    data: 'Not Found',
  })
})

app.use((err, req, res, next) => {
  const status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR
  res.status(status).json({
    status: status === 500 ? 'fail' : 'error',
    code: status,
    message: err.message,
    data: status === 500 ? 'Internal Server Error' : 'err.data',
  })
})

module.exports = app
