import { PartialType } from "@nestjs/mapped-types";
import { IsDate, IsEnum, IsObject } from "class-validator";
import { Customer } from "src/domains/customer/customer.entity";
import { Dish } from "src/domains/dish/dish.entity";
import { OrderStatus } from "src/domains/order/order.entity";

export class CreateOrderDto {

    @IsObject()
    readonly customer: Customer;
    
    @IsObject({ each: true })
    readonly dishes?: Dish[];

    @IsDate()
    readonly orderDate: Date;

    @IsDate()
    readonly deliveryDate: Date;

    @IsEnum(OrderStatus)
    readonly status: OrderStatus;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
}
