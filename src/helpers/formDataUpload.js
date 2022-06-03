const multer = require('multer')
const path = require('path')
const { HttpCode } = require('../helpers/constants')

const tempDir = path.join(__dirname, '../', 'temporary')

const tempStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file)
        cb(null, tempDir)
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname ? file.originalname : 'image'
        cb(null, fileName)
    }
})

const upload = multer({
    storage: tempStorage,
    limits: { fileSize: 200000000 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes('image')) {
            cb(null, true)
            return
        }
        const error = new Error('Wrong file format for avatar')
        error.status = HttpCode.BAD_REQUEST
        cb(error)
    }
})

module.exports = upload
