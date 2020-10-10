import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsEnum, IsString } from "class-validator";
import { CustomerType } from "../customer/customer.model";
import { Order } from "../order/order.model";

export class CustomerDto {

    @IsString()
    readonly name: string;

    @IsString()
    readonly phone: string;

    @IsString()
    readonly email?: string;
    
    @IsString()
    readonly address: string;

    @IsEnum(CustomerType)
    readonly type: CustomerType;

    @IsArray()
    readonly orders?: Order[];
}

export class UpdateCustomerDto extends PartialType(CustomerDto) {}