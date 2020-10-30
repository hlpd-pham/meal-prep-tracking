import { IsDate, IsEmail, IsNumber } from 'class-validator';
import { Model } from 'objection';
import { Order } from '../order/order.model';

export class DeliverPerson extends Model {
  static tableName = 'deliver_persons';

  @IsNumber()
  id: number;

  @IsDate()
  name: string;

  @IsDate()
  phone: string;

  @IsEmail()
  email?: string;

  static relationMappings = {
    orders: {
      relation: Model.HasManyRelation,
      modelClass: Order,
      join: {
        from: 'deliver_persons.id',
        to: 'orders.deliverPersonId',
      },
    },
  };

  async $beforeDelete() {
    this.$relatedQuery('orders').unrelate();
  }
}
