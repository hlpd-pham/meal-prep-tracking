import { Injectable } from "@nestjs/common";
import { Dish } from "./dish.entity";

@Injectable() 
export class DishService {
    private dishes: Dish[];
    findAll() {
        return this.dishes;
    }
}