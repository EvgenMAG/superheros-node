const multer = require('multer')
const path = require('path')
const fs = require('fs')

const tempDir = path.join(__dirname, '../', 'temp')
const uploadDir = path.join(__dirname, '../', 'public')


const tempStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: tempStorage
})

const permStorage = async (data) => {
    // console.log(data.originalname)
    const { originalname, path: tempName } = data
    const fileName = path.join(uploadDir, 'heroes', originalname)
    const newFileName = await fs.rename(tempName, fileName)
    return newFileName

}

module.exports = upload
