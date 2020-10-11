import * as Knex from "knex";
import * as faker from "faker";
import { OrderStatus } from "../../domains/order/order.model";
import { generateRange } from "../../core/functions/range.functions";
import { addDays } from "../../core/functions/date.functions";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("orders").del();

    let orders = [];
    
    generateRange(5).forEach(num => {
        let orderDate = faker.date.between("2020-10-10","2020-10-30");
        let deliveryDate = addDays(orderDate, 5);
        let order = {
            orderDate: orderDate,
            deliveryDate: deliveryDate,
            status: OrderStatus.Received,
        }
        orders.push(order);
    })

    // Inserts seed entries
    return await knex("orders").insert(orders);
};
