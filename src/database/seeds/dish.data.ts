import * as Knex from "knex";
import * as faker from "faker";
import { generateRange } from "../../core/functions/range.functions";
import { DishType } from "../../domains/dish/dish.model";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("dishes").del();

    let dishes = [];
    let dishTypes = Object.values(DishType);
    generateRange(7).forEach(num => {
        let dish = {
            id: num,
            name: faker.image.food(),
            type: dishTypes[Math.floor(Math.random() * dishTypes.length)],
            quantity: faker.random.number(20),
        }
        dishes.push(dish)
    })

    // Inserts seed entries
    return await knex("dishes").insert(dishes);
};
