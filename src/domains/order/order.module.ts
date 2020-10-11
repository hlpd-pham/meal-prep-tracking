import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Customer } from '../customer/customer.model';
import { CustomerModule } from '../customer/customer.module';
import { Dish } from '../dish/dish.model';
import { DishModule } from '../dish/dish.module';
import { OrderController } from './order.controller';
import { Order } from './order.model';
import { OrderService } from './order.service'

@Module({
    imports: [
        CustomerModule,
        DishModule,
        ObjectionModule.forFeature([Order, Customer, Dish]),
    ],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule {}
