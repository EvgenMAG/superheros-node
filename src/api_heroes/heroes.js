const express = require('express')
const HeroesControllers = require('../controllers/heroes')
const router = express.Router()

const upload = require('../helpers/formDataUpload')

router
  .get('/', HeroesControllers.listContacts)
  .get('/:contactId', HeroesControllers.getContactById)
  .post('/', upload.array('images', 6), HeroesControllers.addContact)
  .delete('/:contactId', HeroesControllers.removeContact)
  .put('/:contactId', upload.array('images', 6), HeroesControllers.updateContact)
  .patch('/:contactId/:imageId', HeroesControllers.removeImage)

module.exports = router
