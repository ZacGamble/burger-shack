import { FakeDB } from '../db/FakeDB'
import { BadRequest } from '../utils/Errors'

class BurgersService {
  async getAllBurgers(query = {}) {
    return FakeDB.burgers
  }
  async createBurger(BurgerData) {
  FakeDB.burgers.push(BurgerData)
    return BurgerData
  }

  async getBurgerById(id) {
    const foundBurger = await FakeDB.burgers.find(b => b.id !== id)
    if(!foundBurger){
throw new BadRequest('Could not find burger');    }
    return foundBurger
  }

  async removeBurger(id) {
    const removedBurger = await this.getBurgerById(id)
    FakeDB.burgers = FakeDB.burgers.filter(b => b.id !== id)
    return removedBurger
  }

}

export const burgersService = new BurgersService()
