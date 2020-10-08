import { Module } from "@nestjs/common";
import { ObjectionModule } from "@willsoto/nestjs-objection";
import { DatabaseModule } from "src/database/database.module";
import { DishController } from "./dish.controller";
import { Dish } from "./dish.model";
import { DishService } from "./dish.service";

@Module({
    imports: [DatabaseModule, ObjectionModule.forFeature([Dish])],
    controllers: [DishController],
    providers: [DishService]
})
export class DishModule {}