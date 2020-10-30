import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsEnum, IsObject } from 'class-validator';
import { Dish } from 'src/domains/dish/dish.model';
import { OrderStatus } from '../order/order.model';
import { Customer } from '../customer/customer.model';

export class OrderDto {
  @IsObject()
  readonly customer?: Customer;

  @IsObject({ each: true })
  readonly dishes?: Dish[];

  @IsDate()
  readonly orderDate: Date;

  @IsDate()
  readonly deliveryDate: Date;

  @IsEnum(OrderStatus)
  readonly status: OrderStatus;
}

export class UpdateOrderDto extends PartialType(OrderDto) {}
