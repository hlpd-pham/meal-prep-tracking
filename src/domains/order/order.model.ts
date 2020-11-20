import { Model } from 'objection';
import { BaseModel } from './../../database/base.model';
import { Customer } from '../customer/customer.model';
import { Dish } from '../dish/dish.model';

export enum OrderStatus {
  Received = 'RECEIVED',
  InProgress = 'IN_PROGRESS',
  OutForDelivery = 'OUT_FOR_DELIVERY',
  Deliverd = 'DELIVERED',
}

export class Order extends BaseModel {
  static tableName = 'orders';

  id: number;
  orderDate: Date;
  deliveryDate: Date;
  status: OrderStatus;

  static get relationMappings() {
    const {
      DeliverPersonOrderAssoc,
    } = require('./../assocs/deliver-person-order-assoc.model');
    const {
      DeliverPerson,
    } = require('./../deliver-person/deliver-person.model');

    return {
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
      deliverPersons: {
        relation: Model.ManyToManyRelation,
        modelClass: DeliverPerson,
        join: {
          from: 'orders.id',
          through: {
            modelClass: DeliverPersonOrderAssoc,
            from: 'deliver_person_order_assocs.orderId',
            to: 'deliver_person_order_assocs.deliverPersonId',
          },
          to: 'deliver_persons.id',
        },
      },
    };
  }
}
