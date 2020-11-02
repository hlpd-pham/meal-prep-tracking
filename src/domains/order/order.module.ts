import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Customer } from '../customer/customer.model';
import { CustomerModule } from '../customer/customer.module';
import { DeliverPerson } from '../deliver-person/deliver-person.model';
import { DeliverPersonModule } from '../deliver-person/deliver-person.module';
import { Dish } from '../dish/dish.model';
import { DishModule } from '../dish/dish.module';
import { OrderController } from './order.controller';
import { Order } from './order.model';
import { OrderService } from './order.service';

@Module({
  imports: [
    CustomerModule,
    DishModule,
    DeliverPersonModule,
    ObjectionModule.forFeature([Order, Customer, Dish, DeliverPerson]),
  ],
  exports: [OrderService],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
