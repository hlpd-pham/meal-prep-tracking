import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { CustomerModule } from '../customer/customer.module';
import { OrderController } from './order.controller';
import { Order } from './order.model';
import { OrderService } from './order.service'

@Module({
    imports: [
        CustomerModule,
        ObjectionModule.forFeature([Order]),
    ],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule {}
