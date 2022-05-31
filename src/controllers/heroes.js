const { HttpCode } = require('../helpers/constants')
const { HeroesService } = require('../services')
// const { storage } = require('../helpers/formDataUpload')
const path = require('path')
const fs = require('fs/promises')

const uploadDir = path.join(__dirname, '../../', 'public')

const heroesService = new HeroesService()

const listContacts = async (req, res, next) => {
  try {
    const contacts = await heroesService.listContacts()
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        ...contacts,
      }
    })
  } catch (e) {
    next(e)
  }
}
const getContactById = async (req, res, next) => {
  try {
    const contact = await heroesService.getContactById(req.params.contactId)
    if (contact) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        }

      })
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not Found contact',
      })
    }
  } catch (e) {
    next(e)
  }
}
const removeContact = async (req, res, next) => {
  try {
    const contact = await heroesService.removeContact(req.params.contactId)
    if (contact) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        }

      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not Found contact',
        data: 'Not Found contact',
      })
    }
  } catch (e) {
    next(e)
  }
}

const addContact = async (req, res, next) => {
  const listImages = req.files.map(({ originalname, path: tempName }) => {
    const fileName = path.join(uploadDir, 'heroes', originalname)
    fs.rename(tempName, fileName)
    const imagesPaths = path.join('/public/heroes', originalname)
    return imagesPaths
  })

  try {
    const heroes = []
    const contact = await heroesService.addContact({ ...req.body, images: listImages })
    heroes.push(contact)
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: heroes
    })
  } catch (e) {
    // fs.unlink(tempName)
    next(e)
  }
}
const updateContact = async (req, res, next) => {
  try {
    console.log(req.body)
    console.log(req.params.contactId)
    const contact = await heroesService.updateContact(req.params.contactId, req.body)
    if (contact) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        }

      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not Found contact',
        data: 'Not Found contact',
      })
    }
  } catch (e) {
    next(e)
  }
}

// const updateStatusContact = async (req, res, next) => {
//   try {
//     console.log(req.body)
//     console.log(req.params.contactId)
//     const userId = req.user.id
//     const contact = await contactsService.updateStatusContact(userId, req.params.contactId, req.body)
//     if (contact) {
//       res.status(HttpCode.OK).json({
//         status: 'success',
//         code: HttpCode.OK,
//         data: {
//           contact,
//         }

//       })
//     } else {
//       return next({
//         status: HttpCode.BAD_REQUEST,
//         message: 'missing field favorite',
//         data: 'Not Found contact',
//       })
//     }
//   } catch (e) {
//     next(e)
//   }
// }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
