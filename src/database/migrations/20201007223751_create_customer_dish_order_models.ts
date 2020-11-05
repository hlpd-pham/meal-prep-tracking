import * as Knex from 'knex';
import { CustomerType } from '../../domains/customer/customer.model';
import { DishType } from '../../domains/dish/dish.model';
import { OrderStatus } from '../../domains/order/order.model';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('customers', function(table) {
      table.increments();
      table.string('name').notNullable;
      table.string('phone').nullable();
      table.string('email').nullable();
      table.string('address').nullable();
      table.enum('type', Object.values(CustomerType)).nullable();
      table.timestamps(true, true);
    })
    .createTable('orders', function(table) {
      table.increments();
      table.dateTime('orderDate');
      table.dateTime('deliveryDate');
      table.enum('status', Object.values(OrderStatus));

      table
        .integer('customerId')
        .unsigned()
        .index()
        .references('id')
        .inTable('customers');
      table.timestamps(true, true);
    })
    .createTable('dishes', function(table) {
      table.increments();
      table.string('name');
      table.enum('type', Object.values(DishType));
      table.integer('quantity');
      table.timestamps(true, true);

      table
        .integer('orderId')
        .unsigned()
        .index()
        .references('id')
        .inTable('orders');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('dishes')
    .dropTable('orders')
    .dropTable('customers');
}
