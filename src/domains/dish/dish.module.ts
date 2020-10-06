import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Dish } from "./dish.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Dish])],
    controllers: [],
    providers: []
})
export class DishModule {}