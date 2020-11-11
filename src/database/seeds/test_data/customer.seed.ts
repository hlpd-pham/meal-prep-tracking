import * as Knex from 'knex';
import {
  Customer,
  CustomerType,
} from '../../../domains/customer/customer.model';

export const seedCustomers: Partial<Customer>[] = [
  {
    name: 'Javier Ryan',
    phone: '861-306-9894',
    email: 'Thurman_Yost@hotmail.com',
    address: '423 Bartoletti Point',
    type: CustomerType.OneTime,
  },
  {
    name: 'May Gorczany',
    phone: '568-585-0693',
    email: 'Kaylee27@hotmail.com',
    address: '99810 Winston Motorway',
    type: CustomerType.Recurring,
  },
  {
    name: 'Desiree Johns',
    phone: '277-262-4788',
    email: 'Brooklyn_Pfeffer@hotmail.com',
    address: '03353 Barrows Knoll',
    type: CustomerType.OneTime,
  },
];

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('customers').del();
  // Inserts seed entries
  return await knex('customers').insert(seedCustomers);
}
