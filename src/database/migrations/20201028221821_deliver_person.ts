import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('deliver_persons', function(table) {
      table.increments();
      table.string('name').notNullable();
      table.string('phone').notNullable();
      table.string('email').nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .alterTable('orders', table => {
      table
        .bigInteger('deliverPersonId')
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
