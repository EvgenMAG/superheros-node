const express = require('express')
const HeroesControllers = require('../controllers/heroes')
const router = express.Router()
// const multer = require('multer')
// const upload = multer()

const upload = require('../helpers/formDataUpload')
// const bodyParser = require('body-parser')
// const jsonParser = bodyParser.json()

router
  .get('/', HeroesControllers.listContacts)
  .get('/:contactId', HeroesControllers.getContactById)
  .post('/', upload.array('images', 4), HeroesControllers.addContact)
  .delete('/:contactId', HeroesControllers.removeContact)
  .put('/:contactId', HeroesControllers.updateContact)

module.exports = router
