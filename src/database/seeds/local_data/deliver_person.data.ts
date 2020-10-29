import * as Knex from 'knex';
import * as faker from 'faker';
import { generateRange } from './../../../core/functions/range.functions';
import { DeliverPerson } from './../../../domains/deliver-person/deliver-person.model';
import { titleCase } from './../../../core/functions/string.functions';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('deliver_persons').del();

  let deliver_persons: Partial<DeliverPerson>[] = [];
  generateRange(5).forEach(_ => {
    let deliver_person = {
      name: titleCase(faker.name.findName()),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
    };
    deliver_persons.push(deliver_person);
  });

  return await knex('deliver_persons').insert(deliver_persons);
}
