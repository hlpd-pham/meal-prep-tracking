import { Model } from 'objection';

export class DeliverPersonOrderAssoc extends Model {
  static tableName = 'deliver_person_order_assocs';

  static get idColumn() {
    return ['deliverPersonId', 'orderId'];
  }

  deliverPersonId: number;
  orderId: number;
}
