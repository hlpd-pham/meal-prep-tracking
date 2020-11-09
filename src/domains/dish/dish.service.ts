import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../order/order.model';
import { DishDto, UpdateDishDto } from './dish.dto';
import { Dish } from './dish.model';

@Injectable()
export class DishService {
  constructor(
    @Inject(Dish)
    private readonly dishModel: typeof Dish,
    @Inject(Order)
    private readonly orderModel: typeof Order,
  ) {}

  async findAll(): Promise<Dish[]> {
    return await this.dishModel.query();
  }

  async findOne(id: string) {
    const dish = await this.dishModel.query().findById(+id);
    if (!dish) {
      throw new NotFoundException(`Dish #${id} not found`);
    }
    return dish;
  }

  /** Create a dish record and makes it belong to an order */
  async create(dishDto: DishDto) {
    // An order in dishDto has to be an existing order
    const { orderId, ...dishInfo } = dishDto;

    const dish = await this.dishModel.query().insert(dishInfo);
    if (orderId) {
      const orderModelItem = await this.orderModel.query().findById(orderId);
      if (!orderModelItem) {
        throw new NotFoundException(`Order #${orderId} not found`);
      }
      orderModelItem.$relatedQuery('dishes').relate(dish.id);
    }

    return dish;
  }

  /** Update a dish record and return the updated result
   * Update order relation if necessary
   */
  async update(id: string, updateDishDto: UpdateDishDto) {
    // An order in dishDto has to be an existing order
    const { orderId, ...dishInfo } = updateDishDto;
    await this.dishModel
      .query()
      .patch(dishInfo)
      .findById(+id);

    const updatedDish = await this.dishModel.query().findById(+id);

    if (!updatedDish) {
      throw new NotFoundException(`Dish #${id} not found`);
    }

    if (orderId) {
      const orderModelItem = await this.orderModel.query().findById(orderId);
      if (!orderModelItem) {
        throw new NotFoundException(`Order #${orderId} not found`);
      }
      orderModelItem.$relatedQuery('dishes').relate(updatedDish.id);
    }

    return updatedDish;
  }

  async remove(id: string) {
    const numberOfAffectedRows = await this.dishModel.query().deleteById(+id);
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return numberOfAffectedRows;
  }

  /** Load a dish record. If there isn't one, create & return */
  async preloadDish(dish: Dish): Promise<Dish> {
    if (dish.id) {
      const existingDish = await this.dishModel.query().findById(dish.id);
      if (!existingDish) {
        throw new NotFoundException(`Dish #${dish.id} not found`);
      }
      return existingDish;
    }
    return await this.dishModel.query().insert(dish);
  }
}
