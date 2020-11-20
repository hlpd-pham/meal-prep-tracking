import { BaseModel } from './../../database/base.model';

export class DeliverPersonOrderAssoc extends BaseModel {
  static tableName = 'deliver_person_order_assocs';

  static get idColumn() {
    return ['deliverPersonId', 'orderId'];
  }

  deliverPersonId: number;
  orderId: number;
}
