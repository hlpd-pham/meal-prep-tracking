import * as Knex from 'knex';
import { Dish, DishType } from '../../../domains/dish/dish.model';

export const seedDishes: Partial<Dish>[] = [
  { name: 'omnis dicta', type: DishType.Dinner, quantity: 14 },
  { name: 'quaerat itaque', type: DishType.Lunch, quantity: 12 },
  { name: 'consequuntur doloribus', type: DishType.Breakfast, quantity: 3 },
];

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('dishes').del();

  // Inserts seed entries
  return await knex('dishes').insert(seedDishes);
}
