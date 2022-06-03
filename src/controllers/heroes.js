const { HttpCode } = require('../helpers/constants')
const { HeroesService, saveAvatar } = require('../services')
// const path = require('path')
// const fs = require('fs/promises')

// const uploadDir = path.join(__dirname, '../../', 'public')

const heroesService = new HeroesService()

const listContacts = async (req, res, next) => {
  console.log(req.query)
  try {
    const contacts = await heroesService.listContacts(req.query)
    console.log(contacts)
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
    const hero = await heroesService.getContactById(req.params.contactId)
    console.log(hero)
    if (hero) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          hero

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
  console.log(req.body)
  console.log(req.files)
  const listImages = await Promise.all(
    req.files.map(({ path: tempName }) => {
      // const fileName = path.join(uploadDir, 'heroes', originalname)
      // fs.rename(tempName, fileName)
      // const imagesPaths = path.join('/public/heroes', originalname)

      const avatarUrl = saveAvatar(tempName)
      // fs.unlink(tempName)
      return avatarUrl
      // return imagesPaths
    })
  )
  console.log(listImages)
  console.log(req.body)
  try {
    const heroes = []
    const contact = await heroesService.addContact({ ...req.body, images: listImages })
    heroes.push(contact)
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: { heroes }
    })
  } catch (e) {
    // fs.unlink(tempName)
    next(e)
  }
}
const updateContact = async (req, res, next) => {
  const listImages = await Promise.all(
    req.files.map(({ path: tempName }) => {
      // const fileName = path.join(uploadDir, 'heroes', originalname)
      // fs.rename(tempName, fileName)
      // const imagesPaths = path.join('/public/heroes', originalname)

      const avatarUrl = saveAvatar(tempName)
      // fs.unlink(tempName)
      return avatarUrl
      // return imagesPaths
    })
  )

  try {
    const heroes = []
    const contact = await heroesService.updateContact(req.params.contactId, req.body, listImages)
    heroes.push(contact)
    if (contact) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          heroes,
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

const removeImage = async (req, res, next) => {
  try {
    const contact = await heroesService.removeImage(req.params.contactId, req.params.imageId)

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
        status: HttpCode.BAD_REQUEST,
        message: 'missing field params',
        data: 'Not Found contact',
      })
    }
  } catch (e) {
    next(e)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  removeImage,
}
