import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('deliver_persons', function(table) {
      table.increments();
      table.string('name').notNullable();
      table.string('phone').notNullable();
      table.string('email').nullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
    .createTable('deliver_person_order_assocs', function(table) {
      table.increments().primary();
      table
        .integer('deliverPersonId')
        .unsigned()
        .references('id')
        .inTable('deliver_persons');
      table
        .integer('orderId')
        .unsigned()
        .references('id')
        .inTable('orders');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('deliver_persons');
}
