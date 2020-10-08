import { PartialType } from "@nestjs/mapped-types";
import { IsEnum, IsNumber, IsObject, IsString } from "class-validator";
import { Order } from "../order/order.model";
import { DishType } from "./dish.model";

export class CreateDishDto {
    @IsString()
    readonly name: string;

    @IsEnum(DishType)
    readonly type: DishType;

    @IsNumber()
    readonly quantity: number;

    @IsObject({ each: true })
    readonly orders?: Order[];
}

export class UpdateDishDto extends PartialType(CreateDishDto) {}