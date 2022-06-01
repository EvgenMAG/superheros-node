
const { HeroesRepository } = require('../repository')

class HeroesService {
  constructor() {
    this.repository = {
      contacts: new HeroesRepository(),
    }
  }

  async listContacts(query) {
    const data = await this.repository.contacts.listContacts(query)
    return data
  }

  async getContactById(id) {
    const data = await this.repository.contacts.getContactById(id)
    return data
  }

  async addContact(body) {
    const data = await this.repository.contacts.addContact(body)
    return data
  }

  async updateContact(id, body, image) {
    const data = await this.repository.contacts.updateContact(id, body, image)
    return data
  }

  async removeContact(id) {
    const data = await this.repository.contacts.removeContact(id)

    return data
  }

  async removeImage(id, imageId) {
    const data = await this.repository.contacts.removeImage(id, imageId)
    return data
  }
}

module.exports = HeroesService
