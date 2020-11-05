import { Model } from 'objection';
import { BaseModel } from 'src/database/base.model';
import { Order } from '../order/order.model';

export class DeliverPerson extends BaseModel {
  static tableName = 'deliver_persons';

  id: number;
  name: string;
  phone: string;
  email?: string;
  orders: Order[];

  static get relationMappings() {
    const {
      DeliverPersonOrderAssoc,
    } = require('./../assocs/deliver-person-order-assoc.model');
    const { Order } = require('./../order/order.model');

    return {
      orders: {
        relation: Model.ManyToManyRelation,
        modelClass: Order,
        join: {
          from: 'deliver_persons.id',
          through: {
            modelClass: DeliverPersonOrderAssoc,
            from: 'deliver_person_order_assocs.deliverPersonId',
            to: 'deliver_person_order_assocs.orderId',
          },
          to: 'orders.id',
        },
      },
    };
  }
}
