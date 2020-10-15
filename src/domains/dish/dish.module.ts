import { Module } from "@nestjs/common";
import { ObjectionModule } from "@willsoto/nestjs-objection";
import { Order } from "../order/order.model";
import { DishController } from "./dish.controller";
import { Dish } from "./dish.model";
import { DishService } from "./dish.service";

@Module({
    imports: [
        ObjectionModule.forFeature([Dish, Order]),
    ],
    exports: [DishService],
    controllers: [DishController],
    providers: [DishService]
})
export class DishModule {}