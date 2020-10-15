import { PartialType } from "@nestjs/mapped-types";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { DishType } from "./dish.model";

export class DishDto {
    @IsString()
    readonly name: string;

    @IsEnum(DishType)
    readonly type: DishType;

    @IsNumber()
    readonly quantity: number;

    @IsNumber()
    readonly orderId: number;
}

export class UpdateDishDto extends PartialType(DishDto) {}