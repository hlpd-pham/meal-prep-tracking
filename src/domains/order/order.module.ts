import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { DatabaseModule } from 'src/database/database.module';
import { Customer } from '../customer/customer.model';
import { OrderController } from './order.controller';
import { Order } from './order.model';
import { OrderService } from './order.service'

@Module({
    imports: [DatabaseModule, ObjectionModule.forFeature([Order, Customer])],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule {}
