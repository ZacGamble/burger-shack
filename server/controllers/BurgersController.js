import { burgersService } from '../services/BurgerService'
import BaseController from '../utils/BaseController'

export class BurgersController extends BaseController {
  constructor() {
    super('api/burgers')
    this.router
      .get('', this.getAllBurgers)
      .get('/:id', this.getBurgerById)
      .post('', this.createBurger)
      .delete('/:id', this.removeBurger)
  }

  /**
   * Sends found burgers to a client by request
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async getAllBurgers(req, res, next) {
    try {
      const burgers = await burgersService.getAllBurgers()
      return res.send(burgers)
    } catch (error) {
      next(error)
    }
  }

  async getBurgerById (req, res, next){
    try{
      const id = req.params.id
      const foundBurger = await burgersService.getBurgerById(id)
      res.send(foundBurger)

    }catch(error){
      next(error)
    }
  }

  /**
   * Creates a burger from request body and returns it
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async createBurger(req, res, next) {
    try {
      const burgerToCreate = req.body
      const burger = await burgersService.createBurger(burgerToCreate)
      res.send(burger)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Deletes a burger using req params
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async removeBurger(req, res, next) {
    try {
      // I could declare a variable that holds req.params.id and pass it at the next lines arg, but not mandatory.
      const deletedBurger = await burgersService.removeBurger(req.params.id)
      res.send(deletedBurger)
    } catch (error) {
      next(error)
    }
  }
}
