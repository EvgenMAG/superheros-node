
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
// const boolParser = require('express-query-boolean')
const { HttpCode } = require('./helpers/constants')
// const ErrorHandler = require('./helpers/errorHandlers')
// const { apiLimit, jsonLimit } = require('./config/rateLimit.json')
// const helmet = require('helmet')
// const rateLimit = require('express-rate-limit')
// const path = require('path')

require('dotenv').config()

const app = express()

// const apiLimiter = rateLimit({
//   windowMs: apiLimit.windowMs, // 15 minutes
//   max: apiLimit.max,
//   handler: (req, res, next) => {
//     next(new ErrorHandler(HttpCode.BAD_REQUEST, 'You used amount of searches for 15 minutes'))
//   }
// })

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.use(boolParser())
// app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
// app.use(express.json({ limit: jsonLimit }))

// app.use('/api/', apiLimiter, require('./api_contacts/contacts'))
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
