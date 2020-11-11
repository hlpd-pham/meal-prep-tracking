import * as Knex from 'knex';
import { Order, OrderStatus } from '../../../domains/order/order.model';

export const seedOrders: Partial<Order>[] = [
  {
    orderDate: new Date('2020-10-19T15:58:38.796Z'),
    deliveryDate: new Date('2020-10-24T15:58:38.796Z'),
    status: OrderStatus.Received,
  },
  {
    orderDate: new Date('2020-10-23T00:45:05.564Z'),
    deliveryDate: new Date('2020-10-28T00:45:05.564Z'),
    status: OrderStatus.InProgress,
  },
  {
    orderDate: new Date('2020-10-12T20:05:01.544Z'),
    deliveryDate: new Date('2020-10-17T20:05:01.544Z'),
    status: OrderStatus.OutForDelivery,
  },
  {
    orderDate: new Date('2020-10-14T07:42:13.980Z'),
    deliveryDate: new Date('2020-10-19T07:42:13.980Z'),
    status: OrderStatus.Received,
  },
];

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('orders').del();
  // Inserts seed entries
  return await knex('orders').insert(seedOrders);
}
