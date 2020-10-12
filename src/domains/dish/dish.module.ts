import { Module } from "@nestjs/common";
import { ObjectionModule } from "@willsoto/nestjs-objection";
import { DishController } from "./dish.controller";
import { Dish } from "./dish.model";
import { DishService } from "./dish.service";

@Module({
    imports: [
        ObjectionModule.forFeature([Dish]),
    ],
    exports: [DishService],
    controllers: [DishController],
    providers: [DishService]
})
export class DishModule {}