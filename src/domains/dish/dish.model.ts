import { IsEnum, IsNumber, IsObject } from "class-validator";
import { Model } from "objection";
import { Order } from "../order/order.model";

export enum DishType {
    Breakfast = "BREAKFAST",
    Lunch = "LUNCH",
    Dinner = "DINNER"
}

export class Dish extends Model {

    static tableName = "dishes";

    @IsNumber()
    id: number;

    @IsNumber()
    name: string;

    @IsEnum(DishType)
    type: DishType;

    @IsNumber()
    quantity: number = 1;

    @IsObject({ each: true })
    orders?: Order[]

    static relationMappings = {
        orders: {
            relation: Model.BelongsToOneRelation,
            modelClass: Order,
            join: {
                from: "dishes.orderId",
                to: "orders.id",
            }
        }
    }

}