import { Model } from 'objection';
import { BaseModel } from 'src/database/base.model';
import { Order } from '../order/order.model';

export enum DishType {
  Breakfast = 'BREAKFAST',
  Lunch = 'LUNCH',
  Dinner = 'DINNER',
}

export class Dish extends BaseModel {
  static tableName = 'dishes';

  id: number;
  name: string;
  type: DishType;
  quantity: number = 1;

  static relationMappings = {
    order: {
      relation: Model.BelongsToOneRelation,
      modelClass: Order,
      join: {
        from: 'dishes.orderId',
        to: 'orders.id',
      },
    },
  };
}
