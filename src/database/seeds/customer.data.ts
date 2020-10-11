import * as Knex from "knex";
import * as faker from "faker";
import { CustomerType } from "../../domains/customer/customer.model";
import { generateRange } from "../../core/functions/range.functions";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("customers").del();

    // create mock data
    let customers = [];
    let customerTypes = Object.values(CustomerType);
    generateRange(7).forEach(number => {
        let c = {
            id: number,
            name: faker.name.findName(),
            phone: faker.phone.phoneNumberFormat(),
            email: faker.internet.email(),
            address: faker.address.streetAddress(),
            type: customerTypes[Math.floor(Math.random() * customerTypes.length)]
        }
        customers.push(c)
    });

    // Inserts seed entries
    return await knex("customers").insert(customers);
};
