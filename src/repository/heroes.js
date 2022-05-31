
const { Heroes, Images } = require('../schemas/heroes')

class HeroesRepository {
  constructor() {
    this.model = Heroes
    this.modelImage = Images
  }

  async listContacts() {
    const result = await this.model.find()

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

  async updateContact(id, body) {
    const updatedClient = await this.model.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    )
    return updatedClient
  }

  async removeContact(id) {
    const removedClient = await this.model.findByIdAndRemove({ _id: id },
    )
    return removedClient
  }

  // async updateStatusContact(userId, id, body) {
  //   const updatedClient = await this.model.findByIdAndUpdate({ _id: id, owner: userId },
  //     { ...body },
  //     { new: true }
  //   )
  //   return updatedClient
  // }
}

module.exports = HeroesRepository
