import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DishController } from "./dish.controller";
import { Dish } from "./dish.entity";
import { DishService } from "./dish.service";

@Module({
    imports: [TypeOrmModule.forFeature([Dish])],
    controllers: [DishController],
    providers: [DishService]
})
export class DishModule {}