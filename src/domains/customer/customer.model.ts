import { Model } from 'objection';
import { BaseModel } from './../../database/base.model';
import { Order } from '../order/order.model';

export enum CustomerType {
  OneTime = 'ONE_TIME',
  Recurring = 'RECURRING',
}

export class Customer extends BaseModel {
  static tableName = 'customers';

  id: number;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  type?: CustomerType = CustomerType.OneTime;

  static relationMappings = {
    orders: {
      relation: Model.HasManyRelation,
      modelClass: Order,
      join: {
        from: 'customers.id',
        to: 'orders.customerId',
      },
    },
  };
}
