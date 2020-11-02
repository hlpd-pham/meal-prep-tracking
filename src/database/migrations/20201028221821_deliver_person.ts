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
    .table('orders', function(ordersTable) {
      ordersTable
        .integer('deliverPersonId')
        .unsigned()
        .index()
        .references('id')
        .inTable('deliver_persons');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable('orders', table => {
      table.dropForeign(['deliverPersonId']);
      table.dropColumn('deliverPersonId');
    })
    .dropTableIfExists('deliver_persons');
}
