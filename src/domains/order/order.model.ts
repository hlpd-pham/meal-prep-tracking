import { IsDate, IsEnum, IsNumber } from 'class-validator';
import { Model } from 'objection';
import { Customer } from '../customer/customer.model';
import { DeliverPerson } from '../deliver-person/deliver-person.model';
import { Dish } from '../dish/dish.model';

export enum OrderStatus {
  Received = 'RECEIVED',
  InProgress = 'IN_PROGRESS',
  OutForDelivery = 'OUT_FOR_DELIVERY',
  Deliverd = 'DELIVERED',
}

export class Order extends Model {
  static tableName = 'orders';

  @IsNumber()
  id: number;

  @IsDate()
  orderDate: Date;

  @IsDate()
  deliveryDate: Date;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  static relationMappings = {
    dishes: {
      relation: Model.HasManyRelation,
      modelClass: Dish,
      join: {
        from: 'orders.id',
        to: 'dishes.orderId',
      },
    },
    customer: {
      relation: Model.BelongsToOneRelation,
      modelClass: Customer,
      join: {
        from: 'orders.customerId',
        to: 'customers.id',
      },
    },
    deliverPerson: {
      relation: Model.BelongsToOneRelation,
      modelClass: DeliverPerson,
      join: {
        from: 'orders.deliverPersonId',
        to: 'deliver_persons.id',
      },
    },
  };
}
