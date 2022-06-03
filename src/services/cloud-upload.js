const cloudinary = require('cloudinary').v2
const { promisify } = require('util')
require('dotenv').config()
const fs = require('fs/promises')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME_CLOUDINARY,
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.API_SECRET_CLOUDINARY
})

const uploadCloud = promisify(cloudinary.uploader.upload)

const saveAvatar = async (pathFile) => {
    const { secure_url: avatarUrl } = await uploadCloud(pathFile, {
        folder: 'SuperHeroes',
    })
    await fs.unlink(pathFile)
    return avatarUrl
}

module.exports = saveAvatar
