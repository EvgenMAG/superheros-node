
const mongoose = require('mongoose')
const { Schema, SchemaTypes, model } = mongoose
const mongoosePaginate = require('mongoose-paginate-v2')

const imagesShema = new Schema(
  {
    image: {
      type: String,
      required: [true, 'Heroes name is required'],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'heroes',
    }
  })

imagesShema.plugin(mongoosePaginate)

const Images = model('images', imagesShema)

const checkIfEmpty = (array) => {
  return array.length === 0 ? false : true
}

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
    images: {
      type: [{
        image: String,
      }],
      validate: [checkIfEmpty, 'At least one image is required.'],
    },
  },
  { versionKey: false, timestamps: true }
)

heroesSchema.plugin(mongoosePaginate)
const Heroes = model('heroes', heroesSchema)

module.exports = { Heroes, Images }
