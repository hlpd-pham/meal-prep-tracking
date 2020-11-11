import * as Knex from 'knex';
import { Tables } from './../../../database/tables.constants';
import { DeliverPerson } from './../../../domains/deliver-person/deliver-person.model';

export const seedDeliverPersons: Partial<DeliverPerson>[] = [
  {
    name: 'Fredrick Ortiz',
    phone: '1-479-355-7528 x744',
    email: 'Kenyatta69@yahoo.com',
  },
  {
    name: 'Dr. Wesley Pagac',
    phone: '1-981-366-5461 x117',
    email: 'Dahlia83@hotmail.com',
  },
  {
    name: 'Laura Ernser',
    phone: '611.216.7180 x62641',
    email: 'Deven30@hotmail.com',
  },
];

export async function seed(knex: Knex): Promise<void> {
  await knex(Tables.DeliverPerson).del();
  return await knex(Tables.DeliverPerson).insert(seedDeliverPersons);
}
