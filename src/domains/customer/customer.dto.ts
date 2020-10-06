import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsEnum, IsString } from "class-validator";
import { CustomerType } from "src/domains/customer/customer.entity";
import { Order } from "../order/order.entity";

export class CreateCustomerDto {

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

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}