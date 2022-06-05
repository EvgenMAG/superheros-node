
const { Heroes, Images } = require('../schemas/heroes')

class HeroesRepository {
  constructor() {
    this.model = Heroes
    this.modelImage = Images
  }

  async listContacts({ page = 1, limit = 5 }) {
    const result = await this.model.paginate({}, {
      page,
      limit,
    },
    )
    return result
  }

  async getContactById(id) {
    const result = await this.model.findOne({ _id: id })
    return result
  }

  async addContact(body) {
    const avatar = []
    body.images.map(item => avatar.push({ image: item }))

    const newContact = await this.model.create({ ...body, images: avatar })
    console.log(newContact)

    return newContact
  }

  async updateContact(id, body, pictures) {
    const { images } = await this.model.findById(id)
    const updatedListImages = images
    pictures.map(item => updatedListImages.push({ image: item }))
    const updatedClient = await this.model.findByIdAndUpdate(
      { _id: id },
      { ...body, images: updatedListImages },
      { new: true }
    )
    return updatedClient
  }

  async removeContact(id) {
    const removedClient = await this.model.findByIdAndRemove({ _id: id },
    )
    return removedClient
  }

  async removeImage(id, imageId) {
    const { images } = await this.model.findById(id)
    const updatedListImages = images.filter(item => item._id.toHexString() !== imageId)
    const removedImage = await this.model.findByIdAndUpdate(
      { _id: id },
      { images: updatedListImages },
      { new: true }
    )
    return removedImage
  }
}

module.exports = HeroesRepository
