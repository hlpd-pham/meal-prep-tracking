import * as Knex from 'knex';
import { Tables } from './../../../database/tables.constants';
import { User } from './../../../domains/user/user.model';

export const seedUsers: Partial<User>[] = [
  {
    email: 'Freddy.Abernathy@gmail.com',
    username: 'Loraine_Bruen',
    password: 'WiZXRRsjOvvndQy',
  },
  {
    email: 'Dorcas_Goldner@hotmail.com',
    username: 'Troy.King',
    password: 'hlwZEJXkRR4UP8t',
  },
];

export async function seed(knex: Knex): Promise<void> {
  await knex(Tables.User).del();
  return await knex(Tables.User).insert(seedUsers);
}
