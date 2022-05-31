
const mongoose = require('mongoose')
const { Schema, model } = mongoose

const imagesShema = new Schema(
  {
    image: {
      type: String,
      required: [true, 'Heroes name is required'],
    }
  })

// const Images = model('images', imagesShema)

const heroesSchema = new Schema(
  {
    nickname: {
      type: String,
      required: [true, 'Heroes name is required'],
      min: 1,
      max: 24,
    },
    real_name: {
      type: String,
      required: [true, 'Real name is required'],
    },
    origin_description: {
      type: String,
      required: [true, 'Description Loan is required'],

    },
    superpowers: {
      type: String,
      required: [true, 'Description Loan is required'],
    },
    catch_phrase: {
      type: String,
      required: [true, 'Phrase Loan is required'],
    },
    images: [{ image: String }]
  },
  { versionKey: false, timestamps: true }
)

const Heroes = model('heroes', heroesSchema)

module.exports = { Heroes }
