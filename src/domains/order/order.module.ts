import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customer/customer.entity';
import { CustomerModule } from '../customer/customer.module';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service'

@Module({
    imports: [TypeOrmModule.forFeature([Order, Customer]), CustomerModule],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule {}
