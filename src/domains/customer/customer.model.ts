import { IsEnum, IsNumber, IsObject, IsString } from 'class-validator';
import { Model } from 'objection';
import { Order } from '../order/order.model';

export enum CustomerType {
    OneTime = "ONE_TIME",
    Recurring = "RECURRING",
}

export class Customer extends Model {

    static tableName = "customers";

    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    phone?: string;
    
    @IsString()
    email?: string;
    
    @IsString()
    address?: string;
    
    @IsEnum(CustomerType)
    type?: CustomerType = CustomerType.OneTime;

    static relationMappings = {
        orders: {
            relation: Model.HasManyRelation,
            modelClass: Order,
            join: {
                from: "customers.id",
                to: "orders.customerId",
            }
        }
    }
}