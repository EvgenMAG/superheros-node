/* eslint-disable new-cap */

const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const uriDb = process.env.URI_DB



const db = new mongoose.connect(uriDb, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected')
})

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error : ${err.message}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected')
})

process.on('SIGIN', async () => {
  mongoose.connection.close(() => {
    console.log('Connection for DB terminated')
    process.exit(1)
  })
})
module.exports = db
