
const { HeroesRepository } = require('../repository')

class HeroesService {
  constructor() {
    this.repository = {
      contacts: new HeroesRepository(),
    }
  }

  async listContacts() {
    const data = await this.repository.contacts.listContacts()
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

  async updateContact(id, body) {
    const data = await this.repository.contacts.updateContact(id, body)
    return data
  }

  async removeContact(id) {
    const data = await this.repository.contacts.removeContact(id)

    return data
  }

  // async updateStatusContact(userId, id, body) {
  //   const data = await this.repository.contacts.updateStatusContact(userId, id, body)
  //   return data
  // }
}

module.exports = HeroesService
